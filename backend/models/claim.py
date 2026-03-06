"""
Metis Platform - Claim Model
"""

import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Numeric, String, Text
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from models.base import Base


class Claim(Base):
    """Claim model - assertions about events."""
    
    __tablename__ = "claims"
    
    event_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("events.id", ondelete="CASCADE"))
    claim_text: Mapped[str] = mapped_column(Text, nullable=False)
    claim_type: Mapped[str | None] = mapped_column(String(100))
    source_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("sources.id"))
    evidence_ids: Mapped[list[uuid.UUID] | None] = mapped_column(ARRAY(UUID(as_uuid=True)))
    confidence_score: Mapped[float | None] = mapped_column(Numeric(3, 2))
    verified: Mapped[bool] = mapped_column(default=False)
    verified_by: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    tags: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    
    def __repr__(self) -> str:
        return f"<Claim(id={self.id}, claim_type={self.claim_type}, verified={self.verified})>"
