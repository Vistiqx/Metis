"""
Metis Platform - Evidence Model
"""

import uuid
from datetime import datetime

from sqlalchemy import BigInteger, DateTime, ForeignKey, Numeric, String, Text
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base


class Evidence(Base):
    """Evidence model - supporting documentation."""
    
    __tablename__ = "evidence"
    
    event_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("events.id", ondelete="CASCADE"))
    source_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("sources.id"))
    evidence_type: Mapped[str] = mapped_column(String(100), nullable=False)
    title: Mapped[str | None] = mapped_column(String(500))
    description: Mapped[str | None] = mapped_column(Text)
    content_text: Mapped[str | None] = mapped_column(Text)
    content_url: Mapped[str | None] = mapped_column(Text)
    storage_path: Mapped[str | None] = mapped_column(Text)
    storage_provider: Mapped[str] = mapped_column(String(100), default="s3")
    file_hash: Mapped[str | None] = mapped_column(String(255))
    file_size_bytes: Mapped[int | None] = mapped_column(BigInteger)
    mime_type: Mapped[str | None] = mapped_column(String(255))
    captured_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    reliability_score: Mapped[float | None] = mapped_column(Numeric(3, 2))
    tags: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    meta_info: Mapped[dict | None] = mapped_column(JSONB, default=dict)
    created_by: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    def __repr__(self) -> str:
        return f"<Evidence(id={self.id}, evidence_type={self.evidence_type}, title={self.title})>"
