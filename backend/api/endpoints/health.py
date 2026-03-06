"""
Metis Platform - Health Check Endpoints
"""

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from core.database import get_db

router = APIRouter(prefix="/health", tags=["health"])


@router.get("")
def health_check():
    """Basic health check."""
    return {"status": "healthy", "service": "metis-api"}


@router.get("/db")
def health_check_db(db: Session = Depends(get_db)):
    """Database health check."""
    try:
        # Execute a simple query
        db.execute(text("SELECT 1"))
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}
