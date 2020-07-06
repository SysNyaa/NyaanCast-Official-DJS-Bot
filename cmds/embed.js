const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
    try {
        msg.delete();

        args.slice(0).join(" ");

        let embed = new Discord.MessageEmbed()
            .setColor(args.join(" ").split("-c")[1].trim())
            .setTitle(args.join(" ").split("-t")[1].split("-d")[0].trim())
            .setDescription(args.join(" ").split("-d")[1].trim());

        msg.channel.send(embed);
    } catch(e) {
        console.log(e.stack);
    }
    console.log(`Ran command ${process.env.PREFIX}embed`);
}

module.exports.help = {
    name: "embed"
} 
