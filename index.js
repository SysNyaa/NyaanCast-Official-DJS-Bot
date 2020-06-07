const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();

client.once('ready', () => {
	console.log(`Logged in as ${client.user.username}.`);
});

client.on('message', async message => {
	console.log(`${message.author.username}: ${message.content}`);
});

client.login(process.env.TOKEN);
