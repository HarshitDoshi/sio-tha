from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class SpaceRequest(BaseModel):
    name: str


class SpaceResponse(SpaceRequest):
    model_config = ConfigDict(from_attributes=True)
    
    id: UUID
    created_datetime: datetime
    updated_datetime: datetime
