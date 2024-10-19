from uuid import UUID
from datetime import datetime, timezone
from sqlalchemy import Uuid, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from utilities.database.id import create__id


class Base(DeclarativeBase):
    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=create__id)
    created_datetime: Mapped[datetime] = mapped_column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    updated_datetime: Mapped[datetime] = mapped_column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
