let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let connections = {}

app.get('/', (req, res) => {
  res.json({ payload: 'A simple socket API' })
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (chunk) => {
    let data = { id: socket.id, ...chunk}
    io.emit('message', data);
  })
});

let port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log('listening on *:' + port);
});
