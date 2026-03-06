"""
Metis Platform - AI Analyst API Endpoints
"""

import uuid
from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ai_analyst.chat import AnalystChat, ChatSessionManager
from ai_analyst.generators import (
    DailyBriefingGenerator,
    EventSummaryGenerator,
    CaseReportGenerator
)
from core.auth import get_current_active_user
from core.database import get_db
from models.user import User

router = APIRouter(prefix="/ai", tags=["ai-analyst"])


class GenerateRequest(BaseModel):
    entity_id: str
    entity_type: str = "event"  # event, case


class ChatRequest(BaseModel):
    message: str
    session_id: str | None = None
    context: Dict[str, Any] | None = None


class ChatResponse(BaseModel):
    message: str
    session_id: str
    suggestions: List[str]


class SummaryResponse(BaseModel):
    entity_id: str
    entity_type: str
    summary: str
    model: str
    tokens_used: int


@router.post("/summarize", response_model=SummaryResponse)
async def generate_summary(
    request: GenerateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Generate AI summary for an event or case."""
    entity_id = uuid.UUID(request.entity_id)
    
    if request.entity_type == "event":
        generator = EventSummaryGenerator(db)
        result = await generator.generate_summary(entity_id)
    elif request.entity_type == "case":
        generator = CaseReportGenerator(db)
        result = await generator.generate_report(entity_id)
    else:
        raise HTTPException(
            status_code=400,
            detail="Invalid entity_type. Must be 'event' or 'case'"
        )
    
    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])
    
    return {
        "entity_id": request.entity_id,
        "entity_type": request.entity_type,
        "summary": result.get("summary") or result.get("report"),
        "model": result.get("model", "unknown"),
        "tokens_used": result.get("tokens_used", 0)
    }


@router.post("/briefing")
async def generate_briefing(
    hours: int = 24,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Generate daily intelligence briefing."""
    generator = DailyBriefingGenerator(db)
    result = await generator.generate_briefing(hours=hours)
    
    return result


@router.post("/chat", response_model=ChatResponse)
async def chat_with_analyst(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Chat with AI analyst."""
    # Get or create session
    session_manager = ChatSessionManager(db)
    
    if request.session_id:
        chat = session_manager.get_session(request.session_id)
        if not chat:
            chat = session_manager.create_session(str(current_user.id))
    else:
        chat = session_manager.create_session(str(current_user.id))
    
    # Send message and get response
    response = await chat.send_message(
        message=request.message,
        context=request.context
    )
    
    return {
        "message": response.content,
        "session_id": chat.session_id,
        "suggestions": chat.get_suggestions()
    }


@router.get("/providers")
def list_providers(
    current_user: User = Depends(get_current_active_user)
):
    """List available AI providers."""
    from ai_analyst.llm_providers import OpenAIProvider, AnthropicProvider, MockProvider
    
    return {
        "providers": [
            {
                "name": "openai",
                "model": "gpt-4",
                "configured": OpenAIProvider().is_configured()
            },
            {
                "name": "anthropic",
                "model": "claude-3-sonnet",
                "configured": AnthropicProvider().is_configured()
            },
            {
                "name": "mock",
                "model": "mock-llm",
                "configured": True
            }
        ]
    }
