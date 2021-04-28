const { Client, MessageEmbed, MessageAttachment  } = require('discord.js');
const client = new Client();
require('dotenv').config()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setStatus('invisible')

  console.log(client.user.presence.status)
  const testChannel = client.channels.cache.find(channel => channel.name === 'bot')

});



client.on('message', msg => {
  //Receiving the message
  console.log(msg.content)
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
  if (msg.content === 'Hola') {
    msg.channel.send(`Hola, ${msg.author.username}`)
  }
  
  if(msg.content === '!Angelita'){
    msg.channel.send('https://www.linkedin.com/in/angelismar-magallanes/')
  }
  
  if(msg.content === '!pretty') {
    const embed = new MessageEmbed()
      .setTitle('Esto es una prueba de mensaje empotrado')
      .setColor('DARK_PURPLE')
      .setDescription('sigo probando')
    msg.channel.send(embed)
    console.log(embed)
  }

  
  //delete messages
  client.on('messages', async msg => {
    if(msg.content === '!clear'){
     const channelMsg =  await msg.channel.fetch();
     msg.channel.bulkDelete(channelMsg)
    }
  })
});

client.login(process.env.DISCORD_TOKEN);

