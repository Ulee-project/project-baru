module.exports.run = async (client, msg, args) => {
	const serverQueue = client.queue.get(msg.guild.id);
  if (!msg.member.roles.find("name", "DJ")) return msg.channel.send({ color: 0x4db2b6, embed: { description: `You need **DJ** role for use this command.`}});
  if (!msg.member.voiceChannel) return msg.channel.send({ embed: { color: 0x4db2b6, description: `You must join voice channel first!`}});
  if (!serverQueue) return msg.reply("Are you sure? queue is empty !");
  try {
    if (!args.length) return msg.channel.send({ embed: { color: 0x4db2b6, description: `🔈 Current volume is ${serverQueue.volume}%!`}});
    args[0].replace("/\%/g", "");
    if (serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0x8bb6ff, description: `You must be in **${serverQueue.voiceChannel.name}** to loop the queue`}});
    if (isNaN(args[0])) return msg.channel.send("**Please input valid number >:(**");
    if (args[0] > 100) return msg.channel.send("**Volume only can be set in range 1 - 100**");
    if (args[0] > 100) return !serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100) +
    msg.channel.send({ embed: { color: 0x4db2b6, description: `${msg.author} Volume limit is 100%, please do not hurt yourself!`}});
    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolume(args[0] / 100);
    return msg.channel.send({ embed: { color: 0x8bb6ff, description: `✅ Set volume to **${args[0]}**!`}});
  } catch (e) {
    return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
  }
};

exports.conf = {
aliases: [],
cooldown: 5
}

exports.help = {
name: "volume",
description: "Set to volumr music",
usage: "volume",
example: "lala!volume 1-100"
}