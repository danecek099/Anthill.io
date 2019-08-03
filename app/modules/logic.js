"use strict";

/**
 * save 28.5.18 + úprava na novej prop.js
 */

const Settings = require('./public/gameMainProperties').Settings;
// const Path = require("./pather");
const Path = require("./javaPather");
const JSONParser = require('socket.io-json-parser');
const Sio = require('socket.io');
const Bot = require("./bot");

const S = new Settings();

let workerId;
let availableServers;
process.on('message', (message) => {
    availableServers = JSON.parse(message);
});

class Ant {
    constructor(x, y, type, owner) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.owner = owner;

        Object.assign(this, S.ant[type]);

        if (Ant.id == undefined) {
            this.id = Ant.id = 1;
        } else {
            this.id = ++Ant.id;
        }

        this.path = [];
        this.radius = this.s / 2 + 2;
    }
    get props() {
        return {
            x: this.x,
            y: this.y,
            type: this.type,
            owner: this.owner,
            id: this.id,
            target: this.target,
            path: this.path,
            hp: this.defHp, // tady ještě nejsou jiný hp...

            defHp: this.defHp, // jenom defHp
            defSpeed: this.defSpeed, // speed si dělá každej sám
            dmgVal: this.dmgVal,

            name: this.name
        }
    }
}

class GameO {
    constructor(prop) {
        Object.assign(this, S.gameO[prop.type]);
        Object.assign(this, prop);

        if (GameO.id == undefined) {
            this.id = GameO.id = 1;
        } else {
            this.id = ++GameO.id;
        }

        this.spawnPoint = {
            x: this.x,
            y: this.y
        }
    }
    get x() {
        return this.dX * S.gridRess + S.gameOGapPx;
    }
    get y() {
        return this.dY * S.gridRess + S.gameOGapPx;
    }
    get s() {
        return this.dS * S.gridRess - 2 * S.gameOGapPx;
    }
    get props() {
        return {
            dX: this.dX,
            dY: this.dY,
            type: this.type,
            owner: this.owner,
            id: this.id,
            spawnPoint: this.spawnPoint,
            hp: this.defHp, // tady ještě nejsou jiný hp...
            defHp: this.defHp, // jenom defHp
            dmgVal: this.dmgVal,

            name: this.name
        }
    }
    get propsD() {
        return {
            dX: this.dX,
            dY: this.dY,
            dS: this.dS
        }
    }
}

class Playa {
    constructor(id, room, name) {
        this.id = id;
        this.antCount = 0;
        this.gameOCount = 0;
        this.room = room;
        this.name = name;

        this.upgraded = Object.assign({}, S.upgraded);
        this.upgradePending = Object.assign({}, S.upgraded);

        this.stats = Object.assign({}, S.stats);

        this.queue = []; // main
        this.queue1 = []; // barracks
        this.queue2 = []; // upgrade
        this.prom = {pending: false}
        this.prom1 = {pending: false}
        this.prom2 = {pending: false}

        this.buildTimeOuts = [];
    }
    addQueueMain(promise, then, time){
        // this.queue.push({f, time});
        this.queue.push({promise, then, time});
        // if(this.prom.p === null) this.next(this.queue, this.prom);
        if(!this.prom.pending) this.next(this.queue, this.prom);
    }
    addQueueBarr(promise, then, time){
        this.queue1.push({promise, then, time});
        if(!this.prom1.pending) this.next(this.queue1, this.prom1);
    }
    addQueueUpgrade(promise, then, time){
        this.queue2.push({promise, then, time});
        if(!this.prom2.pending) this.next(this.queue2, this.prom2);
    }
    next(queue, prom) {
        const a = queue.shift();
        if(!a){
            prom.pending = false;
            return;
        }
        
        prom.pending = true;

        Promise.all([
            a.promise(), // vrátí newAnt promise
            new Promise(jo => {
                prom.timeOut = setTimeout(() => {
                    jo();
                }, a.time);
                // console.log("upTime", a.time);
            })
        ]).then(array => { // [ant, undefined]
            a.then(array[0]);
            this.next(queue, prom);
        })

    }
    kill(){
        clearTimeout(this.prom.timeOut)
        clearTimeout(this.prom1.timeOut)
        clearTimeout(this.prom2.timeOut)

        for(const timeOut of this.buildTimeOuts)
            clearTimeout(timeOut);
    }
}

