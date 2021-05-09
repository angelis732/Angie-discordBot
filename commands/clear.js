module.exports = {
  name: 'clear',
  description: 'clear!',
  execute(message, args) {
    const amount = parseInt(args[0]) + 1; //
  console.log('este es el argumento', args)
  console.log("esta es la cantidad", amount)
    if (isNaN(amount) || amount <= 1 || amount >= 100 ) {
      return message.reply('Debe colocar un numero entre 1 y 99');
    }
  
    message.channel.bulkDelete(amount, true)
      .then(messages => {
        message.channel.send(`Has eliminado ${messages.size - 1} mensajes`)
          .then(notice => notice.delete({timeout:2000}))})
      .catch(error => console.error(error))
  },
};
