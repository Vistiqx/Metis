"""
Metis Platform - Analysis API Endpoints
"""

from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from analysis.analysis_service import AnalysisService
from core.auth import get_current_active_user
from core.database import get_db
from models.user import User

router = APIRouter(prefix="/analysis", tags=["analysis"])

# Global analysis service instance
analysis_service = AnalysisService()


class TextAnalysisRequest(BaseModel):
    text: str = Field(..., min_length=10, max_length=10000)


class TextAnalysisResponse(BaseModel):
    text: str
    signals_detected: int
    signals: List[Dict[str, Any]]


class AnalysisStatsResponse(BaseModel):
    signal_detector: Dict[str, int]
    clustering_engine: Dict[str, float]
    candidate_generator: Dict[str, Any]


@router.post("/analyze-text", response_model=TextAnalysisResponse)
async def analyze_text(
    request: TextAnalysisRequest,
    current_user: User = Depends(get_current_active_user)
):
    """
    Analyze text for signals and patterns.
    
    Useful for testing the analysis engine on sample text.
    """
    result = await analysis_service.analyze_text(request.text)
    return result


@router.get("/stats", response_model=AnalysisStatsResponse)
def get_analysis_stats(
    current_user: User = Depends(get_current_active_user)
):
    """Get analysis engine statistics and configuration."""
    return analysis_service.get_analysis_stats()


@router.get("/health")
def analysis_health():
    """Check analysis service health."""
    return {
        "status": "healthy",
        "service": "analysis-engine",
        "components": [
            "signal_detector",
            "clustering_engine",
            "candidate_generator",
            "alert_generator"
        ]
    }
