import os
from dotenv import load_dotenv
import json
from db.repo_factory import db
from pymongo.errors import DuplicateKeyError

# -- bot --
# TODO introduce Pydantic

load_dotenv()
TOKEN = os.getenv('APITOKEN')
if not TOKEN:
    raise ValueError("FATAL ERROR: 'TOKEN' is missing in .env file.")
user_repo = MongoUserRepository(user_collection)

async def handle_create(websocket, payload, interaction_id):
    discord_id = payload.get('discord_id')
    username = payload.get('username')
    
    success = await user_repo.create_user(discord_id, username)
    if success:
        await websocket.send(json.dumps({"event": "created", "interaction_id": interaction_id}))
    else:
        await websocket.send(json.dumps({"error": True, "interaction_id": interaction_id, "message": "User already exists!"}))

async def handle_read(websocket, payload, interaction_id):
    user = await user_repo.get_user(payload.get('discord_id'))
    if user:
        await websocket.send(json.dumps({"event": "read", "interaction_id": interaction_id, "data": user}))
    else:
        await websocket.send(json.dumps({"error": True, "interaction_id": interaction_id, "message": "User not found."}))

async def handle_update(websocket, payload, interaction_id):
    success = await user_repo.update_bio(payload.get('discord_id'), payload.get('bio'))
    if success:
        await websocket.send(json.dumps({"event": "updated", "interaction_id": interaction_id}))
    else:
        await websocket.send(json.dumps({"error": True, "interaction_id": interaction_id, "message": "User not found or bio unchanged."}))

async def handle_delete(websocket, payload, interaction_id):
    success = await user_repo.delete_user(payload.get('discord_id'))
    if success:
        await websocket.send(json.dumps({"event": "deleted", "interaction_id": interaction_id}))
    else:
        await websocket.send(json.dumps({"error": True, "interaction_id": interaction_id, "message": "User not found."}))