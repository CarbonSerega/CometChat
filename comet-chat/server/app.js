const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./RoomController')()

const msgHelper = (name, text, id, date = null) => ({ name, text, id, date })

io.on('connection', socket => {
  socket.on('userConnected', (data, callback) => {
    if(!data.name || !data.room) {
      return callback('Invalid data!')
    }
    socket.join(data.room)

    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room,
      img: data.img
    })
    callback({ userId: socket.id })

    io.to(data.room).emit('updateUsers', users.getAll(data.room))
    socket.emit('newMsg', msgHelper('admin', `The user ${data.name} joined to the room!`))
    socket.broadcast.to(data.room)
      .emit('newMsg', msgHelper('admin', `User ${data.name} joined!`))
  })

  socket.on('createMsg', (data, callback) => {
    if(!data.text) {
      return callback('No Empty messages!')
    }

    const user = users.get(data.id)

    if(user) {
      io.to(user.room).emit('newMsg', msgHelper(user.name, data.text, data.id, data.date))
    }
    callback()

  })

  socket.on('userLeft', (id, callback) => {
    const user = users.remove(id)
    if(user) {
      io.to(user.room).emit('updateUsers', users.getAll(user.room))
      io.to(user.room).emit('newMsg', msgHelper('admin', `User ${user.name} left the room :(`))
    }
    callback()
  })

  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if(user) {
      io.to(user.room).emit('updateUsers', users.getAll(user.room))
      io.to(user.room).emit('newMsg', msgHelper('admin', `User ${user.name} left the room :(`))
    }
  })
})

module.exports = {
  app,
  server
}
