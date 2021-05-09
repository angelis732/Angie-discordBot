module.exports = {
  name: 'hola',
  description: 'Hola!',
  execute(message, args) {
    message.channel.send(`Hola ${message.author.username}`)
  },
};
