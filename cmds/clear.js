const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
    try {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
            msg.reply("You do not have permission ( MANAGE_MESSAGES )");
        } else {
            msg.channel.bulkDelete(args[0]).then(() => {
                msg.delete();
                msg.channel.send(`Permission ( MANAGE_MESSAGES ) recieved command granted ${args[0]} messages cleared.`).then(msg => msg.delete({ timeout: 2000 }));
            });
        }
    } catch(e) {
        console.log(e.stack);
    }
    console.log(`Ran command ${process.env.PREFIX}clear`);
};

module.exports.help = {
    name: "clear"
};