class Room {
    constructor(id, io, canConnect) {
        this.id = id;
        this.io = io;
        
        // this.path = new Path(S);
        this.path = new Path(id);

        this.playaArr = [];
        this.canConnect = canConnect;
        this.maxPlayers = 9;

        this.startGame();

        this.testt = 0;

        // setTimeout(() => {
        //     this.player42.kill();
        //     this.path.kill();

        //     this.suicide(this.id);
        // }, 5000);
    }
    addPlayer(socket, name) {
        socket.join(this.id);
        socket.roomId = this.id;
        socket.emit("show", "SERVER: joined room " + this.id);
        
        this.playaArr.push(new Playa(socket.id, this.id, name));
        
        socket.emit("start", {
            a: this.player42.antArr.propsS(),
            g: this.player42.gameOArr.propsS()
        });

        // socket.in(this.id).emit();

        // this.restartCounter();
    }
    removePlayer(socket){
        return new Promise((jo) => {
            socket.leave(this.id, () => {
                socket.roomId = null;
                this.disconnect(null, socket);
                jo();
            });
        });
    }

    // event fce
    requestGameO(data, socket) {
        const playa = this.playaArr.getById(socket.id);

        if(playa && this.takeResources(S.gameO[data.type].cost, playa)){

            data.owner = socket.id;
            this.io.in(this.id).emit("pre", {data, owner: socket.id, reqId: data.reqId});

            const timeOut = setTimeout(() => {
                playa.gameOCount++;
                
                const base = new GameO({
                    dX: data.dX,
                    dY: data.dY,
                    type: data.type,
                    owner: socket.id,
                    name: playa.name
                });
                    
                // tady se budou aplikovat upgrade hodnoty
                for (const u in playa.upgraded) {
                    if (playa.upgraded[u] != 1 && S.upgrade[u].type == base.type) {
                        for (const keyVal of S.upgrade[u][playa.upgraded[u]].up) {
                            base[keyVal.key] = keyVal.val;
                        }
                        break;
                    }
                }

                this.path.addObject([base.propsD]);

                this.io.in(this.id).emit("newBase", base.props);
                // this.io.in(this.id).emit("newBase", {props: base.props, owner: socket.id, reqId: data.reqId});
                this.player42.do("newBase", base.props);
            }, S.gameO[data.type].spawnDelay * 1000);

            playa.buildTimeOuts.push(timeOut);
        } else {
            // console.error("req gameO: není res nebo playa");
        }
    }
    requestAnt(data, socket) {
        if (data.x) { // debug のために
            // console.log("antReq");
            this.newAnt(data, socket.id).then((ant) => {
                this.io.in(this.id).emit("newAnt", {props: ant.props});
                this.player42.do("newAnt", ant.props);
            },
            () => socket.emit("show", "SERVER: no place"));
        } else { // výchozí je tohle
            const target = this.player42.gameOArr.getById(data.target.id);
            if(target){
                data.x = target.spawnPoint.x;
                data.y = target.spawnPoint.y;
                
                const playa = this.playaArr.getById(socket.id);
                if(playa && this.takeResources(S.ant[data.type].cost, playa)){
                    const args = [
                        () => this.newAnt(data, target.owner),
                        (ant) => {
                            playa.antCount++;
                            ant.name = playa.name;
                            // this.io.in(this.id).emit("newAnt", ant.props);
                            this.io.in(this.id).emit("newAnt", {props: ant.props, owner: socket.id, reqId: data.reqId});
                            this.player42.do("newAnt", ant.props);
                        },
                        S.ant[data.type].spawnDelay * 1000
                    ];
                    
                    if(data.type == 10){
                        playa.addQueueMain(...args);
                    } else {
                        playa.addQueueBarr(...args);
                    }

                } else {
                    // console.error("ant req: no items or playa");
                }
            } else {
                // console.error("ant req: no target");
            }
        }
    }
    setSpawnPointRequest(data, socket) {
        const gameO = this.player42.gameOArr.getById(data.id);
        if (gameO && gameO.owner == socket.id) {
            gameO.spawnPoint = data.spawnPoint;
            // this.io.emit("setSpawnPoint", {
            this.io.in(this.id).emit("setSpawnPoint", {
                id: data.id,
                spawnPoint: data.spawnPoint
            });
            this.player42.do("setSpawnPoint", {
                id: data.id,
                spawnPoint: data.spawnPoint
            });
        }
    }
    /**
     * vždy přes removePlayer()
     */
    disconnect(data, socket) {
        const playa = this.playaArr.removeByIdS(socket.id);
        if(playa){
            playa.kill();
    
            this.player42.antArr.removeByOwnerS(socket.id);
            const a = this.player42.gameOArr.removeByOwnerS(socket.id);
            this.path.removeObject(a.propsD());
            this.io.in(this.id).emit("onDis", socket.id);
            this.player42.do("onDis", socket.id);

            if(this.playaArr.length == 0) this.suicide();
        } else {
            // console.error("disconnect on undefined");
        }
    }
    /**
     * zavolaný zvenku
     */
    destroy(data, socket) {
        switch (data.targetType) {
            case "ant":
                const to = this.player42.antArr.getById(data.id);
                if(to && to.owner == socket.id){
                    this.player42.antArr.removeByIdS(data.id);
                    this.io.in(this.id).emit("destroyed", data);

                    const stats = this.playaArr.getById(socket.id).stats;
                    const cost = S.ant[to.type].cost;
                    stats.item0 += Math.round(cost.item0 / 2);
                    stats.item1 += Math.round(cost.item1 / 2);
                    stats.gold += Math.round(cost.gold / 2);

                }
                break;
            case "gameO":
                const to1 = this.player42.gameOArr.getById(data.id);
                if(to1 && to1.owner == socket.id){
                    const gO = this.player42.gameOArr.removeByIdS(data.id);
                    this.path.removeObject([to1.propsD]);
                    this.io.in(this.id).emit("destroyed", data);

                    const stats = this.playaArr.getById(socket.id).stats;
                    const cost = S.gameO[to1.type].cost;
                    stats.item0 += Math.round(cost.item0 / 2);
                    stats.item1 += Math.round(cost.item1 / 2);
                    stats.gold += Math.round(cost.gold / 2);

                    if(to1.type == 0){
                        this.removePlayer(socket);
                    }
                }
                break;
        }
    }
    upgrade(data, socket) {
        const playa = this.playaArr.getById(socket.id);

        if(playa){
            const lvlUp = S.upgrade[data.u][playa.upgradePending[data.u] + 1];
            if(lvlUp && this.takeResources(lvlUp.cost, playa)){
                playa.upgradePending[data.u]++;

                playa.addQueueUpgrade(
                    () => {
                        return Promise.resolve();
                    },
                    () => {

                        playa.upgraded[data.u]++;
                        
                        data.lvl = playa.upgraded[data.u];
                        data.owner = socket.id;
                        
                        this.io.in(this.id).emit("upgrade", {data, owner: socket.id, reqId: data.reqId});
                        this.player42.do("upgrade", data);
                    },
                    lvlUp.upgradeDelay * 1000
                );
            } else {
                // console.error("upgrade while insufficient items");
            }
        }

    }
    pre(data, socket) {
        socket.broadcast.to(this.id).emit("pre", data);
    }
    multiMoveRequest(data, socket){
        if(socket.moveReq) return false;

        socket.moveReq = true;

        const moved = [];
        const promArr = [];
        this.player42.antArr.getByOwner(socket.id).forEach(ant => {
            for(let i = data.reqArr.length - 1; i >= 0; --i){
                if (ant.id == data.reqArr[i]) {
                    const coor = this.getCoor(data.target, ant); // souřadnice cíle
                    if (coor){
                        const id = data.reqArr[i];

                        promArr.push(new Promise((jo) => {
                            this.path.doPath(ant.pos, coor).then(path => {
                                if (path) {
                                    ant.setTarget({
                                        target: data.target,
                                        path
                                    });
                                    moved.push({antId: id, path});
                                } else socket.emit("show", "SERVER: can not make a path");

                                jo();
                            });
                        }));

                        data.reqArr.splice(i, 1);

                    } else socket.emit("show", "SERVER: invalid target");
                }
            }
        });

        socket.emit("moving", data.reqId);

        Promise.all(promArr).then(() => {
            this.io.in(this.id).emit("multiMoveAnt", {moved, target: data.target, owner: socket.id, reqId: data.reqId});

            socket.moveReq = false;
        }, a => console.error("MULTIMOVE NE", a));

    }
    test(data, socket) {
        console.log("testRoom", this.id, socket.roomId, socket.id);
        socket.emit("test", "test socket");
        this.io.in(this.id).emit("test", "test io");
        this.io.in(this.id).emit("test", "test sockets.io");
    }
    showMsg(data, socket){
        this.io.in(this.id).emit("showMsg", data);
    }
    // /event fce

