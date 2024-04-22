const dgram = require("dgram");
const EventEmitter = require('events').EventEmitter

/**
 * @author zzl <https://github.com/ZhaoZhuoLin>
 * @description 创建UDP服务端
 */
class UDPServerManager extends EventEmitter {
    constructor(config) {
        // 调用父类EventEmitterde的构造函数
        super();
        this.config = config;
        // 创建udp服务器
        this.server = dgram.createSocket("udp4")
        // 循环发送消息的定时秒数
        this.interval = 3000
        this.setupServerEvent();
        this.start();
    }
    /**
     * 事件处理机制
     */
    setupServerEvent() {
        this.server.on("close", () => {
            this.emit("close");
        })
        this.server.on("error", (error) => {
            this.emit("error", error);
        })
        this.server.on("listening", () => {
            this.emit("listening");
        })
        // 接收客户端发来的消息
        this.server.on("message", (msg, remoteInfo) => {
            this.emit("message", msg, remoteInfo);
        })
    }

    start() {
        this.server.bind(this.config.port, this.config.address);
    }
    /**
     * 发送信息
     * @param {any} msg 
     * @param {*} callback 
     */
    sendMsg(msg, port, address, callback) {
        // 发送数据
        this.server.send(msg, port, address, (err, bytes) => {
            callback(err, bytes)
        })
    }
    /**
     * 循环发送信息
     * @param {string} msg 
     * @param {*} callback 
     */
    loopSendMsg(msg, callback) {
        setInterval(() => {
            this.sendMsg(msg, (res) => {
                callback(res)
            })
        }, this.interval);
    }

}
module.exports = UDPServerManager