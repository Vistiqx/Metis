"""
Metis Platform - Collection Model
"""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import Mapped, mapped_column

from models.base import Base


class Collection(Base):
    """Collection model - grouped items."""
    
    __tablename__ = "collections"
    
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    collection_type: Mapped[str | None] = mapped_column(String(100))
    entity_type: Mapped[str | None] = mapped_column(String(100))
    entity_ids: Mapped[list[uuid.UUID] | None] = mapped_column(ARRAY(UUID(as_uuid=True)))
    created_by: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    def __repr__(self) -> str:
        return f"<Collection(id={self.id}, name={self.name}, type={self.collection_type})>"
