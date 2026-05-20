import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

URL = os.getenv('DBURI')
client = AsyncIOMotorClient(URL)
db = client["opensource_bot_db"]
user_collection = db["users"]