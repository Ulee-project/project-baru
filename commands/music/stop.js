module.exports.run = async (client, msg, args) => {
	const serverQueue = client.queue.get(msg.guild.id);
  if (!msg.member.voiceChannel) return msg.channel.send({ embed: { color: 0x4db2b6, description: 'You are not in a voice channel!'}});
	if (!serverQueue) return msg.channel.send({ embed: { color: 0x4db2b6, description: 'There is nothing playing that I could stop for you.'}});
	if (serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0x4db2b6, description: `You must be in **${serverQueue.voiceChannel.name}** to loop the queue`}});
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end('Stop command has been used!');
	return msg.channel.send({ embed: { color: 0x4db2b6, description: 'Stopped music and leaving voice channel.'}});
}

exports.conf = {
aliases: [],
cooldown: 5
}

exports.help = {
name: "stop",
description: "Stoped music",
usage: "stop",
example: "lala!stop"
}