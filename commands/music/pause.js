module.exports.run = async (client, msg, args) => {
	const serverQueue = client.queue.get(msg.guild.id);
  if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
    if (serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0x8bb6ff, description: `You must be in **${serverQueue.voiceChannel.name}** to loop the queue`}});
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send({ embed: { color: 0x4db2b6, description: '⏸ Paused the music for you!'}});
		}
		return msg.channel.send({ embed: { color: 0x4db2b6, description: 'There is nothing playing.'}});
  }
  
exports.conf = {
aliases: [],
cooldown: 5
}

exports.help = {
name: "pause",
description: "Paused music",
usage: "pause",
example: "lala!pause"
}