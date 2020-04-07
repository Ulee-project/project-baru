module.exports = client => {
  console.log('Connected.');
  console.log('Aku cinta ray,  tpi boong')
  console.log(`${client.user.username} Hello`)
  client.user.setActivity(`lala!help • Coah.. ${client.guilds.size} Teitoku~`, {type: "WATCHING"});
}