# NeKoROBOT.js

A full-stack Discord.js Bot template:
- Frontend
  - Typescript
  - Node.js v20
  - Discord.js v14
- Backend
  - Python
  - MongoDB

## This template assumes you already..
- Have Node.js and the virutual environment for Python set up.
- Know how to use Docker.
- Know how to use MongoDB.
- Installed the project's dependencies (eg. `package-lock.json` for Node.js and `requirements.txt` for Python)
  - I recommend making a virtual environment within the `core` folder to install packages and run the database so that it won't mess with your global stuff.

## Features:
- Database-agnostic Backend - Done via abstraction layer that sits between current DB implementation (MongoDB) and the DB repository and handler.
- Hardened - Uses `.env` to hide secret variables and requires an API Token for the database to run with the bot and nothng else.
- Example CRUD (Create, Read, Update, Delete) Commands - Generic architecture for database that the Discord bot can interact with via slash commands.
- Deployable - Install Docker on remote servers and run this project as a container by building it as images.
