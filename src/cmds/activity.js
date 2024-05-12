// cmds/activity.js

const { ActivityType } = require('discord.js');

module.exports = {
    help: {
        name: 'activity',
        description: 'Set the bot\'s activity.',
        usage: '!activity -a <activity> -t <type>',
        category: 'Utility'
    },
    async run(c, msg, args) {
        try {
            // Initialize variables for activity options
            let activity = null;
            let type = null;

            // Loop through command arguments to parse options
            for (let i = 0; i < args.length; i++) {
                if (args[i] === '-a' && i + 1 < args.length) {
                    activity = args[i + 1];
                    i++; // Increment index to skip the next argument
                } else if (args[i] === '-t' && i + 1 < args.length) {
                    type = parseInt(args[i + 1]);
                    i++; // Increment index to skip the next argument
                }
            }

            // Check if activity type is valid
            if (type && (type < 0 || type > 5)) {
                return msg.channel.send('Invalid activity type.');
            }

            // Set the activity type
            let activityType = null;
            switch (type) {
                case 0:
                    activityType = ActivityType.Playing;
                    break;
                case 1:
                    activityType = ActivityType.Streaming;
                    break;
                case 2:
                    activityType = ActivityType.Listening;
                    break;
                case 3:
                    activityType = ActivityType.Watching;
                    break;
                case 4:
                    activityType = ActivityType.Custom;
                    break;
                case 5:
                    activityType = ActivityType.Competing;
                    break;
                default:
                    activityType = ActivityType.Playing;
            }

            // Set the activity
            c.user.setActivity(activity, {
                type: activityType
            });

            msg.channel.send('Bot activity set successfully!');
        } catch (error) {
            console.error('Error setting bot activity:', error);
            msg.channel.send('An error occurred while setting bot activity.');
        }
    }
};
