const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
    try {
        let embed = new Discord.MessageEmbed()
        .setAuthor(msg.author.username)
        .setDescription("This is the user's info!")
        .setColor("RANDOM")
        .addField("Full Username", `${msg.author.username}#${msg.author.discriminator}`)
        .addField("ID", msg.author.id)
        .addField("Created At", msg.author.createdAt);

    msg.channel.send(embed);

    return;
    } catch(e) {
        console.log(e.stack);
    }
    console.log(`Ran command ${process.env.PREFIX}userinfo`);
}

module.exports.help = {
    name: "userinfo"
} 
