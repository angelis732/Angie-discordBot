const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const { prefix, token } = require('./config.json');
require('dotenv').config();

client.login(token);


client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(client.user.presence.status)
});


client.on('message', message => {
  
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  console.log(command)
  
 if(message.content === "!clear"){
    message.channel.bulkDelete(100, true)
      .then(messages =>{
        message.channel.send(`You have deleted ${messages.size} messages`)
          .then(notice => notice.delete({timeout:2000}))
      })
      .catch(console.error);
  }else if(message.content === `${prefix}hola`){
   message.channel.send(`Hola ${message.author.username}`)
 }
  else if(message.content === `${prefix}pretty`) {
    const embed = new MessageEmbed()
      .setTitle('Esto es una prueba de mensaje empotrado')
      .setColor('DARK_PURPLE')
      .setDescription('sigo probando')
    message.channel.send(embed)
  }else if (command === 'ping') {
    message.channel.send('Pong.');
  }else if (command === 'info') {
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }
    
    message.channel.send(`Command name: ${command}\nArguments: ${args}`);
  }
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  console.log(
    "este es el estado viejo", oldState,
    "este es el nuevo estado", newState,
    "este es el  cliente",
    
  )
});




