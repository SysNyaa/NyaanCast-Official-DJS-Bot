// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const { readdirSync } = require('fs');
const { Collection } = require('discord.js');
const { PREFIX, TOKEN, STATUS, DEFAULTSTATUS } = process.env;

// Create a new client instance
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,

    ] 
});

client.commands = new Collection();
client.aliases = new Collection();

const commandFiles = readdirSync('./src/cmds/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./cmds/${file}`);
    console.log(`${file} loaded.`);
    client.commands.set(command.help.name, command);
}

client.once('ready', (c) => {
    console.log(`${c.user.username} is online!`);
});

client.on('messageCreate', async msg => {
    console.log(msg.author.username + ': ' + msg.content);
    
    if (msg.author.bot || !msg.content.startsWith(PREFIX)) return;

    const args = msg.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    if (cmd) cmd.run(client, msg, args);
});

client.login(TOKEN);
