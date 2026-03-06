"""
Metis Platform - Event Model
"""

import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, Numeric, String, Text, text
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base

if TYPE_CHECKING:
    from models.case import Case
    from models.location import Location
    from models.user import User


class Event(Base):
    """Event model - detected incidents or occurrences."""
    
    __tablename__ = "events"
    
    case_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("cases.id", ondelete="CASCADE"))
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    event_type: Mapped[str | None] = mapped_column(String(100))
    severity: Mapped[str] = mapped_column(String(50), default="medium")
    status: Mapped[str] = mapped_column(String(50), default="unconfirmed")
    confidence_score: Mapped[float | None] = mapped_column(Numeric(3, 2))
    occurred_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    location_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("locations.id"))
    tags: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    meta_info: Mapped[dict | None] = mapped_column(JSONB, default=dict)
    created_by: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    # Relationships
    case: Mapped["Case"] = relationship("Case", back_populates="events")
    location: Mapped["Location"] = relationship("Location", back_populates="events")
    creator: Mapped["User"] = relationship("User")
    
    def __repr__(self) -> str:
        return f"<Event(id={self.id}, title={self.title}, type={self.event_type})>"
