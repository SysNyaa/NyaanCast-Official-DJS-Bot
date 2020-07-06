const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;
const client = new Discord.Client({disableMentions: "everyone"});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.error("Unable to load commands.");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands.`)

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded.`);
        client.commands.set(props.help.name, props);
    });
});

client.on("ready", async () =>{
    client.user.setStatus(process.env.STATUS);

    try {
        let link = await client.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch(e) {
        console.log(e.stack);
    }

    console.log(`"${client.user.username}" is ${client.user.presence.status}!`);

    client.user.setActivity("null");
});

client.on("message", async msg =>{
    console.log(msg.member.user.username + ": " + msg.content);
    
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;

    let msgArray = msg.content.split(" ");
    let command = msgArray[0];
    let args = msgArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = client.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(client, msg, args);
});

client.login(process.env.TOKEN);
