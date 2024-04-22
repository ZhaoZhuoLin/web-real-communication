const WebSocket = require('ws');
/**
 * @author zzl <https://github.com/ZhaoZhuoLin>
 * @description 使用HTTP服务器创建WebSocket服务端
 */
class WebSocketManager {
    constructor(server) {
        this.server = server;
        this.wss = new WebSocket.Server({
            server
        });
    }
    start() {
        // // 监听HTTP服务器的 'upgrade' 事件
        // this.server.on('upgrade', (request, socket, head) => {
        //     // 确保请求的路径是用于WebSocket通信的路径
        //     if (request.url === '/ws') {
        //         this.wss.handleUpgrade(request, socket, head, (ws) => {
        //             // 建立WebSocket连接后触发 'connection' 事件
        //             this.wss.emit('connection', ws, request);
        //         });
        //     } else {
        //         socket.destroy();
        //     }
        // });
        this.wss.on('connection', (ws, request) => {
            ws.on('message', (message) => {
                // console.log('received: %s', message);.
                // 广播消息给所有客户端
                this.wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(message);
                    }
                });
            });
            // ws.send('Hello! You are connected to the server.');
        });
        this.wss.on("error", (err) => {
            console.log("WebSocketManager", err)
        })
        // this.wss.on("close", () => {
        //     console.log('WebSocketManager:close')
        // })
        // this.wss.on("listen", () => {
        //     console.log('WebSocketManager:创建成功')
        // })
        // this.wss.on("connection", () => {
        //     console.log('WebSocketManager:创建成功')
        // })
    }
}
module.exports = WebSocketManager;