"""
Metis Platform - Source Model
"""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, Numeric, String, Text
from sqlalchemy.dialects.postgresql import ARRAY, JSONB
from sqlalchemy.orm import Mapped, mapped_column

from models.base import Base


class Source(Base):
    """Source model - data origins."""
    
    __tablename__ = "sources"
    
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    source_type: Mapped[str] = mapped_column(String(100), nullable=False)
    url: Mapped[str | None] = mapped_column(Text)
    api_endpoint: Mapped[str | None] = mapped_column(Text)
    description: Mapped[str | None] = mapped_column(Text)
    reliability_score: Mapped[float | None] = mapped_column(Numeric(3, 2))
    is_active: Mapped[bool] = mapped_column(default=True)
    last_ingested_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    ingest_frequency: Mapped[str] = mapped_column(String(50), default="hourly")
    credentials: Mapped[dict | None] = mapped_column(JSONB, default=dict)
    configuration: Mapped[dict | None] = mapped_column(JSONB, default=dict)
    tags: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    
    def __repr__(self) -> str:
        return f"<Source(id={self.id}, name={self.name}, type={self.source_type})>"
