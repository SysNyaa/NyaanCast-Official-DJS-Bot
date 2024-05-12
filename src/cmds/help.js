// cmds/help.js

const fs = require('fs');
const path = require('path');
const { Collection, EmbedBuilder } = require('discord.js');

module.exports = {
    help: {
        name: 'help',
        description: 'Display useful command information in an embed.',
        usage: '!help',
        category: 'Utility'
    },
    run(client, message, args) {
        const commands = new Collection();

        // Read command files from the cmds directory
        const commandFiles = fs.readdirSync(path.join(__dirname, '../cmds')).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../cmds/${file}`);
            if (command.help) {
                commands.set(command.help.name, command.help);
            }
        }

        // Create embed builder
        const embedBuilder = new EmbedBuilder();

        const embed = embedBuilder
            .setColor('#0099ff')
            .setTitle('Command Help')
            .setDescription('List of available commands:');

        commands.forEach(command => {
            embed.addFields({
                name: command.name,
                value: `**Description:** ${command.description}\n**Usage:** ${command.usage}\n**Category:** ${command.category}`,
                inline: false
            });
        });

        message.channel.send({ embeds: [embed] });
    }
};