    /**
     * return Promise
     */
    newAnt(data, owner) {
        return new Promise((jo, ne) => {
            this.path.findPointEx(data.x, data.y).then(res => {
                if (res) {

                    let {x, y} = res;
                    this.player42.antArr.forEach(ant => {
                        if (ant.x == x && ant.y == y) {
                            x += 1;
                            y += 2;
                        }
                    });
        
                    const ant = new Ant(x, y, data.type, owner);
                    
                    const playa = this.playaArr.getById(owner);
                    
                    // tady se budou aplikovat upgrade hodnoty
                    for (const u in playa.upgraded) {
                        if (playa.upgraded[u] != 1 && S.upgrade[u].type == ant.type) {
                            for (const keyVal of S.upgrade[u][playa.upgraded[u]].up) {
                                ant[keyVal.key] = keyVal.val;
                            }
                            break;
                        }
                    }
                    jo(ant);
                } else ne();
            });
        })
    }
    startGame() {
        const gameOArr = [];
        S.gameObjects.forEach((gameO) => {
            if (!gameO.owner) gameO.owner = "default";
            const o = new GameO(gameO);
            gameOArr.push(o);
        });
        // console.log(gameOArr.propsD());
        this.path.addObject(gameOArr.propsD());

        this.goldGameO = S.gameObjects.length;

        // random gameO
        const promArr = [];
        for (let i = 0; i < S.mineableCount; i++) {
            const type = Math.floor(Math.random() * (5 - 4 + 1)) + 4;
            promArr.push(new Promise((jo) => {
                this.path.findFreePos(S.gameO[type].dS).then(pos => {
                    if (pos) {
                        const {x: dX, y: dY} = pos;
    
                        const o = new GameO({
                            dX,
                            dY,
                            type,
                            owner: "default"
                        });
                        gameOArr.push(o);

                        this.path.addObject([o.propsD]);
                    } else console.log("se nevešla", i);

                    jo();
                });
            }));
        }

        this.player42 = new Bot(this.id);

        Promise.all(promArr).then(() => {            
            this.player42.do("start", {
                g: gameOArr.propsS()
            });
    
            console.log("start room", this.id, "; w", workerId);
        });


        /**
         * tohle volá player42
         */
        this.player42.destroy = (to) => {
            const target = to.getTarget();
            if(to.owner != "default"){
                const playa = this.playaArr.getById(to.owner);
                if(playa){
                    switch (target.targetType) {
                        case "ant":
                            playa.antCount--;
                            break;
                        case "gameO":
                            playa.gameOCount--;
                            this.path.removeObject([to.propsD]);

                            break;
                        }
                    } else {
                        // socket.emit("show", "SERVER: [42des] this should not happen...");
                    }
            } else {
                if(to.type == 7){
                    // console.log("r" + this.id, this.goldGameO);
                    if(--this.goldGameO == S.roomRestartTreshold)
                        this.restartCounter();
                }
            }

            this.io.to(this.id).emit("destroyed", target);
        }

        /**
         * autoAttack je teď mimo provoz
         * 
         * ant - real
         * target - real
         * autoAttack - jo, nebo ne z kaeru()
         */
        this.player42.autoMoveRequest = (data) => {
            // const ant = this.player42.antArr.getById(data.antId);

            let coor, target;
            if(!data.autoAttack){
                // normální getCoor
                coor = this.getCoor(data.target, data.ant);
                target = data.target;
            } else {
                // už mám real target
                coor = this.getCoor(data.target, data.ant, true);
                target = data.target.getTarget();
            }

            // console.log(data.ant.id, data.autoAttack);

            this.path.doPath(data.ant.pos, coor).then(path => {
                if (path) {
                    data.ant.setTarget(
                    data.autoAttack ? {
                        target: target,
                        path,
                        autoAttack: true,
                        trueTarget: data.target // abych mohl sledovat .modoring
                    } : {
                        target: target,
                        path
                    });

                    this.io.to(this.id).emit("moveAnt", {target, path, antId: data.ant.id}); // antId, target, path
                } else {
                    // resetuju ho
                    data.ant.removeTarget();
                }
            });
        }

        this.player42.resolveDmg = this.resolveDmg.bind(this);

        this.upIntr = setInterval(() => {
            for(const playa of this.playaArr){
                this.io.to(playa.id).emit("update", {
                    a: this.player42.antArr.updateProps(),
                    g: this.player42.gameOArr.updateProps(),
                    s: playa.stats
                })
            }
        }, 15 * S.fpsToMs);

    }
    getCoor(target, ant, isReal) { // ant kterej útočí
        const end = {
            x: 0,
            y: 0
        }

        // už je real nebo je to targetType
        if(isReal || target.targetType !== undefined){
            let to;
            if(!isReal){
                to = this.getByTargetType(target);
            } else to = target;
            
            if(to){
                if ((to.enemyOf(ant) || to.mineable) && ant.attackSet.indexOf(to.type) == -1) {
                    end.atack = true;
                }
                end.x = to.centerX;
                end.y = to.centerY;
                end.s = to.dS || to.s;
            } else 
                return false;
        } else { // je to bod
            end.x = target.x;
            end.y = target.y;
        }
        return end;
    }
    getByTargetType(target) {
        let to = false;
        switch (target.targetType) {
            case "ant":
                to = this.player42.antArr.getById(target.id);
                break;
            case "gameO":
                to = this.player42.gameOArr.getById(target.id);
                break;
        }
        return to;
    }
    /**
     * 
     * @param {*} a return z to
     */
    resolveDmg(a, owner){
        if (a && !a.dead) {
            const playa = this.playaArr.getById(owner);
            if(playa){
                if (a.mineable) {
                    // playa.stats[a.item] += a.value;
                    playa.stats[a.item] += a.value * a.dmg;
                } else {
                    playa.stats.gold += Math.round(a.dmg);
                }
            } else {
                this.io.to(owner).emit("show", "SERVER: [dmgRes] this should not happen...");
            }

        }
    }
    takeResources(cost, playa){
        if(playa.stats.gold - cost.gold < 0 || playa.stats.item0 - cost.item0 < 0 || playa.stats.item1 - cost.item1 < 0) return false;
        else {
            playa.stats.gold -= cost.gold;
            playa.stats.item0 -= cost.item0;
            playa.stats.item1 -= cost.item1;

            return true;
        }
    }
    restartCounter(){
        this.showMsg("Room will restart in 2min");

        setTimeout(() => {
            console.log(new Date().toLocaleString(), "Room", this.id, "restarted");
            
            this.showMsg("Room is restarting");

            for(const playa of this.playaArr){
                this.io.in(playa.id).emit("roomRestart");
                playa.kill();
            }

            clearInterval(this.upIntr);
            this.suicide(this.id);
        }, 20000);
    }
}

