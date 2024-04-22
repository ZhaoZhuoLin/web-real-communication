const UDPClientManager = require("../net/UDPClientManager.js")
var WebSocketManager = require("../net/WebSocketManager.js")
/**
 * 接收模块&下发模块任务管理
 */
class PlaneTask {
    constructor(server) {
        this.server = server;
        this.name = "PlaneTask"
        // UDP客户端
        this.udpClient = null;
        // Socket服务端
        this.webSocketServer = null;
    }
    start() {

        // 启动WebsocketServer使用express app为websocket服务器
        this.webSocketServer = new WebSocketManager(this.server);
        this.webSocketServer.start();

        // 启动UDP客户端
        const udpClient = new UDPClientManager({
            port: 8888,
        })
        udpClient.on("message", (msg, rinfo) => {
            // 下发所有信息
            console.log(`UDP Client接收消息:${msg}`, rinfo)
            this.webSocketServer.wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(msg);
                }
            });
        })
        udpClient.on("listening", () => {
            console.log(`UDP Client:启动成功`)
        })
    }
    end() {
        if (this.udpClient) {
            this.udpClient.close(() => {
                console.log(`UDP Client:close`)
            })
        }
    }
}
module.exports = PlaneTask;