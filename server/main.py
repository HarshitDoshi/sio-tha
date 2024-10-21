#!/usr/bin/python

from contextlib import asynccontextmanager
from fastapi import FastAPI as Application, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from sqlalchemy.ext.asyncio.session import AsyncSession as Session
from sqlalchemy.exc import SQLAlchemyError
from typing import List
from database import Database
from models import Base, Space, Transaction, TransactionType
from schemas import SpaceResponse, SpaceRequest, TransactionResponse, TransactionRequest, TransactionTypeRequest, TransactionTypeResponse

database = Database()


@asynccontextmanager
async def lifespan(app: Application):
    async with database.engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
    yield
    await connection.close()


application = Application(lifespan=lifespan)

origins = [
    "http://web-client.localhost/",
    "*",
]

application.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def read_database_session():
    async with database.read_database_session_context() as session:
        yield session


@application.post("/spaces/", response_model=SpaceResponse)
async def create_space(
    space: SpaceRequest, session: Session = Depends(read_database_session)
):
    new_space = Space(name=(space.name if (space.name and space.name != "") else "New Space"))
    try:
        session.add(new_space)
        await session.commit()
        await session.refresh(new_space)
    except SQLAlchemyError as error:
        await session.rollback()
        raise HTTPException(status_code=500, detail=str(error))
    return new_space


# @application.get("/spaces/", response_model=List[SpaceResponse])
# async def read_spaces(session: Session = Depends(read_database_session)):
#     try:
#         spaces = (await session.scalars(select(Space))).all()
#         return spaces
#     except SQLAlchemyError as error:
#         raise HTTPException(status_code=500, detail=str(error))
    

@application.post("/transaction_types/", response_model=TransactionTypeResponse)
async def create_transaction_type(
    transaction_type: TransactionTypeRequest,
    session: Session = Depends(read_database_session),
):
    new_transaction_type = TransactionType(
        value=transaction_type.value,
    )
    try:
        session.add(new_transaction_type)
        await session.commit()
        await session.refresh(new_transaction_type)
    except SQLAlchemyError as error:
        await session.rollback()
        raise HTTPException(status_code=500, detail=str(error))
    return new_transaction_type


@application.get("/transaction_types/", response_model=List[TransactionTypeResponse])
async def read_transaction_types(session: Session = Depends(read_database_session)):
    try:
        transaction_types = (await session.scalars(select(TransactionType))).all()
        return transaction_types
    except SQLAlchemyError as error:
        raise HTTPException(status_code=500, detail=str(error))
    

@application.post("/{space_id}/transactions/", response_model=TransactionResponse)
async def create_transaction(
    space_id: str,
    transaction: TransactionRequest,
    session: Session = Depends(read_database_session),
):
    space = (await session.scalars(select(Space).where(Space.id == space_id))).one_or_none()
    transaction_type = (await session.scalars(select(TransactionType).where(TransactionType.id == transaction.type))).one_or_none()
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")
    if not transaction_type:
        raise HTTPException(status_code=404, detail="Transaction Type not found")
    new_transaction = Transaction(
        space=space,
        type=transaction_type,
        amount=transaction.amount,
        occurred_datetime=transaction.occurred_datetime,
    )
    try:
        session.add(new_transaction)
        await session.commit()
        await session.refresh(new_transaction)
    except SQLAlchemyError as error:
        await session.rollback()
        raise HTTPException(status_code=500, detail=str(error))
    return TransactionResponse.model_validate(new_transaction)


@application.delete("/{space_id}/transactions/{transaction_id}/", response_model=TransactionResponse)
async def delete_transaction(
    space_id: str,
    transaction_id: str,
    session: Session = Depends(read_database_session),
):
    transaction_to_be_deleted = (
        await session.scalars(
            select(Transaction)
                .where(
                    Transaction.id == transaction_id and Transaction.space_id == space_id
                )
        )
    ).one_or_none()
    if not transaction_to_be_deleted:
        raise HTTPException(status_code=404, detail="Transaction not found")
    try:
        await session.delete(transaction_to_be_deleted)
        await session.commit()
        await session.refresh(transaction_to_be_deleted)
    except SQLAlchemyError as error:
        await session.rollback()
        raise HTTPException(status_code=500, detail=str(error))
    return transaction_to_be_deleted

    
@application.get("/{space_id}/transactions/", response_model=List[TransactionResponse])
async def read_transactions(space_id: str, session: Session = Depends(read_database_session)):
    try:
        space = (
            await session.scalars(
                select(Space)
                    .options(
                        joinedload(Space.transactions)
                        .joinedload(Transaction.type)
                    )
                    .where(Space.id == space_id)
            )
        ).unique().one_or_none()
        if not space:
            raise HTTPException(status_code=404, detail="Space not found")
        transactions = [
            TransactionResponse.model_validate(transaction)
            for transaction in space.transactions
        ]
        return transactions
    except SQLAlchemyError as error:
        raise HTTPException(status_code=500, detail=str(error))
