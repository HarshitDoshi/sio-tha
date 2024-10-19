from typing import Any, List
from models import Base
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models import Transaction


class Space(Base):
    __tablename__ = "spaces"

    name: Mapped[str] = mapped_column(String(1024), nullable=False, default="")
    transactions: Mapped[List["Transaction"]] = relationship("Transaction", back_populates="space")

    def __init__(self, **kw: Any):
        super().__init__(**kw)

    def __repr__(self) -> str:
        return f"Space(id={self.id!r}, name={self.name!r}, created_datetime={self.created_datetime!r}, updated_datetime={self.updated_datetime!r})"
