"""
Metis Platform - User Model
"""

import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, DateTime, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base

if TYPE_CHECKING:
    from models.case import Case
    from models.task import Task


class User(Base):
    """User model for authentication and authorization."""
    
    __tablename__ = "users"
    
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    username: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str | None] = mapped_column(String(255))
    role: Mapped[str] = mapped_column(String(50), default="analyst")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_superuser: Mapped[bool] = mapped_column(Boolean, default=False)
    last_login_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    
    # Relationships
    owned_cases: Mapped[list["Case"]] = relationship("Case", back_populates="owner")
    assigned_tasks: Mapped[list["Task"]] = relationship("Task", foreign_keys="Task.assigned_to", back_populates="assignee")
    created_tasks: Mapped[list["Task"]] = relationship("Task", foreign_keys="Task.created_by", back_populates="creator")
    
    def __repr__(self) -> str:
        return f"<User(id={self.id}, username={self.username}, email={self.email})>"
