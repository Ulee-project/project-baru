module.exports.run = async (client, msg, args) => {
	const serverQueue = client.queue.get(msg.guild.id);
  if (!msg.member.roles.find("name", "DJ")) return msg.channel.send({ embed: { color: 0x4db2b6, description: `You need **DJ** role for use this command.`}});
  if(!serverQueue) return msg.channel.send({ embed: { color: 0x4db2b6, description: `Im not playing anything right now`}});
		if(!msg.channel.send) return msg.channel.send({ embed: { color: 0x4db2b6, description: `You must join voice channel to loop/unloop queue`}});
  if (serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0x8bb6ff, description: `You must be in **${serverQueue.voiceChannel.name}** to loop the queue`}});
		serverQueue.loop = !serverQueue.loop;
		return msg.channel.send({ embed: { color: 0x4db2b6, description: `${serverQueue.loop ? 'Loop' : 'Unloop' } current queue`}});
    
  }

exports.conf = {
aliases: [],
cooldown: 5
}

exports.help = {
name: "loop",
description: "Looped your song if you like the song",
usage: "loop",
example: "lala!loop"
}