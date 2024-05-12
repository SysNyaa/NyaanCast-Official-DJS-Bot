// cmds/say.js

module.exports = {
    help: {
        name: 'say',
        description: 'Simon Says!',
        usage: '!say <message>',
        category: 'Utility'
    },
    run(client, msg, args) {
        // Join the args array into a single string
        const sayMsg = args.join(' ');

        // Send the say message
        msg.channel.send(sayMsg)
            .then(() => {
                // Delete the command message
                msg.delete();
            })
            .catch(error => {
                console.error('Error while sending say message:', error);
            });
    }
};
