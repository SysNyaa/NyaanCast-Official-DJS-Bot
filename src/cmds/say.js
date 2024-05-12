// cmds/clear.js

module.exports = {
    help: {
        name: 'clear',
        description: 'Clear messages from the channel.',
        usage: '<number of messages>',
        category: 'Moderation'
    },
    async run(c, msg, args) {
        // Check if the user has permissions to manage messages
        if (!msg.member.permissions.has('MANAGE_MESSAGES')) {
            return msg.reply("You don't have permission to use this command!");
        }

        // Check if a number of messages to delete is provided
        if (!args.length || isNaN(args[0])) {
            return msg.reply('Please provide the number of messages to clear!');
        }

        // Parse the number of messages to delete
        let amount = parseInt(args[0]);

        // Check if the amount is valid
        if (amount <= 0 || amount > 100) {
            return msg.reply('You can only delete between 1 and 100 messages at a time!');
        }

        // Increment the amount by 1 to account for the bot's own message
        amount++;

        // Delete the specified number of messages
        msg.channel.bulkDelete(amount, true)
            .then(delMsgs => {
                message.channel.send(`Successfully deleted ${delMsgs.size - 1} messages.`)
                    .catch(console.error);
            })
            .catch(error => {
                console.error('Error deleting messages:', error);
                msg.reply('There was an error deleting messages!');
            });
    }
};
