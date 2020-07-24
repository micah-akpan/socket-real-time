var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let connections = []

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  connections.push(socket.id)
  // console.log(connections);

  socket.on('message', (chunk) => {
    const data = { id: socket.id, message: chunk }
    io.emit('message', data);
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});