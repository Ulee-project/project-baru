const { RichEmbed, version } = require('discord.js');
const { GOOGLE_KEY } = process.env;
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const config = require("../../config.json")

exports.run = async (client, msg, args)=> {
	if(!args.length) return msg.channel.send({ embed: { color: 0x4db2b6,  description: `🌱 Usage lala!play **Tittle Song** and **Url Song** or **Playlist Song**!`}});
	try{
		if(!GOOGLE_KEY) throw TypeError('NO GOOGLE KEY IN ENV >:(');
		const youtube = new YouTube(GOOGLE_KEY);
		
		const vc = msg.member.voiceChannel;
		if(!vc) return msg.channel.send({ embed: { color: 0x4db2b6, description: `You are not on the voice channel..`}});
		if(!vc.permissionsFor(client.user).has(['CONNECT', 'SPEAK'])) return msg.channel.send({ embed: { color: 0x4db2b6,  description: `I do not have permission to **Connect** and **Speak**!`}});
		if(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/.test(args[0])){
			const playlist = await youtube.getPlaylist(args[0]);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const vid = await youtube.getVideoByID(video.id);
				await handleVideo(vid, msg, vc, true);
			}
      return msg.channel.send({ embed: { color: 0x4db2b6, description: `✅ Playlist: ${playlist.title} has been added to the queue!`}});
			//return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		}
		if(/https?:\/\//gi.test(args[0])){
			const video = await youtube.getVideo(args[0]);
			return handleVideo(video, msg, vc);
		}
		const videos = await youtube.searchVideos(args.join(' '), 1);
		if(!videos.length) return msg.channel.send({ embed: { color: 0x4db2b6, description: `Coahh.. Didn't find the song you requested...`}});
		const video = await youtube.getVideoByID(videos[0].id);
		return handleVideo(video, msg, vc);
	} catch (err) {
		return msg.channel.send({ embed: { title: 'There is an error', timestamp: new Date(), footer: { text: `lala!report or contact Bartholomeouw#2415`} ,color: 0x4db2b6, description: err.stack}});
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
    channel: video.channel.title
	}
	if(!queue){
		try{
			//const thisMess = await msg.channel.send({ embed: { color: 0x4db2b6, description: `🔍 Look for the song you requested..`}});
			const connection = await voiceChannel.join();
			const Queue = {
				channel: msg.channel,
				voiceChannel,
				connection,
				songs: [song],
				volume: 20,
				playing: true,
				loop: false,
			}
			//thisMess.delete();
			msg.client.queue.set(msg.guild.id, Queue);
			return play(msg, song);
		}catch(e){
			msg.client.queue.delete(msg.guild.id);
			return msg.channel.send({ embed: { title: 'There is an error', timestamp: new Date(), footer: { text: `lala!report or contact Bartholomeouw#2415`}, color: 0x4db2b6, description: e.stack}});
		}
	}
	queue.songs.push(song);
	if(!hide) return msg.channel.send({ embed: { title: 'Queued',	footer: { text: `v${version}`}, color: 0x4db2b6, description: `[${song.title}](${song.url}) [${song.author}]`}});
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
	dispatcher.setVolumeLogarithmic(queue.volume /20);
	queue.channel.send({ embed: { title: 'Now play', color: 0x4db2b6, footer: { text: `v${version}`},  description: `[${song.title}](${song.url}) [${song.author}]`}});
}

exports.conf = {
	aliases: ['p'],
	cooldown: 5
}

exports.help = {
	name: 'play',
	description: 'play song using youtube videos',
	usage: 'play <query | link | playlist>',
  example: 'lala!play its you'
}
