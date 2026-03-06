"""
Metis Platform - Actor Model
"""

import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, String, Text
from sqlalchemy.dialects.postgresql import ARRAY, JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base

if TYPE_CHECKING:
    from models.account import Account


class Actor(Base):
    """Actor model - people or entities of interest."""
    
    __tablename__ = "actors"
    
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    aliases: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    actor_type: Mapped[str | None] = mapped_column(String(100))
    description: Mapped[str | None] = mapped_column(Text)
    threat_level: Mapped[str] = mapped_column(String(50), default="unknown")
    tags: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    meta_info: Mapped[dict | None] = mapped_column(JSONB, default=dict)
    
    # Relationships
    accounts: Mapped[list["Account"]] = relationship("Account", back_populates="actor")
    
    def __repr__(self) -> str:
        return f"<Actor(id={self.id}, name={self.name}, type={self.actor_type})>"
