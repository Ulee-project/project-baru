const Discord = require('discord.js'),
      cooldowns = new Discord.Collection(),
      db = require('quick.db'),
      config = require("../config.json")


module.exports = (client, message) => {
  if (message.channel.type === "dm" || message.author.bot || message.author === client.user) return;
  let pref = db.get(`prefix_${message.guild.id}`);
  
  let prefix;
  if (message.content.toLowerCase().startsWith(pref)) {
    prefix = pref;
  } else if (!pref && pref === null) {
    prefix = client.config.prefix
  }
  
  let profanities = ["palkon"]
  for (x = 0; x < profanities.length; x++) {
    if (message.content.includes(profanities[x])) {
      //msg.member.send({ embed: { color: 0xFF0000, description: `${msg.author} that word is not allowed on this server! <:pepefurry:660495306563125276>`}});
      message.reply("You cannot say that here!") 
      message.delete()
      return;
    }
  }
  
  if(message.isMentioned(client.user.id)) {
    return message.channel.send({ embed: { color: 0x4db2b6, description: `My prefix in server is : \`${config.prefix}\``}})
  }

  if (!message.content.startsWith(prefix)) return;
  
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd = args.shift().toLowerCase()
  let sender = message.author;
  
  let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!commandFile) return;
    if (!cooldowns.has(commandFile.help.name)) {
        cooldowns.set(commandFile.help.name, new Discord.Collection());
    }
  
    const member = message.member;
    const now = Date.now();
    const timestamps = cooldowns.get(commandFile.help.name);
    const cooldownAmount = (commandFile.conf.cooldown || 3) * 1000
    
    if (!timestamps.has(member.id)) {
      if (message.author.id !== client.config.owner) {
        timestamps.set(member.id, now);
      }
    } else {
        const expirationTime = timestamps.get(member.id) + cooldownAmount;

        if (now < expirationTime) {
          
          const timeLeft = (expirationTime - now) / 1000;
          return message.channel.send({embed: { color: 0xcc5353, description: `Calm down. You need to wait **${timeLeft.toFixed(1)}** seconds to use the command again.`}}).then(msg=>msg.delete({timeout: 5000}));
        }

        timestamps.set(member.id, now);
        setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    }

    try {
      
      let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
      if (!command) return;
      command.run(client, message, args);
      
    } catch (e) {
      console.log(e.message);
    } finally {
      console.log(`${sender.tag} (${sender.id}) - ${cmd}`);
    }
}