const { RichEmbed, version }= require("discord.js")
const config = require("../../config.json")

module.exports.run = async (client,message,args) => {
  if(!args[0]) {
    message.reply("Cannot submit empty report!")
  }
  else{
var channel = client.channels.get("703456876481740900")
var suggestion = args.slice().join(" ");
var s = new RichEmbed()
.setTitle("Report")
.addField(`Submitted by ${message.author.tag}`, suggestion)
.setColor(config.color)
.setFooter(`${config.creator} v${version}`)
.setThumbnail(message.author.displayAvatarURL)
channel.send(s)
message.reply("Thank you for submitting your report we will read over it.")
  }
}

exports.conf = {
aliases: [],
cooldown: 5
}

exports.help = {
name: "report",
description: "",
usage: "report",
example: "lala!report"
}
