import WebSocket from 'ws';

const server = new WebSocket.Server({ port: 8000 });

// CORSヘッダーを追加する
server.on('headers', (headers) => {
  headers.push('Access-Control-Allow-Origin: *');
});

server.on('connection', (socket) => {
  console.log('New client connected');

  // メッセージを受信した場合
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // 接続しているすべてのクライアントにメッセージを送信する
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
