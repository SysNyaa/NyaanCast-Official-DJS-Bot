// cmds/userinfo.js

const { EmbedBuilder } = require('discord.js');

module.exports = {
    help: {
        name: 'userinfo',
        description: 'Display information about the user.',
        usage: '',
        category: 'Utility'
    },
    run(c, msg, args) {
        try {
            // Get the user who sent the message
            const user = msg.author;

            // Create embed builder
            const embedBuilder = new EmbedBuilder();

            // Create the embed
            const embed = embedBuilder
                .setTitle('User Info')
                .setDescription('Information about the user.')
                .setColor('#0099ff') // Set the color directly to hex code
                .setImage(user.displayAvatarURL({ dynamic: true }))
                .setFooter({ text: `Requested by ${msg.author.username}` }) // Set the footer as an object
                .setAuthor({ name: user.username, icon_url: user.displayAvatarURL({ dynamic: true }) }) // Set the author as an object

            // Send the embed
            msg.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching user info:', error);
            msg.channel.send('An error occurred while fetching user info.');
        }
    }
};
