"""
Metis Platform - CandidateEvent Model
"""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from models.base import Base


class CandidateEvent(Base):
    """CandidateEvent model - emerging possible events."""
    
    __tablename__ = "candidate_events"
    
    title: Mapped[str | None] = mapped_column(String(500))
    event_type_guess: Mapped[str | None] = mapped_column(String(100))
    first_seen_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
    current_score: Mapped[float | None] = mapped_column(Numeric(5, 4))
    confidence: Mapped[float | None] = mapped_column(Numeric(3, 2))
    status: Mapped[str] = mapped_column(String(50), default="emerging")
    location_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("locations.id"))
    latitude_min: Mapped[float | None] = mapped_column()
    latitude_max: Mapped[float | None] = mapped_column()
    longitude_min: Mapped[float | None] = mapped_column()
    longitude_max: Mapped[float | None] = mapped_column()
    source_count: Mapped[int] = mapped_column(Integer, default=0)
    source_ids: Mapped[list[uuid.UUID] | None] = mapped_column(ARRAY(UUID(as_uuid=True)))
    narrative_markers: Mapped[dict | None] = mapped_column(JSONB, default=dict)
    promoted_to_event_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("events.id"))
    tags: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    
    def __repr__(self) -> str:
        return f"<CandidateEvent(id={self.id}, title={self.title}, status={self.status}, score={self.current_score})>"
