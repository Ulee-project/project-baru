module.exports.run = async (client, msg, args) => {
	const serverQueue = client.queue.get(msg.guild.id);
  if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
    if (serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0x8bb6ff, description: `You must be in **${serverQueue.voiceChannel.name}** to loop the queue`}});
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send({ embed: { color: 0x4db2b6, description: '▶ Resumed the music for you!'}});
		}
		return msg.channel.send({ embed: { color: 0x4db2b6, description: 'There is nothing playing.'}});
  return undefined;
  
}
exports.conf = {
aliases: [],
cooldown: 5
}

exports.help = {
name: "resume",
description: "Resumed music",
usage: "resume",
example: "lala!resume"
}