"""
Metis Platform - Case Model
"""

import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, String, Text, text
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base

if TYPE_CHECKING:
    from models.event import Event
    from models.narrative import Narrative
    from models.task import Task
    from models.user import User


class Case(Base):
    """Case model - investigation container."""
    
    __tablename__ = "cases"
    
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    case_number: Mapped[str | None] = mapped_column(String(100), unique=True)
    status: Mapped[str] = mapped_column(String(50), default="open")
    priority: Mapped[str] = mapped_column(String(50), default="medium")
    tags: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    owner_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("NOW()"))
    closed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    
    # Relationships
    owner: Mapped["User"] = relationship("User", back_populates="owned_cases")
    events: Mapped[list["Event"]] = relationship("Event", back_populates="case")
    narratives: Mapped[list["Narrative"]] = relationship("Narrative", back_populates="case")
    tasks: Mapped[list["Task"]] = relationship("Task", back_populates="case")
    
    def __repr__(self) -> str:
        return f"<Case(id={self.id}, title={self.title}, status={self.status})>"
