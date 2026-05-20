# NeKoROBOT.js

A full-stack Discord.js Bot template:

Tech Stack
- **Frontend:** TypeScript, Node.js (v20), Discord.js (v14)
- **Backend:** Python (v3.12+), WebSockets
- **Database:** MongoDB

## Features:
- **Database-agnostic Backend** - Done via abstraction layer between the active DB implementation (currently MongoDB) and the data handlers. This makes it easier to swap from one database to another if necessary.
- **Hardened Security** - Uses `.env` to hide secret variables and requires an API Token to securely establish a WebSocket connection from the bot to the database.
- **Example CRUD Commands** - Comes with generic Create, Read, Update, and Delete slash commands out of the box to demo how the Discord bot interacts with the Python database layer.
- **Deployable and Fully Containerized** - Install Docker on your remote server, build the project as images, and run.

## This template assumes you already..
- Know how to use **Docker** and **Docker Compose**.
- Know how to use **MongoDB**.
- Have **Node.js** and `npm` to install `package-lock.json` dependencies.
- Have a virutual environment for **Python** and `pip` to install dependencies in `requirements.txt`.
  - I recommend making a virtual environment within the `core` folder for there you can install the packages locally and run the database so that it won't mess with your global environment.