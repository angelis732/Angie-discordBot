module.exports = {
  name: 'clear',
  description: 'clear!',
  execute(message, args) {
    const amount = parseInt(args[0]) + 1; //

    if (isNaN(amount) || amount <= 1 || amount >= 100 ) {
      return message.reply('Debes indicar la cantidad de mensajes a borrar. debe ser un numero entre 1 y 99');
    }
  
    message.channel.bulkDelete(amount, true)
      .then(messages => {
        message.channel.send(`Has eliminado ${messages.size - 1} mensajes`)
          .then(notice => notice.delete({timeout:2000}))})
      .catch(error => console.error(error))
  },
};
