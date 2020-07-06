const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
    try {
        msg.delete({ timeout: 1000 });
        client.user.setActivity(args.join(" "));
        msg.channel.send("Presence Updated").then(msg => msg.delete({ timeout: 2000 }));
    } catch(e) {
        console.log(e.stack);
    }
    console.log(`Ran command ${process.env.PREFIX}presence`);
};

module.exports.help = {
    name: "presence"
};
