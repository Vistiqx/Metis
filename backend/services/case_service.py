"""
Metis Platform - Case Service
"""

import uuid
from typing import List, Optional

from sqlalchemy.orm import Session

from models.case import Case
from models.user import User


class CaseService:
    """Service for managing cases."""
    
    def __init__(self, db: Session):
        self.db = db
    
    def get_case(self, case_id: uuid.UUID) -> Optional[Case]:
        """Get a case by ID."""
        return self.db.query(Case).filter(Case.id == case_id).first()
    
    def list_cases(
        self,
        owner_id: Optional[uuid.UUID] = None,
        status: Optional[str] = None,
        skip: int = 0,
        limit: int = 100
    ) -> List[Case]:
        """List cases with optional filters."""
        query = self.db.query(Case)
        
        if owner_id:
            query = query.filter(Case.owner_id == owner_id)
        if status:
            query = query.filter(Case.status == status)
        
        return query.offset(skip).limit(limit).all()
    
    def create_case(
        self,
        title: str,
        owner: User,
        description: Optional[str] = None,
        priority: str = "medium",
        tags: Optional[List[str]] = None
    ) -> Case:
        """Create a new case."""
        case = Case(
            title=title,
            description=description,
            owner_id=owner.id,
            priority=priority,
            tags=tags or []
        )
        self.db.add(case)
        self.db.commit()
        self.db.refresh(case)
        return case
    
    def update_case(
        self,
        case_id: uuid.UUID,
        **kwargs
    ) -> Optional[Case]:
        """Update a case."""
        case = self.get_case(case_id)
        if not case:
            return None
        
        for key, value in kwargs.items():
            if hasattr(case, key):
                setattr(case, key, value)
        
        self.db.commit()
        self.db.refresh(case)
        return case
    
    def delete_case(self, case_id: uuid.UUID) -> bool:
        """Delete a case."""
        case = self.get_case(case_id)
        if not case:
            return False
        
        self.db.delete(case)
        self.db.commit()
        return True
