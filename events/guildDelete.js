module.exports = (client, guild) => {
  console.log(`Left: ${guild.name}`)
  client.channels.get('703452961329643571').send({embed: {color: 0xd30750, description: `Left: **${guild.name}**`}})
}
