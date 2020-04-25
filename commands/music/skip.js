const Discord = require('discord.js');
exports.run = async (client, msg, args) => {
    const serverQueue = client.queue.get(msg.guild.id);
    if (!msg.member.roles.find("name", "DJ")) return msg.channel.send({ embed: { color: 0x4db2b6, description: `You need **DJ** role for use this command.`}});
    if (!msg.member.voiceChannel) return msg.channel.send({ embed: { color: 0x4db2b6, description: 'You are not in a voice channel!'}});
		if (!serverQueue) return msg.channel.send({ embed: { color: 0x4db2b6, description: 'There is nothing playing that I could skip for you.'}});
		if (serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0x4db2b6, description: `You must be in **${serverQueue.voiceChannel.name}** to loop the queue`}});
		serverQueue.connection.dispatcher.end('Skip command has been used!');
    return msg.react('⏩');
}

exports.conf = {
aliases: [],
cooldown: 5
}

exports.help = {
name: "skip",
description: "skiped your music not like",
usage: "skip",
example: "lala!skip"
}