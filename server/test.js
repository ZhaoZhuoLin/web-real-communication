const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// 创建Express应用实例
const app = express();

// 创建HTTP服务器实例
const server = http.createServer(app);

// 创建WebSocket服务器实例
const wss = new WebSocket.Server({
    server
});

// 用于WebSocket通信的路由
// app.get('/ws', (req, res) => {
//     // 这里不需要处理，WebSocket的握手将由 'upgrade' 事件处理
//     res.status(200).end();
// });

// 监听HTTP服务器的 'upgrade' 事件
// server.on('upgrade', (request, socket, head) => {
//     // 确保请求的路径是用于WebSocket通信的路径
//     if (request.url === '/ws') {
//         wss.handleUpgrade(request, socket, head, (ws) => {
//             // 建立WebSocket连接后触发 'connection' 事件
//             wss.emit('connection', ws, request);
//         });
//     } else {
//         // 如果不是WebSocket请求，则关闭socket连接
//         socket.destroy();
//     }
// });

// 启动Express服务器
const port = 8080;
server.listen(port, () => {
    console.log(`Express server is running on http://localhost:${port}`);
});

// 监听WebSocket服务器的 'connection' 事件
wss.on('connection', (ws, request) => {
    ws.on('message', (message) => {
        console.log('received: %s', message);
    });
    ws.send('Hello! You are connected to the server.');
});

// 监听WebSocket服务器的 'error' 事件
wss.on('error', (error) => {
    console.error('WebSocket server error:', error);
});