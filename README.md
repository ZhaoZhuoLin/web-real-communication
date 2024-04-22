# 使用Node解决Web实时通信

## 场景梳理
在日常开发中，整理出来关于：接入上下游数据通信的流程

- 接收上游通过UDP下传的实时数据，并通过socket服务端与web端实时通信
- socket下发分为：admin,user两个级别
  
## 实现

### 创建任务
```
// 创建一个express应用
var app = express();

// 创建一个 HTTP 服务器，Express 应用将使用该服务器
const server = http.createServer(app);

// 创建WebSocket服务器实例
const wss = new WebSocket.Server({
  server
});

// 开启任务
let task1 = new PlaneTask(server);
task1.start();
```

### 任务详情
```

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
```

## 启动方式server
```
cd server
pnpm install
pnpm start
```
# 启动方式client
```
pnpm install 
pnpm dev
```