class Logic {
    constructor(id = 1) {
        console.log("new worker:", id);
        workerId = id;

        this.io = Sio({
            parser: JSONParser
        }).listen(300 + "" + id);

        Room.prototype.suicide = (i) => {
            this.rooms[i] = new Room(i, this.io, true);
        }

        this.rooms = [
            new Room(0, this.io, true),
            // new Room(1, this.io, true),
            // new Room(2, this.io, true),
            // new Room(3, this.io, true),
            // new Room(4, this.io, true)
        ]

        // for(const i in this.rooms){
        //     this.rooms[i].suicide = () => {
        //         this.rooms[i] = new Room(i, this.io, true);
        //     }
        // }

        this.connCount = 0;

        this.setIo();

        // setInterval(() => {
        //     console.log(`Connected: ${this.connCount}`);

        //     for(const room of this.rooms){
        //         console.log(`Room ${room.id}: ${room.playaArr.length}`);
        //     }

        // }, 20000);
    }
    setIo() {
        this.io.on('connection', (socket) => {
            socket.emit("show", "SERVER: Connected to w" + workerId);

            const mainF = () => {
                socket.emit("rooms", this.roomInfo());
                socket.intr = setInterval(() => {
                    socket.emit("rooms", this.roomInfo());
                }, 1000)
        
                if(!socket.eventsAdded){
                    socket.on("roomSelect", data => this.connect(data, socket));

                    socket.on("requestGameO", data => this.requestGameO(data, socket));
                    socket.on("requestAnt", data => this.requestAnt(data, socket));
                    socket.on("setSpawnPointRequest", data => this.setSpawnPointRequest(data, socket));
                    socket.on("moveRequest", data => this.moveRequest(data, socket));
                    socket.on("disconnect", data => this.disconnect(data, socket));
                    socket.on("destroy", data => this.destroy(data, socket));
                    socket.on("upgrade", data => this.upgrade(data, socket));
                    socket.on("pre", data => this.pre(data, socket));
                    socket.on("roomDis", data => this.roomDis(data, socket));
                    socket.on("multiMoveRequest", data => this.multiMoveRequest(data, socket));
                    socket.on("test", data => this.test(data, socket));
                    socket.on("showMsg", data => this.showMsg(data, socket));

                    socket.eventsAdded = true;
                    this.connCount++;
                }

            }

            socket.on("ready", mainF);
        })
    }
    roomInfo(){
        const data = {};
        for(const room of this.rooms){
            const conn = room.playaArr.length <= room.maxPlayers;
            // cannConnect je k debugu
            if(room.canConnect)
                data[room.id] = {players: room.playaArr.length, conn};
        }

        return data;
    }
    remove(socket) {
        for (const room of this.rooms) {
            for (const playa of room.playaArr) {
                if (socket.id == playa.id) {
                    return room.removePlayer(socket);
                }
            }
        }
        return Promise.resolve();
    }
    
