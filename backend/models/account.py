"""
Metis Platform - Account Model
"""

import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base

if TYPE_CHECKING:
    from models.actor import Actor


class Account(Base):
    """Account model - online identities and channels."""
    
    __tablename__ = "accounts"
    __table_args__ = (UniqueConstraint("platform", "handle", name="uq_account_platform_handle"),)
    
    actor_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("actors.id", ondelete="CASCADE"))
    platform: Mapped[str] = mapped_column(String(100), nullable=False)
    handle: Mapped[str] = mapped_column(String(255), nullable=False)
    display_name: Mapped[str | None] = mapped_column(String(255))
    profile_url: Mapped[str | None] = mapped_column(Text)
    bio: Mapped[str | None] = mapped_column(Text)
    follower_count: Mapped[int | None] = mapped_column(Integer)
    following_count: Mapped[int | None] = mapped_column(Integer)
    post_count: Mapped[int | None] = mapped_column(Integer)
    created_on_platform: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    last_seen_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    is_active: Mapped[bool] = mapped_column(default=True)
    language_set: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    geo_hints: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    tags: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    meta_info: Mapped[dict | None] = mapped_column(JSONB, default=dict)
    discovered_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
    
    # Relationships
    actor: Mapped["Actor"] = relationship("Actor", back_populates="accounts")
    
    def __repr__(self) -> str:
        return f"<Account(id={self.id}, platform={self.platform}, handle={self.handle})>"
