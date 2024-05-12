// cmds/embed.js

const { EmbedBuilder, ColorResolvable } = require('discord.js');

module.exports = {
    help: {
        name: 'embed',
        description: 'Create an embedded message.',
        usage: '!embed -t <title> -d <description> -c <color> -f <footer> -a [true|false]',
        category: 'Utility'
    },
    async run(c, msg, args) {
        // Initialize variables for title, description, color, footer, author, and showAuthor
        let title = null;
        let description = null;
        let color = null;
        let footer = null;
        let author = null;
        let showAuthor = true; // Default to true

        // Initialize imageUrl variable
        let imageUrl = null;

        // Check if there are attachments in the message
        if (msg.attachments.size > 0) {
            // Get the first attachment (assuming only one attachment is present)
            const attachment = msg.attachments.first();
            // Check if the attachment has a URL property (indicating it's an image)
            if (attachment && attachment.url) {
                imageUrl = attachment.url; // Get the URL of the image
            }
        }

        // Loop through command arguments to parse options
        for (let i = 0; i < args.length; i++) {
            if (args[i] === '-t' && i + 1 < args.length) {
                // Set title if '-t' option is found
                title = args[i + 1];
                i++; // Increment index to skip the next argument
            } else if (args[i] === '-d' && i + 1 < args.length) {
                // Set description if '-d' option is found
                description = args[i + 1];
                i++; // Increment index to skip the next argument
            } else if (args[i] === '-c' && i + 1 < args.length) {
                // Set color if '-c' option is found
                // Convert hexadecimal color code to integer
                color = parseInt(args[i + 1].replace('#', ''), 16);
                i++; // Increment index to skip the next argument
            } else if (args[i] === '-f' && i + 1 < args.length) {
                // Set footer if '-f' option is found
                footer = args[i + 1];
                i++; // Increment index to skip the next argument
            } else if (args[i] === '-a' && i + 1 < args.length) {
                // Set showAuthor based on the provided value
                showAuthor = args[i + 1].toLowerCase() === 'true';
                i++; // Increment index to skip the next argument
            } else if (args[i] === '-a') {
                // If only '-a' is provided without a value, default to true
                showAuthor = true;
            }
        }

        // Set the author as the creator of the message if showAuthor is true
        // no clue why it doesnt want to show the pfp it works fine in userinfo.js I give up for now i'll come back to it later
        if (showAuthor) {
            author = {
                name: msg.author.username,
                icon_url: msg.author.displayAvatarURL({ dynamic: true})
            };
        }

        // Create the embed
        const embedBuilder = new EmbedBuilder();

        const embed = embedBuilder
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setFooter({ text: footer })
            .setAuthor(author); // Set the author property

        // Set the image URL only if it's not null
        if (imageUrl) {
            embed.setImage(imageUrl);
        }

        // Send the embed
        msg.channel.send({ embeds: [embed] })
            .then(() => {
                // Delete the command message
                msg.delete();
            })
            .catch(console.error);
    }
};
