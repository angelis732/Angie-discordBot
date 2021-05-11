const { prefix } = require('../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'jugamos',
  description: 'Eligiendo un juego!',
  execute(message) {
    let command = prefix + this.name;
    const args = message.content.slice(command.length).trim().split(/,+/);
    const games = [];
    args.forEach(juego => juego.length >= 1 && games.push(juego.trim())) //para evitar errores con espacios sobrantes
    
    if(games.length){
      const index = Math.floor(Math.random() * games.length)
      const game = games[index];
      message.channel.send(`${message.author.username}, hoy es un excelente dia para jugar ${game}`)
    }else {
      const embed = new MessageEmbed()
        .setTitle('Error')
        .setColor('RED')
        .setDescription(`${message.author.username}, seguido del comando debes indicar opciones de juegos separados por una coma`)
      message.channel.send(embed)
    }
    
  },
};
