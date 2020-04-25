const { Client, RichEmbed, version } = require("discord.js");
const config = require("../../config.json");
const fs = require('fs');

exports.run = async (client, message, args) => {
  let aTaged;
  if (message.mentions.users.first()) {
    aTaged = message.mentions.users.first();
  } else {
      aTaged = message.author;
  }
  
  let embed = new RichEmbed()
  .setColor(`${config.color}`)
  .setTitle(`${aTaged.username}'s Avatar`)
  .setImage(aTaged.displayAvatarURL)
  .setFooter(`${config.creator} v${version}`);
  
  let msg = await message.channel.send(embed)
        .then(function (msg) {
            msg.react("🌿");
            message.delete({timeout: 1000});
            }).catch(function(error) {
            console.log(error);
        });
}

exports.conf = {
aliases: [],
cooldown: 5
}

exports.help = {
name: "avatar",
description: "check avatar",
usage: "avatar",
example: "lala! avatar mention user"
}