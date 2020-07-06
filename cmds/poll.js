const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
    try {
        if(!msg.member.hasPermission("MANAGE_MESSAGES")) return MessageChannel.channel.send("You require this permission to use that command ( MANAGE_MESSAGES )");

        let embed = new Discord.MessageEmbed()
            .setColor(args.join(" ").split("-c")[1].trim())
            .setFooter("React to vote.")
            .setTitle(args.join(" ").split("-q")[1].trim())
            .setDescription(`Poll created by ${msg.author.username}`);

        let awaitmsg = await msg.channel.send(embed);

        await awaitmsg.react("✅");
        await awaitmsg.react("❎");

        msg.delete();
    } catch(e) {
        console.log(e.stack);
        msg.channel.send(`Proper usage ( ${process.env.PREFIX}poll -c Colour Hex -q Question)`);
    }
    console.log(`Ran command ${process.env.PREFIX}poll`);
}

module.exports.help = {
    name: "poll"
}
