const { RichEmbed, version } = require("discord.js")
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")
const moment = require('moment')

exports.run = (client, message, args) => {
      message.channel.startTyping();
    
let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }

  const duration = require('moment').duration(process.uptime(), 'seconds').format('dd:hh:mm:ss')

  const countCores = os.cpus().length
  const cpuModel = os.cpus()[0].model
  const guild = client.guilds.size.toLocaleString()
  const chan = client.channels.size.toLocaleString()
  const user = client.users.size.toLocaleString()
  const usage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0)
  const Node = process.version
  const CPU = percent.toFixed(2)
  const created = moment.utc(client.user.createdAt).format('MMMM Do YYYY')
  const totalMem = Math.round(require('os').totalmem / 1024 / 1024)
      
      const embed = new RichEmbed()
      .setColor(0xffc760)
      .setTitle('Lala-Chan Discord Bot')
      .setThumbnail(client.user.avatarURL)
      .addField('General Information', `• Uptime: **\`${duration}\`**\n• Users: **\`${user}\`** \n• Guilds: **\`${guild}\`** \n• Channels: **\`${chan}\`**`)
      .addField('Bot Information', `• OS: **\`Linux x64\`** \n• CPU: **\`${countCores} Cores | ${cpuModel}\`** \n• Memory: **\`${usage} MB / ${totalMem} MB (${CPU}%)\`**`)
      .addField('Additional Information', `• Date Created: **\`${created}\`** \n• Discord.js: **\`${version}\`** \n• Node.js **\`${Node}\`**`)
      message.channel.send(embed)
      
      message.channel.stopTyping(true);
    })
}

exports.conf = {
aliases: [],
cooldown: 5
}

exports.help = {
name: "stats",
description: "",
usage: "stats",
example: "lala!stats"
}