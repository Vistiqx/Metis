"""
Metis Platform - API Routes
"""

from fastapi import APIRouter

from api.endpoints import auth, cases, events, health

# Main API router
api_router = APIRouter()

# Include endpoint routers
api_router.include_router(auth.router)
api_router.include_router(cases.router)
api_router.include_router(events.router)
api_router.include_router(health.router)


@api_router.get("/status")
async def api_status():
    """API status endpoint."""
    return {
        "status": "ok",
        "version": "0.1.0",
    }
