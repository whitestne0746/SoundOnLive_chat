const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/page02.html')
})

io.on('connection', function(socket) {
  socket.on('chat message', function(data) {
    if (!data.name) {
      data = {
        name: '匿名のユーザ',
        message: data.message,
      }
    }
    io.emit('chat message', data)
  })
})

http.listen(3000, function() {
  console.log('listening on *:3000')
})
