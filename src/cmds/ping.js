// cmds/ping.js

module.exports = {
    help: {
        name: 'ping',
        description: 'Check if the bot is responsive. There\'s a chance the bot may miss the serve!',
        usage: '',
        category: 'Fun'
    },
    run(c, msg, args) {
        // Define the chance for the bot to miss the serve (in percentage, e.g., 20 for 20% chance)
        const missChance = 25; // 20% chance
        
        // Generate a random number between 0 and 99
        const randomNum = Math.floor(Math.random() * 100);

        // Check if the random number is less than the miss chance
        if (randomNum < missChance) {
            // Bot missed the serve
            msg.reply('I missed! (╥ω╥)');
        } else {
            // Bot replied with "Pong!"
            msg.reply('Pong! (＾▽＾)');
        }
    }
};
