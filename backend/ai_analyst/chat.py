"""
Metis Platform - Analyst Chat

Interactive AI chat interface for analysts.
"""

from typing import Any, Dict, List, Optional
from dataclasses import dataclass, field
from datetime import datetime

from sqlalchemy.orm import Session

from ai_analyst.llm_providers import LLMProvider, LLMResponse, get_llm_provider
from ai_analyst.prompts import PromptLibrary
from ai_analyst.retrieval import RetrievalService


@dataclass
class ChatMessage:
    """A chat message."""
    role: str  # "user" or "assistant"
    content: str
    timestamp: datetime = field(default_factory=datetime.utcnow)
    metadata: Dict[str, Any] = field(default_factory=dict)


class AnalystChat:
    """AI Analyst chat session."""
    
    def __init__(
        self,
        db: Session,
        session_id: str,
        provider: Optional[LLMProvider] = None
    ):
        self.db = db
        self.session_id = session_id
        self.retrieval = RetrievalService(db)
        self.provider = provider or get_llm_provider()
        self.history: List[ChatMessage] = []
    
    async def send_message(
        self,
        message: str,
        context: Optional[Dict[str, Any]] = None
    ) -> ChatMessage:
        """
        Send a message and get AI response.
        
        Args:
            message: User message
            context: Optional context (current event, case, etc.)
            
        Returns:
            AI response message
        """
        # Add user message to history
        user_msg = ChatMessage(role="user", content=message)
        self.history.append(user_msg)
        
        # Build messages for LLM
        chat_history = [
            {"role": msg.role, "content": msg.content}
            for msg in self.history[-10:]  # Last 10 messages
        ]
        
        # Generate chat messages with system prompt
        messages = PromptLibrary.analyst_chat(
            user_message=message,
            context=context,
            chat_history=chat_history[:-1] if len(chat_history) > 1 else None
        )
        
        # Generate response
        response = await self.provider.generate_chat(
            messages=messages,
            temperature=0.7,
            max_tokens=1500
        )
        
        # Create assistant message
        assistant_msg = ChatMessage(
            role="assistant",
            content=response.content,
            metadata={
                "model": response.model,
                "tokens_used": response.tokens_used
            }
        )
        
        # Add to history
        self.history.append(assistant_msg)
        
        return assistant_msg
    
    def get_history(self) -> List[ChatMessage]:
        """Get chat history."""
        return self.history.copy()
    
    def clear_history(self):
        """Clear chat history."""
        self.history = []
    
    def get_suggestions(self) -> List[str]:
        """Get suggested follow-up questions."""
        # In production, this would use AI to generate contextual suggestions
        return [
            "Summarize the current event",
            "What actors are involved?",
            "Show me related evidence",
            "Generate a case report",
            "Explain the timeline"
        ]
    
    async def search_and_respond(
        self,
        query: str,
        entity_type: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Search for content and generate response.
        
        Args:
            query: Search query
            entity_type: Optional entity type filter
            
        Returns:
            Response with search results and AI summary
        """
        # Search for relevant content
        results = self.retrieval.search_relevant_content(
            query=query,
            entity_type=entity_type,
            limit=5
        )
        
        # Build context from results
        context_str = "Search Results:\n"
        for result in results:
            context_str += f"- [{result['type']}] {result['title']}\n"
        
        # Generate response
        prompt = f"""Based on the following search results, answer the query: "{query}"

{context_str}

Provide a helpful response that summarizes the relevant information."""
        
        response = await self.provider.generate(
            prompt=prompt,
            temperature=0.7,
            max_tokens=800
        )
        
        return {
            "query": query,
            "response": response.content,
            "results": results,
            "model": response.model,
            "tokens_used": response.tokens_used
        }


class ChatSessionManager:
    """Manages multiple analyst chat sessions."""
    
    def __init__(self, db: Session):
        self.db = db
        self.sessions: Dict[str, AnalystChat] = {}
    
    def create_session(self, user_id: str) -> AnalystChat:
        """Create a new chat session."""
        import uuid
        session_id = str(uuid.uuid4())
        
        chat = AnalystChat(
            db=self.db,
            session_id=session_id
        )
        
        self.sessions[session_id] = chat
        return chat
    
    def get_session(self, session_id: str) -> Optional[AnalystChat]:
        """Get existing chat session."""
        return self.sessions.get(session_id)
    
    def close_session(self, session_id: str):
        """Close and cleanup chat session."""
        if session_id in self.sessions:
            del self.sessions[session_id]
