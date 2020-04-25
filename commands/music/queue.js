const { RichEmbed, version } = require("discord.js")
const config = require("../../config.json")

module.exports.run = async (client, msg, args) => {
	const serverQueue = client.queue.get(msg.guild.id);
      if (!serverQueue) return msg.channel.send({ embed: { color: 0x4db2b6, description: 'There is nothing playing.'}});
  if (serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0x4db2b6, description: `You must be in **${serverQueue.voiceChannel.name}** to loop the queue`}});
    let index = 0;
var queueembed = new RichEmbed() 

.setColor(config.color) 
.setTitle('Song queue') 
.setDescription(`${serverQueue.songs.map(song => `**${++index}.** ${song.title}`).join('\n')}`) 
.setFooter(`${config.creator} v${version}`)

return msg.channel.send(queueembed)
  }
  
exports.conf = {
aliases: ["q"],
cooldown: 5
}

exports.help = {
name: "queue",
description: "Show list queue",
usage: "queue",
example: "lala!queue"
}