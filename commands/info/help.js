const { RichEmbed, version } = require("discord.js");
const config = require("../../config.json")

module.exports.run = async (client, message, args) => {
  /*let embeds= new RichEmbed()
  .setTitle(`Premium Commands`)
  .setDescription(`The premium command is **Search** if you want this premium command to register your server Id to bot ownership.`)
  .setColor(config.color)
  .setFooter(`${config.creator} v${version}`)
  message.member.send(embeds)*/
    const embed = new RichEmbed()
        .setTitle(`Commands List ${client.user.username}`)
        .setDescription(`**${client.user.username} comes from Indonesia, he is a high school student who is very smart and admired by everyone, of course, do not forget to invite and have fun.**\nTotal Commands: ${client.commands.size} | Prefix: **${config.prefix}**`)
        .setColor("#4db2b6")
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL)
        .setFooter(`${config.creator} v${version}`, message.author.displayAvatarURL)
        .addField("Moderation Commands", `**setprefix:** Replace the prefix with the prefix you want to avoid collisions with other bots.\n**resetprefix:** Change the Prefix to the bottom on the bot.\n**setchannel:** Setup welcome messsge in your server with id channels.`)
        .addField("General Commands", `**ping:** Displays status on bot.\n**stats:** Displays performance status on bot.\n**afk:** Makes you afk to tell others.\n**avatar:** To see other people's avatars.\n**report:** Use this command to report your problem.\n**invite:** Invite bot with use the commands.\n**help:** Displays this commands.`)
        .addField("Music Commands", `**play:** Play music using Song title or Song link and Playlist song.\n**search:** Search you like music but you must have DJ role in guilds.\n**loop:** By using this you can repeat the song that is currently playing.\n**stop:** You can stop a song with this command.\n**skip:** Skip songs you don't like with this command.\n**queue:** You can see the queue using this command.\n**volume:** You can adjust the volume with a limit of 1-100.\n**pause:** Pause the music you want with this command.\n**resume:** Resume the music you want with this command.\n**nowplay:** This command frees you what music is playing.`)
        .addField("Imfortant Information", `Be informed that in some Music category commands there are commands that are equipped with **DJ roles** so you have to create a **DJ role** first, you can give the **DJ role** to members who want to play music or just listen to music.`)
    return message.channel.send(embed);
}

exports.help = {
    name: "help",
    description: "This commands show list.",
    usage: `help`,
    example: "t?help"
}

exports.conf = {
  aliases: ["h"],
  cooldown: 3
}