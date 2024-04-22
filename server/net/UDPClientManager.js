const dgram = require("dgram");
const EventEmitter = require('events').EventEmitter
/**
 * @author zzl <https://github.com/ZhaoZhuoLin>
 * @description 创建UDP客户端
 */
class UDPClientManager extends EventEmitter {
    constructor(config) {
        // 调用父类EventEmitterde的构造函数
        super();
        this.config = config;
        // 创建udp客户端
        this.client = dgram.createSocket("udp4")
        // 循环发送消息的定时秒数
        this.interval = 3000
        this.setupServerEvent();
        this.start();
    }
    setupServerEvent() {
        this.client.on("message", (msg, rinfo) => {
            this.emit("message", msg, rinfo);
        })
        this.client.on("listening", () => {
            this.emit("listening");
        })
        this.client.on("error", (err) => {
            this.emit("err");
            this.client.close();
        })
    }
    start() {
        this.client.bind(this.config.port);
    }
    /**
     * 给UDP服务端发送消息
     * @param {ant} message 
     * @param {number} serverPort 
     * @param {string} serverAddress 
     * @param {function} callback 
     */
    sendMsg(message, serverPort, serverAddress, callback) {
        this.client.send(message, serverPort, serverAddress, function (err, bytes) {
            callback(err, bytes)
        });
    }
}
module.exports = UDPClientManager