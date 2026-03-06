"""
Metis Platform - Event Service
"""

import uuid
from datetime import datetime
from typing import List, Optional

from sqlalchemy.orm import Session

from models.event import Event
from models.user import User


class EventService:
    """Service for managing events."""
    
    def __init__(self, db: Session):
        self.db = db
    
    def get_event(self, event_id: uuid.UUID) -> Optional[Event]:
        """Get an event by ID."""
        return self.db.query(Event).filter(Event.id == event_id).first()
    
    def list_events(
        self,
        case_id: Optional[uuid.UUID] = None,
        status: Optional[str] = None,
        event_type: Optional[str] = None,
        skip: int = 0,
        limit: int = 100
    ) -> List[Event]:
        """List events with optional filters."""
        query = self.db.query(Event)
        
        if case_id:
            query = query.filter(Event.case_id == case_id)
        if status:
            query = query.filter(Event.status == status)
        if event_type:
            query = query.filter(Event.event_type == event_type)
        
        return query.offset(skip).limit(limit).all()
    
    def create_event(
        self,
        case_id: uuid.UUID,
        title: str,
        creator: User,
        description: Optional[str] = None,
        event_type: Optional[str] = None,
        severity: str = "medium",
        occurred_at: Optional[datetime] = None,
        location_id: Optional[uuid.UUID] = None,
        tags: Optional[List[str]] = None
    ) -> Event:
        """Create a new event."""
        event = Event(
            case_id=case_id,
            title=title,
            description=description,
            event_type=event_type,
            severity=severity,
            occurred_at=occurred_at,
            location_id=location_id,
            tags=tags or [],
            created_by=creator.id
        )
        self.db.add(event)
        self.db.commit()
        self.db.refresh(event)
        return event
    
    def update_event(
        self,
        event_id: uuid.UUID,
        **kwargs
    ) -> Optional[Event]:
        """Update an event."""
        event = self.get_event(event_id)
        if not event:
            return None
        
        for key, value in kwargs.items():
            if hasattr(event, key):
                setattr(event, key, value)
        
        self.db.commit()
        self.db.refresh(event)
        return event
