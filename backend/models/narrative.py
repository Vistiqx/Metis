"""
Metis Platform - Narrative Model
"""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import Mapped, mapped_column

from models.base import Base


class Narrative(Base):
    """Narrative model - stories or explanations."""
    
    __tablename__ = "narratives"
    
    case_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("cases.id", ondelete="CASCADE"))
    title: Mapped[str | None] = mapped_column(String(500))
    narrative_text: Mapped[str] = mapped_column(Text, nullable=False)
    narrative_type: Mapped[str | None] = mapped_column(String(100))
    event_ids: Mapped[list[uuid.UUID] | None] = mapped_column(ARRAY(UUID(as_uuid=True)))
    author_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    version: Mapped[int] = mapped_column(Integer, default=1)
    is_published: Mapped[bool] = mapped_column(default=False)
    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    tags: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    
    def __repr__(self) -> str:
        return f"<Narrative(id={self.id}, title={self.title}, is_published={self.is_published})>"
