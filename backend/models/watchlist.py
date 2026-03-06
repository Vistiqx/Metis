"""
Metis Platform - Watchlist Model
"""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Numeric, String, Text
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base


class Watchlist(Base):
    """Watchlist model - monitored entities."""
    
    __tablename__ = "watchlists"
    
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    watchlist_type: Mapped[str] = mapped_column(String(100), nullable=False)
    entity_type: Mapped[str | None] = mapped_column(String(100))
    entity_ids: Mapped[list[uuid.UUID] | None] = mapped_column(ARRAY(UUID(as_uuid=True)))
    query_criteria: Mapped[dict | None] = mapped_column(JSONB, default=dict)
    alert_threshold: Mapped[float] = mapped_column(Numeric(3, 2), default=0.5)
    is_active: Mapped[bool] = mapped_column(default=True)
    created_by: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    def __repr__(self) -> str:
        return f"<Watchlist(id={self.id}, name={self.name}, type={self.watchlist_type})>"
