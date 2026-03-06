"""
Metis Platform - Location Model
"""

import uuid
from datetime import datetime
from typing import TYPE_CHECKING, Any

from sqlalchemy import DateTime, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base

if TYPE_CHECKING:
    from models.event import Event


class Location(Base):
    """Location model - geospatial data."""
    
    __tablename__ = "locations"
    
    name: Mapped[str | None] = mapped_column(String(255))
    address: Mapped[str | None] = mapped_column(Text)
    city: Mapped[str | None] = mapped_column(String(255))
    region: Mapped[str | None] = mapped_column(String(255))
    country: Mapped[str | None] = mapped_column(String(100))
    postal_code: Mapped[str | None] = mapped_column(String(50))
    latitude: Mapped[float | None] = mapped_column()
    longitude: Mapped[float | None] = mapped_column()
    location_type: Mapped[str | None] = mapped_column(String(100))
    meta_info: Mapped[dict | None] = mapped_column(JSONB, default=dict)
    
    # Relationships
    events: Mapped[list["Event"]] = relationship("Event", back_populates="location")
    
    def __repr__(self) -> str:
        return f"<Location(id={self.id}, name={self.name}, city={self.city})>"
