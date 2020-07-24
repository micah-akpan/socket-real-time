let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let connections = {}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (chunk) => {
    let data = { id: socket.id, ...chunk}
    io.emit('message', data);
  })
});

http.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:' + process.env.PORT);
});