    // event handlers
    connect(data, socket) {
        const room = this.rooms[data.room];
        if(room){
            const conn = room.playaArr.length <= room.maxPlayers && room.canConnect;
            // const conn = false;
            if(conn){
                this.remove(socket).then(() => {
                    this.rooms[data.room].addPlayer(socket, data.name);
                    clearInterval(socket.intr);
                })
            } else {
                socket.emit("nonono")
            }
        }
    }
    requestGameO(data, socket){
        if(socket.roomId || socket.roomId === 0)
            this.rooms[socket.roomId].requestGameO(data, socket);
    }
    requestAnt(data, socket){
        if(socket.roomId || socket.roomId === 0)
            this.rooms[socket.roomId].requestAnt(data, socket);
    }
    setSpawnPointRequest(data, socket){
        if(socket.roomId || socket.roomId === 0)
            this.rooms[socket.roomId].setSpawnPointRequest(data, socket);
    }
    moveRequest(data, socket){
        if(socket.roomId || socket.roomId === 0)
            this.rooms[socket.roomId].moveRequest(data, socket);
    }
    disconnect(data, socket){
        if(socket.roomId || socket.roomId === 0){
            this.rooms[socket.roomId].removePlayer(socket).then(() => {});
        }

        this.connCount--;
        // this.rooms[socket.roomId].disconnect(data, socket);
    }
    destroy(data, socket){
        if(socket.roomId || socket.roomId === 0)
            this.rooms[socket.roomId].destroy(data, socket);
    }
    upgrade(data, socket){
        if(socket.roomId || socket.roomId === 0)
            this.rooms[socket.roomId].upgrade(data, socket);
    }
    pre(data, socket){
        if(socket.roomId || socket.roomId === 0)
            this.rooms[socket.roomId].pre(data, socket);
    }
    roomDis(data, socket){
        if(socket.roomId || socket.roomId === 0)
            this.rooms[socket.roomId].removePlayer(socket).then(() => {
            })
    }
    multiMoveRequest(data, socket){
        if(socket.roomId || socket.roomId === 0)
            this.rooms[socket.roomId].multiMoveRequest(data, socket);
    }
    test(data, socket){
        console.log("test", socket.id, socket.roomId, data);
        this.rooms[socket.roomId].test(data, socket);
    }
    showMsg(data, socket){
        if(data.pass === "kurwa"){
            if(data.all){
                for(const room of this.rooms)
                    room.showMsg(data.text, socket);
            } else {
                if(socket.roomId || socket.roomId === 0)
                    this.rooms[socket.roomId].showMsg(data.text, socket);
            }
        }

        console.log("showMsg", data);
    }
}

module.exports = Logic;