import os
from dotenv import load_dotenv
from db.db_connections import user_collection
from db.mongodb.user_repo import MongoUserRepository
# Import future PostgreSQL/MySQL repos here

load_dotenv()
ENGNINE = os.getenv('DBENGINE')

class DatabaseFactory:
    def __init__(self):
        self.db_engine = os.getenv(ENGNINE, "mongodb").lower()
        
        if self.db_engine == "mongodb":
            self.user_repo = MongoUserRepository(user_collection)
            
        elif self.db_engine == "postgres":
            # self.user_repo = PostgresUserRepository(postgres_connection)
            pass
        else:
            raise ValueError(f"Unsupported database engine: {self.db_engine}")
        
    async def initialize_all(self):
        """Initializes all repositories based on the active DB engine."""
        print(f"Initializing {self.db_engine} database components...")
        await self.user_repo.initialize()

db = DatabaseFactory()