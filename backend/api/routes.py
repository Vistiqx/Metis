"""
Metis Platform - API Routes
"""

from fastapi import APIRouter

# Main API router
api_router = APIRouter()

# Placeholder for future route imports
# from api.endpoints import cases, events, actors, evidence
# api_router.include_router(cases.router, prefix="/cases", tags=["cases"])
# api_router.include_router(events.router, prefix="/events", tags=["events"])
# api_router.include_router(actors.router, prefix="/actors", tags=["actors"])
# api_router.include_router(evidence.router, prefix="/evidence", tags=["evidence"])


@api_router.get("/status")
async def api_status():
    """API status endpoint."""
    return {
        "status": "ok",
        "version": "0.1.0",
    }
