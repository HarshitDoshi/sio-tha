from uuid import UUID
from datetime import datetime
from decimal import Decimal
from pydantic import BaseModel, ConfigDict

from schemas.Space import SpaceResponse


class TransactionTypeRequest(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    value: str

class TransactionTypeResponse(TransactionTypeRequest):
    model_config = ConfigDict(from_attributes=True)

    id: UUID


class TransactionRequest(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    type: UUID
    amount: Decimal
    occurred_datetime: datetime


class TransactionResponse(TransactionRequest):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    space: SpaceResponse
    type: TransactionTypeResponse
    created_datetime: datetime
    updated_datetime: datetime
