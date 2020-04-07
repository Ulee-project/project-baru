const { RichEmbed, version } = require("discord.js");
const config = require("../../config.json")

exports.run = (client, message, args) => {
var embed = new RichEmbed()
    .setTitle(`${client.user.username}'s`)
    .setDescription("Thank you for choosing Lalachan! We are still in production so please report any bugs. [Click Here](https://discordapp.com/oauth2/authorize?client_id=696027503499673600&scope=bot&permissions=2146958591) to add to your server.")
    .setColor(config.color)
    .setFooter(`${config.creator} v${version}`)
    .setThumbnail(client.user.displayAvatarURL)
    message.channel.send({embed: embed});
}

exports.conf = {
aliases: [],
cooldown: 5
}

exports.help = {
name: "invite",
description: "Invite bot to your server",
usage: "invite",
example: "lala!invite"
}