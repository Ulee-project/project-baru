const { RichEmbed, version } = require("discord.js")
const ytdl = require("ytdl-core")
const config = require("../../config.json")

module.exports.run = async (client, msg, args) => {
	const serverQueue = client.queue.get(msg.guild.id);
  if(!serverQueue) return msg.channel.send({ embed: { color: 0x4db2b6, description:'There is nothing playing'}});
  const duration = (serverQueue.songs[0].duration.minutes*60000) + ((serverQueue.songs[0].duration.seconds%60000)*1000);
  const persentase = serverQueue.connection.dispatcher.time/duration;
  const curentDurationMinute = Math.floor(serverQueue.connection.dispatcher.time/60000) < 10 ? `0${Math.floor(serverQueue.connection.dispatcher.time/60000)}` : Math.floor(serverQueue.connection.dispatcher.time/60000);
  const currentDurationSeconds = Math.floor((serverQueue.connection.dispatcher.time%60000)/1000) < 10 ? `0${Math.floor((serverQueue.connection.dispatcher.time%60000)/1000)}` : Math.floor((serverQueue.connection.dispatcher.time%60000)/1000);
  const endDurationMinute = serverQueue.songs[0].duration.minutes < 10 ? `0${serverQueue.songs[0].duration.minutes}` : serverQueue.songs[0].duration.minutes;
  const endDurationSeconds = serverQueue.songs[0].duration.seconds < 10 ? `0${serverQueue.songs[0].duration.seconds}` : serverQueue.songs[0].duration.seconds;
  
  const emb = new RichEmbed()
  .setColor(config.color)
  .setAuthor(serverQueue.songs[0].author.tag, serverQueue.songs[0].author.avatarURL)
  .setTitle(serverQueue.songs[0].title)
  .setURL(serverQueue.songs[0].url)
  .setThumbnail(serverQueue.songs[0].thumbnail)
  .setDescription(`${progressBar(persentase)} \n\`[${curentDurationMinute}:${currentDurationSeconds} - ${endDurationMinute}:${endDurationSeconds}]\``)
  .setFooter(`${config.creator} v${version}`);
  
  return msg.channel.send('🎶 **Now playing...**', { embed: emb});
};

function progressBar(percent){
	let num = Math.floor(percent*15);
	if(num === 1){
		return '🔵▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬';
	}else if(num === 2){
		return '▬🔵▬▬▬▬▬▬▬▬▬▬▬▬▬▬';
	}else if(num === 3){
		return '▬▬🔵▬▬▬▬▬▬▬▬▬▬▬▬▬';
	}else if(num === 4){
		return '▬▬▬🔵▬▬▬▬▬▬▬▬▬▬▬▬';
	}else if(num === 5){
		return '▬▬▬▬🔵▬▬▬▬▬▬▬▬▬▬';
	}else if(num === 6){
		return '▬▬▬▬▬🔵▬▬▬▬▬▬▬▬▬';
	}else if(num === 7){
		return '▬▬▬▬▬▬🔵▬▬▬▬▬▬▬▬';
	}else if(num === 8){
		return '▬▬▬▬▬▬▬🔵▬▬▬▬▬▬▬';
	}else if(num === 9){
		return '▬▬▬▬▬▬▬▬🔵▬▬▬▬▬▬';
	}else if(num === 10){
    return '▬▬▬▬▬▬▬▬▬🔵▬▬▬▬▬';
	}else if(num === 11){
		return '▬▬▬▬▬▬▬▬▬▬🔵▬▬▬▬';
	}else if(num === 12){
		return '▬▬▬▬▬▬▬▬▬▬▬🔵▬▬▬';
	}else if(num === 13){
		return '▬▬▬▬▬▬▬▬▬▬▬▬🔵▬▬';
  }else if(num === 14){
		return '▬▬▬▬▬▬▬▬▬▬▬▬▬🔵▬';
  }else if(num === 15){
		return '▬▬▬▬▬▬▬▬▬▬▬▬▬▬🔵';
  }else{
		return '▬▬STARTING MUSIC▬▬';
  } 
}

async function handleVideo (video, msg, voiceChannel, hide = false){
	const queue = msg.client.queue.get(msg.guild.id);
	const song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`,
		author: msg.author,
		loop: video.loop,
    durationh: video.duration.hours,
		durationm: video.duration.minutes,
		durations: video.duration.seconds,
    duration: video.duration,   
    mamang: msg.member.voiceChannel.name, 
    meminta: msg.author,
    loop: video.loop,
    channel: video.channel.title,
    author: msg.author
  };
  
  if(!queue){
		try{
			const thisMess = await msg.channel.send('🏴 Joining voice channel....');
			const connection = await voiceChannel.join();
			const Queue = {
				channel: msg.channel,
				voiceChannel,
				connection,
				songs: [song],
				volume: 100,
				playing: true,
				loop: false
			}
      
      thisMess.delete();
			msg.client.queue.set(msg.guild.id, Queue);
			return play(msg, song);
		}catch(e){
			msg.client.queue.delete(msg.guild.id);
			return msg.channel.send(e.stack, { code: 'diff' } );
		}
	}
	queue.songs.push(song);
	if(!hide) return msg.channel.send(`✅ Added To queue ${song.title}`);
}

function play(msg, song){
	const queue = msg.client.queue.get(msg.guild.id);
	if(!song){
		queue.voiceChannel.leave();
		return msg.client.queue.delete(msg.guild.id);
	}
	const vid = ytdl(song.url, {filter: 'audioonly' });
	const dispatcher = queue.connection.playStream(vid)
	.on('end', res => {
		const shifed = queue.songs.shift();
		if(queue.loop) queue.songs.push(shifed);
		play(msg, queue.songs[0]);
	})
	.on('error', console.error);
	dispatcher.setVolumeLogarithmic(queue.volume /100);
	queue.channel.send(`🎶 Now playing ${song.title}`);
}

exports.conf = {
aliases: ["np"],
cooldown: 5
}

exports.help = {
name: "nowplay",
description: "Displays now play.",
usage: "nowplay",
example: "lala!np"
}