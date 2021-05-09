const fs = require("fs");
const { Client, Collection } = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Client();

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(client.user.presence.status)
});


client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  
  if (!client.commands.has(command)) return;
  
  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  if(newState.channel){
    let connection = await newState.channel.join()
    const dispatcher = connection.play('audio.opus');
    
    dispatcher.on('error', console.error);
  }else{
    oldState.channel.leave()
  }
  
})

// client.on('message', async message => {
//   // Join the same voice channel of the author of the message
//   if (message.member.voice.channel) {
//     var connection = await message.member.voice.channel.join();
//   }
//
//   const dispatcher = connection.play('audio.opus');
//
//   dispatcher.on('start', () => {
//     console.log('audio.mp3 is now playing!');
//   });
//
//   dispatcher.on('finish', () => {
//     console.log('audio.mp3 has finished playing!');
//   });
//
// // Always remember to handle errors appropriately!
//   dispatcher.on('error', console.error);
// });


client.login(token);

