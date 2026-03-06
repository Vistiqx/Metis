"""
Metis Platform - Source Management Endpoints
"""

import uuid
from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from core.auth import get_current_active_user, require_admin
from core.database import get_db
from ingestion.ingestion_service import IngestionService
from models.source import Source
from models.user import User

router = APIRouter(prefix="/sources", tags=["sources"])

# Global ingestion service instance
ingestion_service = IngestionService()


class SourceCreate(BaseModel):
    name: str
    source_type: str = Field(..., pattern="^(rss|reddit|x|manual|api|news)$")
    url: str | None = None
    api_endpoint: str | None = None
    description: str | None = None
    ingest_frequency: str = "hourly"
    configuration: Dict[str, Any] = Field(default_factory=dict)
    credentials: Dict[str, str] = Field(default_factory=dict)


class SourceUpdate(BaseModel):
    name: str | None = None
    url: str | None = None
    api_endpoint: str | None = None
    description: str | None = None
    is_active: bool | None = None
    ingest_frequency: str | None = None
    configuration: Dict[str, Any] | None = None


class SourceResponse(BaseModel):
    id: str
    name: str
    source_type: str
    url: str | None
    api_endpoint: str | None
    description: str | None
    is_active: bool
    reliability_score: float | None
    last_ingested_at: str | None
    ingest_frequency: str
    configuration: Dict[str, Any]
    created_at: str

    class Config:
        from_attributes = True


class IngestResponse(BaseModel):
    source_id: str
    records_ingested: int
    status: str


@router.get("", response_model=List[SourceResponse])
def list_sources(
    source_type: str | None = None,
    is_active: bool | None = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """List sources."""
    query = db.query(Source)
    
    if source_type:
        query = query.filter(Source.source_type == source_type)
    if is_active is not None:
        query = query.filter(Source.is_active == is_active)
    
    sources = query.offset(skip).limit(limit).all()
    return sources


@router.post("", response_model=SourceResponse, status_code=status.HTTP_201_CREATED)
def create_source(
    source_data: SourceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Create a new source (admin only)."""
    source = Source(
        name=source_data.name,
        source_type=source_data.source_type,
        url=source_data.url,
        api_endpoint=source_data.api_endpoint,
        description=source_data.description,
        ingest_frequency=source_data.ingest_frequency,
        configuration=source_data.configuration,
        credentials=source_data.credentials
    )
    db.add(source)
    db.commit()
    db.refresh(source)
    
    # Register connector
    ingestion_service.register_connector(source)
    
    return source


@router.get("/{source_id}", response_model=SourceResponse)
def get_source(
    source_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get a source by ID."""
    source = db.query(Source).filter(Source.id == source_id).first()
    if not source:
        raise HTTPException(status_code=404, detail="Source not found")
    return source


@router.patch("/{source_id}", response_model=SourceResponse)
def update_source(
    source_id: uuid.UUID,
    source_data: SourceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Update a source (admin only)."""
    source = db.query(Source).filter(Source.id == source_id).first()
    if not source:
        raise HTTPException(status_code=404, detail="Source not found")
    
    for key, value in source_data.model_dump(exclude_unset=True).items():
        setattr(source, key, value)
    
    db.commit()
    db.refresh(source)
    return source


@router.delete("/{source_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_source(
    source_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Delete a source (admin only)."""
    source = db.query(Source).filter(Source.id == source_id).first()
    if not source:
        raise HTTPException(status_code=404, detail="Source not found")
    
    db.delete(source)
    db.commit()
    return None


@router.post("/{source_id}/ingest", response_model=IngestResponse)
async def ingest_source(
    source_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Manually trigger ingestion for a source."""
    source = db.query(Source).filter(Source.id == source_id).first()
    if not source:
        raise HTTPException(status_code=404, detail="Source not found")
    
    if not source.is_active:
        raise HTTPException(status_code=400, detail="Source is not active")
    
    # Ensure connector is registered
    if str(source_id) not in ingestion_service.connectors:
        ingestion_service.register_connector(source)
    
    # Run ingestion
    records = await ingestion_service.run_connector(str(source_id))
    
    # Update last_ingested_at
    from datetime import datetime
    source.last_ingested_at = datetime.utcnow()
    db.commit()
    
    return {
        "source_id": str(source_id),
        "records_ingested": len(records),
        "status": "success"
    }


@router.get("/{source_id}/status")
def get_source_status(
    source_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get connector status for a source."""
    source = db.query(Source).filter(Source.id == source_id).first()
    if not source:
        raise HTTPException(status_code=404, detail="Source not found")
    
    status = ingestion_service.get_connector_status(str(source_id))
    if not status:
        # Register and get status
        ingestion_service.register_connector(source)
        status = ingestion_service.get_connector_status(str(source_id))
    
    return status
