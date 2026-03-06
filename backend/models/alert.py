"""
Metis Platform - Alert Model
"""

import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from models.base import Base


class Alert(Base):
    """Alert model - notifications and warnings."""
    
    __tablename__ = "alerts"
    
    alert_type: Mapped[str] = mapped_column(String(100), nullable=False)
    severity: Mapped[str] = mapped_column(String(50), default="medium")
    title: Mapped[str | None] = mapped_column(String(500))
    message: Mapped[str | None] = mapped_column(Text)
    related_entity_type: Mapped[str | None] = mapped_column(String(100))
    related_entity_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True))
    watchlist_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("watchlists.id"))
    acknowledged: Mapped[bool] = mapped_column(default=False)
    acknowledged_by: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    acknowledged_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    dismissed: Mapped[bool] = mapped_column(default=False)
    dismissed_by: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    dismissed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    
    def __repr__(self) -> str:
        return f"<Alert(id={self.id}, alert_type={self.alert_type}, severity={self.severity})>"
