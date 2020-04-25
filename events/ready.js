module.exports = client => {
  console.log('Connected.');
  console.log('Aku cinta ray,  tpi boong')
  client.user.setActivity(`lala!help Partners ${client.guilds.size} Teitoku~`, {type: "WATCHING"});
}