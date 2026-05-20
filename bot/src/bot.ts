import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { Events, Guild } from 'discord.js';
import { BotClient } from './structures/BotClient';
import { load_components, load_cmds, deploy_cmds, load_events, delete_cmd } from './handler';

const client = new BotClient();
const token = process.env.TOKEN;
const clientId = process.env.CLIENTID;
const guildId = process.env.GUILDID;

async function start() {
    try {
        await load_components(client);
        await load_cmds(client);
        await load_events(client);
        await deploy_cmds(clientId, guildId);
        await client.login(token);
    } catch (err) {
        console.error("Bot failed to start:", err);
    }
}

start();

export { token, clientId, client, Events, Guild };