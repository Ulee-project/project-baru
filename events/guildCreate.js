module.exports = (client, guild) => {
  console.log(`Join: ${guild.name}`)
  client.channels.get('696911061399502950').send({embed: {color: 0x4db2b6, description: `Invited to: **${guild.name}**\nServer Member: **${guild.memberCount}**\nServer Owner: **${guild.owner.user.username}**`}})
}