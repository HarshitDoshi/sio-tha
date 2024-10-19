from datetime import datetime, timezone
from typing import Any, List
from uuid import UUID
from decimal import Decimal
from models import Base, Space
from sqlalchemy import DateTime, ForeignKey, String, Numeric
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column, relationship


class TransactionType(Base):
    __tablename__ = "transaction_types"

    value: Mapped[str] = mapped_column(String, unique=True)
    transactions: Mapped[List["Transaction"]] = relationship("Transaction", back_populates="type")

    def __init__(self, **kw: Any):
        super().__init__(**kw)

    def __repr__(self) -> str:
        return f"TransactionType(id={self.id!r}, value={self.value!r})"


class Transaction(Base):
    __tablename__ = "transactions"

    space_id: Mapped[UUID] = mapped_column(ForeignKey("spaces.id"))
    space: Mapped["Space"] = relationship("Space", back_populates="transactions")
    type_id: Mapped[UUID] = mapped_column(ForeignKey("transaction_types.id"))
    type: Mapped["TransactionType"] = relationship("TransactionType", back_populates="transactions")
    amount: Mapped[Decimal] = mapped_column(Numeric(precision=12, scale=2, asdecimal=True), nullable=False, default=Decimal(0))
    occurred_datetime: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc), nullable=False
    )

    def __init__(self, **kw: Any):
        super().__init__(**kw)

    def __repr__(self) -> str:
        return f"Transaction(id={self.id!r}, space={self.space!r}, type={self.type!r}, amount={self.amount!r}, occurred_datetime={self.occurred_datetime!r})"
