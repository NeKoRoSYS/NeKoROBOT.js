import dns from 'node:dns';
dns.setServers(['1.1.1.1', '8.8.8.8']); 

import { MongoClient, ServerApiVersion } from 'mongodb';

const URL = process.env.DBURI;

if (!URL) {
    console.error("CRITICAL ERROR: DBURI is undefined! Check your environment settings.");
}

const client = new MongoClient(
    URL,
    {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: false,
            deprecationErrors: true
        },
        serverSelectionTimeoutMS: 5000 
    }
);

export async function db_connect() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB!");
    } catch (err) {
        console.error("Failed to connect to MongoDB!", err);
    }
}