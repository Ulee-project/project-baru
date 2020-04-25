const { RichEmbed, version } = require("discord.js");
const config = require("../../config.json")

exports.run = async (client, message, args, color) => {
  let start = Date.now();
    message.delete();
    let diff = (Date.now() - start).toLocaleString();
    let API = (client.ping).toFixed(2)
    let embed = new RichEmbed()
    .setTitle(`🏓 Pong!`)
    .setColor(config.color)
    .addField("Latency", `${diff}ms`, true)
    .addField("API", `${API}ms`, true)
    .setFooter(`${config.creator} v${version}`)
    message.channel.send(embed);
};

exports.conf = {
aliases: ["pong"],
cooldown: 5
}

exports.help = {
name: "ping",
description: "Show status commands",
usage: "ping",
example: "lala!ping"
}