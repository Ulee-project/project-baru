const Discord = require("discord.js");
const search = require("yt-search");
const fs = require("fs")

module.exports.run =  async (client, message, args, ops) => {
  if (!message.member.roles.find("name", "DJ")) return message.channel.send({ color: 0x4db2b6, embed: { description: `You need **DJ** role for use this command.`}});
  search(args.join(' '), function(err, res) {
          if (err) return message.channel.send({ embed: { color: 0x4db2b6, description: `Usage: lala!search **Song**`}});

          let videos = res.videos.slice(0, 10);

     let resp = '';
     for (var i in videos) {
       
        resp += `> **[${parseInt(i)+1}]** \`${videos[i].title}\`\n`;
     }

      resp += `\n> **Choose a number between \`1-${videos.length}\`**`;
     message.channel.send(resp);
     const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0;
      const collector = message.channel.createMessageCollector(filter);
  
           collector.videos = videos;
  
     collector.once('collect', function(m) {
       
       
          let commandFile = require(`./play.js`);
       
         commandFile.run(client, message, [this.videos[parseInt(m.content)-1].url], ops);
       
          });
       
 });
    }

exports.conf = {
aliases: [],
cooldown: 5
}

exports.help = {
name: "search",
description: "",
usage: "",
example: ""
}