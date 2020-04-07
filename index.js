const Discord = require("discord.js");
const db = require("quick.db");
const config = require("./config.json")
const { Client, Util, RichEmbed, MessageEmbed, Collection } = require('discord.js');
const client = new Discord.Client();
const queue = new Collection();
const invites = {};
client.queue = queue;
const bdbot = require("./handler/ClientBuilder.js");

client.config = require('./config.json')

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
    const logChannel = client.channels.get("696898452327628910")
    //logChannel.send(`> **${member}** joined using invite code **${invite.code}** from **${inviter.username}**. Invite was used **${invite.uses}** times since its creation.`);
    logChannel.send({ embed: { color: 0x4db2b6,  description: `${member} joined the server with invite **${inviter.username}**. Invite was used \`\`${invite.uses}\`\`!`}});
    member.send(`${member} Thanks you, for joined the server!`);
  });
});

client.on('guildMemberRemove', member => {
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    const logChannel = client.channels.get("696898452327628910")
    //logChannel.send(`> **${member}** joined using invite code **${invite.code}** from **${inviter.username}**. Invite was used **${invite.uses}** times since its creation.`);
    logChannel.send({ embed: { color: 0x8bb6ff,  description: `${member} lefted the server with invite **${inviter.username}**!`}});
    member.send(`${member} Thanks you, for the all time with **Lala**!`);
  });
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
    await message.channel.send(`<a:checkmark:670616392269037589> ${message.author} welcome back! <a:checkmark:670616392269037589>`)
  } 
  if (message.content.toLowerCase() === `${config.prefix}welcotest`) {
    client.emit("guildMemberAdd", message.member)
    return message.channel.send("UwU")
  }
});

require('./server.js');
require("./handler/module.js")(client);
require("./handler/Event.js")(client);

client.on("warn", console.warn);
client.on("error", console.error);
client.on("disconnect", () => console.log("Disconnected."));
client.on("reconnecting", () => console.log("Reconnecting."));
client.login(process.env.SECRET).catch(console.error);