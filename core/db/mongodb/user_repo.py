from db.interfaces.i_user_repo import IUserRepository

class MongoUserRepository:
    def __init__(self, collection):
        self.collection = collection
        
    async def initialize(self) -> None:
        await self.collection.create_index("discord_id", unique=True)

    # CREATE
    async def create_user(self, discord_id: str, username: str, bio: str = "Hello World!") -> bool:
        try:
            await self.collection.insert_one({
                "discord_id": discord_id,
                "username": username,
                "bio": bio
            })
            return True
        except:
            return False

    # READ
    async def get_user(self, discord_id: str) -> dict:
        return await self.collection.find_one({"discord_id": discord_id}, {"_id": 0})

    # UPDATE
    async def update_bio(self, discord_id: str, new_bio: str) -> bool:
        result = await self.collection.update_one(
            {"discord_id": discord_id}, 
            {"$set": {"bio": new_bio}}
        )
        return result.modified_count > 0
            
    # DELETE
    async def delete_user(self, discord_id: str) -> bool:
        result = await self.collection.delete_one({"discord_id": discord_id})
        return result.deleted_count > 0