const Discord = require("discord.js");
const db = require("quick.db");
const config = require("./config.json")
const { Client, Util, RichEmbed, MessageEmbed, Collection } = require('discord.js');
const client = new Discord.Client();
const queue = new Collection();
const invites = {};
client.queue = queue;
const bdbot = require("./handler/ClientBuilder.js");
var jimp = require("jimp")

client.config = require('./config.json')
//client.util = require("./util.js");

client.on('ready', () => {
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', member => {
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
     let wChan = db.fetch(`${member.guild.id}`)

	if(wChan == null) return;
	
	if(!wChan) return;
    //logChannel.send(`> **${member}** joined using invite code **${invite.code}** from **${inviter.username}**. Invite was used **${invite.uses}** times since its creation.`);
    member.guild.channels.get(wChan).send(`Teitoku ${member} joined the server with invite **${inviter.username}**. Invite was used \`\`${invite.uses}\`\`!`);
    member.send(`${member} Thanks you, for joined the server!`);
  });
});

client.on('guildMemberRemove', member => {
    let wChan = db.fetch(`${member.guild.id}`)
	
	if(wChan == null) return;
	
	if(!wChan) return;
    //logChannel.send(`> **${member}** joined using invite code **${invite.code}** from **${inviter.username}**. Invite was used **${invite.uses}** times since its creation.`);
    member.guild.channels.get(wChan).send(`Teitoku ${member}, left the server! Goodbye ${member.author.username}!`);
  });


client.on("message", async message => {
  // MASALAHNYA KARENA LU KAGAK TAMBAHIN if (message.author.bot) return;
  if (message.author.bot) return;
  if (message.mentions.members.first()) {
    let afkUser = message.mentions.members.first();
    let afkDat = await db.fetch(`afk_${message.guild.id}_${afkUser.id}`);
    if (afkDat) return message.channel.send(`${afkUser.user.tag} AFK with reason ${afkDat !== " " ? `Reason \`\`${afkDat}\`\`` : ""}`)
  }//Ada yang salah gak// keknya kagak ada// tpi kok gituu pening bet kepala w
  let cekAfk = await db.fetch(`afk_${message.guild.id}_${message.author.id}`);
  if (cekAfk !== null && message.content.toLowerCase() === `${config.prefix}afk`) {
    db.delete(`afk_${message.guild.id}_${message.author.id}`);
    if (message.member.manageable) {
      message.member.setNickname(message.member.displayName.split("[AFK]")[1])
    }
    return message.reply(`Welcome Back`)
  } else if (cekAfk !== null && message.content.toLowerCase() !== `${config.prefix}afk`) {
    db.delete(`afk_${message.guild.id}_${message.author.id}`);
    if (message.member.manageable) {
      message.member.setNickname(message.member.displayName.split("[AFK]")[1])
    }
    await message.channel.send(`${message.author} welcome back!`)
  } 
  if (message.content.toLowerCase() === `${config.prefix}welcotest`) {
    client.emit("guildMemberAdd", message.member)
    return message.channel.send("UwU")
  }
});

client.on("guildCreate", guild => {
  
      let channelID;
    let channels = guild.channels;
    channelLoop:
    for (let c of channels) {
        let channelType = c[1].type;
        if (channelType === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = client.channels.get(guild.systemChannelID || channelID);
  
    let newserverEmbed = new RichEmbed()
    .setTitle(`Zego Info`)
    .setDescription(`__Thanks for adding Lala to your server!__ :smiley:
Use \`lala!help\` to get a list of commands.
It's also recommended to join our [discord server](https://discord.gg/wwkHSQ) a to get notified about future updates`)
    .setColor("#4db2b6")
channel.send(newserverEmbed)
});

require("./handler/module.js")(client);
require("./handler/Event.js")(client);

client.on("warn", console.warn);
client.on("error", console.error);
client.on("disconnect", () => console.log("Disconnected."));
client.on("reconnecting", () => console.log("Reconnecting."))
client.login(process.env.SECRET).catch(console.error);