const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
    try {
        if (msg.deletable) msg.delete();
        msg.channel.send(args.join(" "));
    } catch(e) {
        console.log(e.stack);
    }
    console.log(`Ran command ${process.env.PREFIX}say`);
}

module.exports.help = {
    name: "say"
} 
