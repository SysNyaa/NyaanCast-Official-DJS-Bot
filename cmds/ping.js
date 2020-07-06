const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
    try {
        msg.channel.send("pong!");
    } catch(e) {
        console.log(e.stack);
    }
    console.log(`Ran command ${process.env.PREFIX}ping`);
}

module.exports.help = {
    name: "ping"
} 
