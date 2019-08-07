'use strict';

const Set = require("public/gameMainProperties").Settings;
const S = new Set();
const JSONParser = rrequire("socket.io-json-parser");

class Test {
    constructor(){
        this.antArr = [];

        this.socket = io({
            path: "/s1", 
            transports: ['websocket'],
            parser: JSONParser
        });

        this.socket.on("connect", () => {
            console.log("connected");
        });
        
        this.socket.on("start", data => {
            // console.log(data);
        });

        this.socket.on("newAnt", data => {
            // console.log(data);
            this.antArr.push(data.props.id);
        });

        this.socket.on("moving", data => {
            // console.log(data);
        });

        this.socket.on("test", data => {
            const x = Math.floor(Math.random() * (9500 - 500 + 1)) + 500;
            const y = Math.floor(Math.random() * (9500 - 500 + 1)) + 500;
            this.moveAnts(x, y);
        });

        this.socket.emit("ready");
        this.socket.emit("roomSelect", {room: 0, name: "Brenda"});

        for (let i = 0; i < 100; i++) {
            this.socket.emit("requestAnt", {
                x: 200,
                y: 500,
                type: 10
            })
        }
    }

    moveAnts(x, y){
        this.socket.emit("multiMoveRequest", {
            reqArr: this.antArr,
            target: {x, y},
            reqId: 1
        });
    }

    emitTest(){
        this.socket.emit("test");
    }
}