import logging
import os
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine as create_engine
from sqlalchemy.ext.asyncio.session import (
    async_sessionmaker as sessionmaker,
)
from sqlalchemy.exc import SQLAlchemyError

from utilities.base import SingletonMeta

load_dotenv()


logger = logging.getLogger(__name__)


class Database(metaclass=SingletonMeta):
    def __init__(self):
        """Initialize the database connection."""
        self.DATABASE_TYPE = os.getenv("DATABASE_TYPE", "postgresql")
        self.DATABASE_DRIVER = os.getenv("DATABASE_DRIVER", "psycopg")
        self.DATABASE_USER = os.getenv("DATABASE_USER")
        self.DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
        self.DATABASE_HOST = os.getenv("DATABASE_HOST", "database")
        self.DATABASE_PORT = os.getenv("DATABASE_PORT", "5432")
        self.DATABASE_NAME = os.getenv("DATABASE_NAME")

        self.database_url = (
            f"{self.DATABASE_TYPE}+{self.DATABASE_DRIVER}://"
            f"{self.DATABASE_USER}:{self.DATABASE_PASSWORD}@"
            f"{self.DATABASE_HOST}:{self.DATABASE_PORT}/{self.DATABASE_NAME}"
        )

        self.engine = create_engine(
            self.database_url,
            echo=False,
            pool_pre_ping=True,
            pool_size=10,
            max_overflow=20,
        )

    @asynccontextmanager
    async def read_database_session_context(self):
        """Provide a transactional scope around a series of operations."""
        session_maker = sessionmaker(self.engine, expire_on_commit=False)
        async with session_maker() as session:
            try:
                yield session
                await session.commit()
            except SQLAlchemyError as error:
                await session.rollback()
                logger.error(f"DATABASE error: {error}")
                raise
