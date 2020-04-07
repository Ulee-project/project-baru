const Discord = require("discord.js")
const config = require("quick.db"),
           db = require("quick.db");

exports.run = async (client, message, args) => {
  let prefix = config.prefix;
  if(!args[0] || args[0] == "help") return message.channel.send({ embed: { color: 0x4db2b6, description: `Usage: lala!afk **(reason)**`}});
    db.set(`afk_${message.guild.id}_${message.author.id}`, args.join(" ") ? args.join(" ") : " ")
    await message.reply(`✅ You are now AFK for the reason of: **${args.join(" ")}**`)
    if (message.member.manageable) {
      message.member.setNickname(`[AFK] ${message.member.displayName}`)
    }
  }

exports.conf = {
aliases: [],
cooldown: 5
}

exports.help = {
name: "afk",
description: "Afk statues",
usage: "afk",
example: "lala!afk"
}