const Discord = require('discord.js')

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars  
  if (!message.member.hasPermission('ADMINISTRATOR') || !message.member.hasPermission('MANAGE_GUILD')) return message.channel.send({embed: { color: 0x7289DA, description: `${message.author.tag} doesn't have **Manage Server** permissions.`}})
  let guildData = require('quick.db').get(`prefix_${message.guild.id}`)
   
  if (message.flags[0] === "default") {
    require('quick.db').delete(`prefix_${message.guild.id}`)
    return message.channel.send({embed: { color: 0x7289DA, description: `Server Prefix changed to \`lala!\``}})
  }

  let prefix = args.join(" ")
  if (!prefix) return message.channel.send({embed: { color: 0x7289DA, description: `Insert the prefix.`}})
  
  require('quick.db').set(`prefix_${message.guild.id}`, prefix)
  return message.channel.send({embed: { color: 0x7289DA, description: `Server Prefix changed to \`${args.join(' ')}\``}})
}

exports.help = {
  name: "prefix",
  description: 'Change B-Development prefix on your server.',
  usage: 'prefix <prefix>',
  example: 'prefix !!! \nprefix -default'
}

exports.conf = {
 aliases: ['prefix', 'pref'],
 cooldown: 10
}