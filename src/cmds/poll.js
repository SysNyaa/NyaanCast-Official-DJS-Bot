// cmds/poll.js

const { EmbedBuilder } = require('discord.js');

module.exports = {
    help: {
        name: 'poll',
        description: 'Create a poll for users to vote on.',
        usage: '!poll -q <question> -c <color>',
        category: 'Utility'
    },
    run(c, msg, args) {
        // Initialize variables for question and color
        let question = '';
        let color = '#3498db'; // Default color (blue)

        // Loop through command arguments to parse options
        for (let i = 0; i < args.length; i++) {
            if (args[i] === '-q' && i + 1 < args.length) {
                // Set question if '-q' option is found
                question = args[i + 1];
                i++; // Increment index to skip the next argument
            } else if (args[i] === '-c' && i + 1 < args.length) {
                // Set color if '-c' option is found
                color = args[i + 1];
                i++; // Increment index to skip the next argument
            }
        }

        // Check if question is provided
        if (!question) {
            return msg.reply('Please provide a question for the poll!');
        }

        // Create embed builder
        const embedBuilder = new EmbedBuilder();
        
        // Set embed properties
        embedBuilder.setColor(color)
            .setTitle(question)
            .setDescription(`Poll created by ${msg.author.username}`)
            .setFooter({ text: 'React to vote' });

        // Build the embed
        const embed = embedBuilder.toJSON();

        // Send the embed
        msg.channel.send({ embeds: [embed] }).then(sentMsg => {
            // React with 🟢 for agreement and 🔴 for disagreement
            sentMsg.react('🟢');
            sentMsg.react('🔴');
        });
    }
};
