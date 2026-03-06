"""
Metis Platform - Artifact Model
"""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, String, Text
from sqlalchemy.dialects.postgresql import ARRAY, JSONB
from sqlalchemy.orm import Mapped, mapped_column

from models.base import Base


class Artifact(Base):
    """Artifact model - objects or markers in evidence."""
    
    __tablename__ = "artifacts"
    
    artifact_type: Mapped[str] = mapped_column(String(100), nullable=False)
    label: Mapped[str | None] = mapped_column(String(255))
    description: Mapped[str | None] = mapped_column(Text)
    visual_features: Mapped[dict | None] = mapped_column(JSONB, default=dict)
    extracted_text: Mapped[str | None] = mapped_column(Text)
    tags: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    meta_info: Mapped[dict | None] = mapped_column(JSONB, default=dict)
    
    def __repr__(self) -> str:
        return f"<Artifact(id={self.id}, artifact_type={self.artifact_type}, label={self.label})>"
