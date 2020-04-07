const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (bot, message, args) => {
  const removed = bot.emojis.find(x => x.name === "removed_1292")
  const banned = bot.emojis.find(x => x.name === "ban_204863")
  const cute = bot.emojis.find(x => x.name === "bughunter_1292")
  
  let prefix = 'lala!';

  if (!message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('MANAGE_GUILD') && message.author.id !== '331265944363991042' && message.author.id !== '327586923252285440' && message.author.id !== '531792925982720000' && message.author.id !== '327586923252285440') return message.reply(`${removed} You don't have a **Manage Server** permissions.`)

  db.set(`prefix_${message.guild.id}`, prefix)
  message.channel.send({ embed: { color: 0x4db2b6, description: `${cute} Server Prefix has been resetted to **\`lala!\`**`}});
}

exports.conf = {
aliases: ["reset"],
cooldown: 5
}

exports.help = {
name: "reset",
description: "reset the prefix",
usage: "resetprefix",
example: "lala!resetprefix"
}