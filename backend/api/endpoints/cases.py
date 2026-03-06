"""
Metis Platform - Case Endpoints
"""

import uuid
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from core.auth import get_current_active_user
from core.database import get_db
from models.user import User
from services.case_service import CaseService

router = APIRouter(prefix="/cases", tags=["cases"])


class CaseCreate(BaseModel):
    title: str
    description: str | None = None
    priority: str = "medium"
    tags: List[str] = []


class CaseUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    status: str | None = None
    priority: str | None = None
    tags: List[str] | None = None


class CaseResponse(BaseModel):
    id: str
    title: str
    description: str | None
    case_number: str | None
    status: str
    priority: str
    tags: List[str] | None
    owner_id: str | None
    created_at: str

    class Config:
        from_attributes = True


@router.get("", response_model=List[CaseResponse])
def list_cases(
    status: str | None = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """List cases."""
    case_service = CaseService(db)
    cases = case_service.list_cases(status=status, skip=skip, limit=limit)
    return cases


@router.post("", response_model=CaseResponse, status_code=status.HTTP_201_CREATED)
def create_case(
    case_data: CaseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new case."""
    case_service = CaseService(db)
    case = case_service.create_case(
        title=case_data.title,
        owner=current_user,
        description=case_data.description,
        priority=case_data.priority,
        tags=case_data.tags
    )
    return case


@router.get("/{case_id}", response_model=CaseResponse)
def get_case(
    case_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get a case by ID."""
    case_service = CaseService(db)
    case = case_service.get_case(case_id)
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    return case


@router.patch("/{case_id}", response_model=CaseResponse)
def update_case(
    case_id: uuid.UUID,
    case_data: CaseUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update a case."""
    case_service = CaseService(db)
    case = case_service.update_case(case_id, **case_data.model_dump(exclude_unset=True))
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    return case


@router.delete("/{case_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_case(
    case_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a case."""
    case_service = CaseService(db)
    success = case_service.delete_case(case_id)
    if not success:
        raise HTTPException(status_code=404, detail="Case not found")
    return None
