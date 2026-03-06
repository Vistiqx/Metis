"""
Metis Platform - Evidence Service
"""

import uuid
from datetime import datetime
from typing import List, Optional

from sqlalchemy.orm import Session

from models.evidence import Evidence
from models.user import User


class EvidenceService:
    """Service for managing evidence."""
    
    def __init__(self, db: Session):
        self.db = db
    
    def get_evidence(self, evidence_id: uuid.UUID) -> Optional[Evidence]:
        """Get evidence by ID."""
        return self.db.query(Evidence).filter(Evidence.id == evidence_id).first()
    
    def list_evidence(
        self,
        event_id: Optional[uuid.UUID] = None,
        source_id: Optional[uuid.UUID] = None,
        evidence_type: Optional[str] = None,
        skip: int = 0,
        limit: int = 100
    ) -> List[Evidence]:
        """List evidence with optional filters."""
        query = self.db.query(Evidence)
        
        if event_id:
            query = query.filter(Evidence.event_id == event_id)
        if source_id:
            query = query.filter(Evidence.source_id == source_id)
        if evidence_type:
            query = query.filter(Evidence.evidence_type == evidence_type)
        
        return query.offset(skip).limit(limit).all()
    
    def create_evidence(
        self,
        event_id: uuid.UUID,
        evidence_type: str,
        creator: User,
        title: Optional[str] = None,
        description: Optional[str] = None,
        content_text: Optional[str] = None,
        content_url: Optional[str] = None,
        source_id: Optional[uuid.UUID] = None,
        captured_at: Optional[datetime] = None,
        tags: Optional[List[str]] = None
    ) -> Evidence:
        """Create new evidence."""
        evidence = Evidence(
            event_id=event_id,
            evidence_type=evidence_type,
            title=title,
            description=description,
            content_text=content_text,
            content_url=content_url,
            source_id=source_id,
            captured_at=captured_at,
            tags=tags or [],
            created_by=creator.id
        )
        self.db.add(evidence)
        self.db.commit()
        self.db.refresh(evidence)
        return evidence
