"""
Metis Platform - Device Model
"""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, String, Text
from sqlalchemy.dialects.postgresql import ARRAY, JSONB
from sqlalchemy.orm import Mapped, mapped_column

from models.base import Base


class Device(Base):
    """Device model - physical or virtual devices."""
    
    __tablename__ = "devices"
    
    device_type: Mapped[str] = mapped_column(String(100), nullable=False)
    identifier: Mapped[str | None] = mapped_column(String(255))
    manufacturer: Mapped[str | None] = mapped_column(String(255))
    model: Mapped[str | None] = mapped_column(String(255))
    owner_guess: Mapped[str | None] = mapped_column(String(255))
    description: Mapped[str | None] = mapped_column(Text)
    tags: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    meta_info: Mapped[dict | None] = mapped_column(JSONB, default=dict)
    
    def __repr__(self) -> str:
        return f"<Device(id={self.id}, device_type={self.device_type}, identifier={self.identifier})>"
