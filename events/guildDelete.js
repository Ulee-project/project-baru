module.exports = (client, guild) => {
  console.log(`Left: ${guild.name}`)
  client.channels.get('696911061399502950').send({embed: {color: 0x4db2b6, description: `Left: **${guild.name}**`}})
}