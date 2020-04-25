module.exports = (client, guild) => {
  console.log(`Join: ${guild.name}`)
  client.channels.get('703452961329643571').send({embed: {color: 0x4db2b6, description: `Invited to: **${guild.name}**\nServer Member: **${guild.memberCount}**\nServer Owner: **${guild.owner.user.username}**`}})
}
