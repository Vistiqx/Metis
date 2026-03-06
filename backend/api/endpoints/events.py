"""
Metis Platform - Event Endpoints
"""

import uuid
from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from core.auth import get_current_active_user
from core.database import get_db
from models.user import User
from services.event_service import EventService

router = APIRouter(prefix="/events", tags=["events"])


class EventCreate(BaseModel):
    case_id: uuid.UUID
    title: str
    description: str | None = None
    event_type: str | None = None
    severity: str = "medium"
    occurred_at: datetime | None = None
    location_id: uuid.UUID | None = None
    tags: List[str] = []


class EventUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    event_type: str | None = None
    severity: str | None = None
    status: str | None = None
    occurred_at: datetime | None = None
    location_id: uuid.UUID | None = None
    tags: List[str] | None = None


class EventResponse(BaseModel):
    id: str
    case_id: str
    title: str
    description: str | None
    event_type: str | None
    severity: str
    status: str
    confidence_score: float | None
    occurred_at: datetime | None
    location_id: str | None
    tags: List[str] | None
    created_at: datetime

    class Config:
        from_attributes = True


@router.get("", response_model=List[EventResponse])
def list_events(
    case_id: uuid.UUID | None = None,
    status: str | None = None,
    event_type: str | None = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """List events."""
    event_service = EventService(db)
    events = event_service.list_events(
        case_id=case_id,
        status=status,
        event_type=event_type,
        skip=skip,
        limit=limit
    )
    return events


@router.post("", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
def create_event(
    event_data: EventCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new event."""
    event_service = EventService(db)
    event = event_service.create_event(
        case_id=event_data.case_id,
        title=event_data.title,
        creator=current_user,
        description=event_data.description,
        event_type=event_data.event_type,
        severity=event_data.severity,
        occurred_at=event_data.occurred_at,
        location_id=event_data.location_id,
        tags=event_data.tags
    )
    return event


@router.get("/{event_id}", response_model=EventResponse)
def get_event(
    event_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get an event by ID."""
    event_service = EventService(db)
    event = event_service.get_event(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@router.patch("/{event_id}", response_model=EventResponse)
def update_event(
    event_id: uuid.UUID,
    event_data: EventUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update an event."""
    event_service = EventService(db)
    event = event_service.update_event(event_id, **event_data.model_dump(exclude_unset=True))
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event
