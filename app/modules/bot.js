/**
 * save 28.5.18
 */

const {chunksToLinesAsync} = require('@rauschma/stringio');
const Settings = require('./public/gameMainProperties').Settings;
const S = new Settings();

class Ant {
    constructor(prop) {
        Object.assign(this, S.ant[prop.type]);
        Object.assign(this, prop);
        
        this.speed = this.defSpeed;        

        this.onTarget = true;
        this.radius = this.s / 2 + 2;
        this.step = 0;
        this.targetTimeout = false;
        if (this.target == undefined) this.target = {
            x: this.x,
            y: this.y
        }
        this.doCollide = true;
        this.canHeal = true;
    }
    get centerX() {
        return this.x + this.s / 2;
    }
    get centerY() {
        return this.y + this.s / 2;
    }
    get center() {
        return {
            x: this.x + this.s / 2,
            y: this.y + this.s / 2
        }
    }
    set props(obj) {
        this.x += obj.xx;
        this.y += obj.yy;
    }
    get collProps() {
        return {
            id: this.id,
            x: Math.round(this.x),
            y: Math.round(this.y),
            r: this.radius,
            o: this.owner
        }
    }
    get updateProps(){
        if(this.onTarget && !this.upSent){
            this.upSent = true
            return {
                hp: this.hp,
                x: this.x,
                y: this.y
            }
        }

        return{
            hp: this.hp
        }
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
            hp: this.hp, // tady už je

            defHp: this.defHp,
            defSpeed: this.defSpeed,
            dmgVal: this.dmgVal,

            name: this.name
        }
    }
    get pos() {
        return {
            x: Math.round(this.x),
            y: Math.round(this.y)
        }
    }
    getTarget() {
        return {
            targetType: "ant",
            id: this.id
        }
    }
    setTarget(data) {
        this.onTarget = false;
        this.target = data.target;
        this.path = data.path;
        this.upSent = false

        if(this.path[this.path.length - 1] == "target"){
            this.goingToAttack = true;
        } else {
            this.goingToAttack = false;
        }

        if(data.autoAttack){
            this.autoAttackPos = this.pos;
            this.trueTarget = data.trueTarget;
        } else {
            this.autoAttackPos = false;
            this.trueTarget = false;
        }
    }
    dmg(a) {
        // this.hp -= a;

        const realDmg = Math.max(a - (this.armor / 10), 0);
        this.hp -= realDmg;

        let dead = false;
        if (this.hp <= 0) {
            this.autoAttackPos = false;
        this.trueTarget = false;
            this.destroy(this);
            dead = true;
        }
        
        return {
            mineable: false,
            item: false,
            value: false,
            dmg: realDmg,
            dead: dead
        }
    }
    heal(a){
        if(!this.canHeal) return false;
 
        if(this.hp + a > this.defHp){
            this.hp = this.defHp;
        } else {
            this.hp += a;
        }

        this.canHeal = false;
        setTimeout(() => {
            this.canHeal = true;
        }, S.healDelay);
    }
    doDmg(obj) { // gameO と ant
        if (this.step == 0 && this.target){ // gameO
            if(obj && this.matchTarget(obj.getTarget()) && (obj.enemyOf(this) || obj.mineable) && this.attackSet.indexOf(obj.type) == -1 ){
                const a = obj.dmg(this.dmgVal);
                if(a.dead) this.removeTarget();
                this.stepBack();
                return a;
            }
            if(obj && obj.target && obj.getTarget().targetType == "ant" && !this.onTarget){ // ant, onTargetStop
                if(!this.goingToAttack && obj.owner == this.owner && obj.target.x == this.target.x && obj.target.y == this.target.y && obj.onTarget){ // má stejnej cíl a stojí
                    this.onTarget = true;
                }
            }
        }
        return false;
    }
    stepBack() {
        this.step = 3;
    }
    gridColl() {
        if(this.path.length != 0){
            const c1 = {
                x: this.x,
                y: this.y,
                radius: this.radius
            }, s = {};
    
            const c2 = {
                x: this.path[0][0],
                y: this.path[0][1],
                radius: 5
            }
    
            s.vx = (c2.x + c2.radius) - (c1.x + c1.radius);
            s.vy = (c2.y + c2.radius) - (c1.y + c1.radius);
            s.magnitude = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
            const combinedRadii = c1.radius + c2.radius;
            if (s.magnitude < combinedRadii) return true;
        }
        return false;
    }
    nextPoint() {
        if (this.path.length != 0 && !this.onTarget) {
            if (this.path[0] === "target") {
                const ret = this.getCoor(this.target);
                if (!ret) { // target už není
                    this.removeTarget();
                    if(this.autoAttackPos){
                        this.kaeru();
                    }
                    return false;
                }
                return ret;
            }

            // když se target začne vracet tak přestaň
            if(this.trueTarget && this.trueTarget.modoring){
                this.kaeru();
            }

            if (this.gridColl()) {
                this.path.splice(0, 1);
                if (this.path.length == 0) {
                    this.onTarget = true;
                    this.modoring = false;
                    return false;
                }
            }
            return this.path[0];
        }
        return false;
    }
    move() {
        const target = this.nextPoint();
        if (!target) return;
        const work = {
            x: this.x + this.radius,
            y: this.y + this.radius
        }

        if (this.step > 0) {
            this.speed = -7 * this.step--;
            if (this.step == 0) this.speed = this.defSpeed;
        }
        work.x -= target[0];
        work.y -= target[1];
        const distance = Math.sqrt(work.x * work.x + work.y * work.y);
        if (isNaN(distance)) return;
        const q = Math.min(distance, this.speed) - distance;
        const a = Math.atan2(work.x, work.y);
        work.x += Math.sin(a) * q;
        work.y += Math.cos(a) * q;
        this.x -= work.x;
        this.y -= work.y;
    }
    kaeru(){
        this.removeTarget();
        this.returnBack();
        this.modoring = true;
        this.autoAttackPos = false;
        this.trueTarget = false;
    }

    update(){
        if(this.autoAttackPos){
            const pos = this.pos;
            const vx = pos.x - this.autoAttackPos.x;
            const vy = pos.y - this.autoAttackPos.y;

            const magnitude = Math.sqrt(vx * vx + vy * vy);

            if(magnitude > S.attackMax){
                this.kaeru();
            }
        }

        this.move();
    }
    removeTarget() {
        this.onTarget = true;
        this.goingToAttack = false;
        this.path = [];
        this.target = {
            x: this.x,
            y: this.y
        }
        this.step = 0;
        this.speed = this.defSpeed;
    }
    getTarget() {
        return {
            targetType: "ant",
            id: this.id
        }
    }
    enemyOf(obj){
        return obj.owner != this.owner && this.owner != "default";
    }
    timeOut(time) {
        this.targetTimeout = true;
        setTimeout(() => {
            this.targetTimeout = false;
        }, S.antTimeout);
    }
    matchTarget(pos) {
        if (pos.targetType !== undefined) {
            return pos.targetType == this.target.targetType && pos.id == this.target.id;
        } else {
            return this.target.x == pos.x && this.target.y == pos.y
        }
    }
    canTarget(target) {
        if (!this.targetTimeout)
            return !this.matchTarget(target);
        
        return false;
    }
}

class GameO {
    /**
     * {dX, dY, type, owner}
     */
    constructor(prop) {
        Object.assign(this, S.gameO[prop.type]);
        Object.assign(this, prop);

        this.radius = this.s / 2 + 2; // 2 vs 6 -> 4
        this.canAttack = true;
        this.doCollide = true;
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
    get centerX() {
        return this.x + this.s / 2;
    }
    get centerY() {
        return this.y + this.s / 2;
    }
    get center() {
        return {
            x: this.x + this.s / 2,
            y: this.y + this.s / 2
        }
    }
    get collProps() {
        return {
            id: this.id,
            x: Math.round(this.x),
            y: Math.round(this.y),
            r: this.radius,
            o: this.owner,
            dmg: this.dmgVal != undefined,
            heal: this.healVal != undefined
        }
    }
    get props(){
        return {
            dX: this.dX,
            dY: this.dY,
            type: this.type,
            owner: this.owner,
            id: this.id,
            spawnPoint: this.spawnPoint,
            hp: this.hp, // tady už jsou
            defHp: this.defHp,
            dmgVal: this.dmgVal,

            name: this.name
        }
    }
    get updateProps(){
        return {
            hp: this.hp
        }
    }
    get propsD() {
        return {
            dX: this.dX,
            dY: this.dY,
            dS: this.dS
        }
    }
    getTarget() {
        return {
            targetType: "gameO",
            id: this.id
        }
    }
    dmg(a) {
        // this.hp -= a;
        const realDmg = Math.max(a - this.armor, 0)
        this.hp -= realDmg;

        let dead = false;
        if (this.hp <= 0) {
            this.destroy(this);
            dead = true;
        }
        
        return {
            mineable: this.mineable,
            item: this.item,
            value: this.ps,
            dmg: realDmg,
            dead: dead
        }
    }
    enemyOf(obj){
        return obj.owner != this.owner && this.owner != "default";
    }
    attack(ant) {
        if(this.canAttack){
            new Projectile(this.center, ant, this.dmgVal);

            this.canAttack = false;
            setTimeout(() => {
                this.canAttack = true;
            }, S.gameOAttackDelay);
        }
    }
}

class Projectile{
    constructor(start, target, dmg){
        this.pos = start;
        this.target = target;

        this.speed = 15;
        this.dmg = dmg;

        this.intr = setInterval(() => {
            if(!this.target || this.target.destroyed || !this.move()){

                clearInterval(this.intr);
            }
        }, S.fpsToMs);
    }
    move(){
        const work = {
            x: this.pos.x,
            y: this.pos.y
        }

        const target = this.target.center;
        work.x -= target.x;
        work.y -= target.y;

        const distance = Math.sqrt(work.x * work.x + work.y * work.y);
        if (isNaN(distance)) return;
        const q = Math.min(distance, this.speed) - distance;
        const a = Math.atan2(work.x, work.y);
        work.x += Math.sin(a) * q;
        work.y += Math.cos(a) * q;
        this.pos.x -= work.x;
        this.pos.y -= work.y;

        if(this.pos.x == target.x && this.pos.y == target.y){
            const a = this.target.dmg(this.dmg);
            // na serveru staty zatím neřeším

            return false;
        }

        return true;
    }
}

class Bot {
    constructor(id) {
        this.asdId = id;
        this.antArr = [];
        this.gameOArr = [];

        // this.worker = require('child_process').fork('modules/public/worker.js');
        this.worker = require('child_process').spawn(
            'java', ['-jar', 'javatest/uwu.jar', ''], {
                stdio: ["pipe", "pipe", "pipe"]
            }
        );
        // this.worker.on("message", this.afterCollide.bind(this));
        this.read(this.worker.stdout);
        this.worker.on("close", () => console.log("collider " + id + " closed"));
        this.worker.stderr.on('data', (d) => {
            console.log("coll err:", d.toString());
        });

        this.loop = setInterval(() => {
            this.update();
        }, S.fpsToMs);
        // }, 1000);
    }
    async read(readable) {
        for await (const line of chunksToLinesAsync(readable)) {
            const data = JSON.parse(line);
            // console.log('LINE:', data);
            this.afterCollide(data);
        }
    }
    update() {
        this.workerCollide();
        this.antArr.forEach(ant => ant.update());
    }
    workerCollide() {
        const antProps = this.antArr.propsColl();
        const gameOProps = this.gameOArr.propsColl();
        
        // console.log(antProps);

        this.worker.stdin.write(JSON.stringify({
            antO: antProps,
            gameO: gameOProps
        }) + "\n");
    }
    afterCollide(mess) {

        for(const gameO of this.gameOArr){
            if(mess.gameO[gameO.id]){

                // attack
                if(mess.gameO[gameO.id].at != 0){
                    // console.log("at");

                    const ant = this.antArr.getById(mess.gameO[gameO.id].at);
                    gameO.attack(ant);
                }
                
                // heal
                if(mess.gameO[gameO.id].he.length != 0){
                    for(const antId of mess.gameO[gameO.id].he){
                        const ant = this.antArr.getById(antId);
                        if(ant)
                            ant.heal(gameO.healVal);
                    }
                }
            }
        }

        for(const ant of this.antArr){
            if (mess.antO[ant.id]) { // jestli existuje v aktuálním setu (nový, mrtvý)

                ant.props = mess.antO[ant.id]; // pozice po kolizi

                // do něčeho mrdnul
                if (mess.antO[ant.id].hit.length != 0) {

                    for(const hit of mess.antO[ant.id].hit){
                        let to; // to, do čeho mrdnul
                        // if (hit[0] == "a") to = this.antArr.getById(hit[1]);
                        if (hit.t == "a") to = this.antArr.getById(hit.id);
                        // else to = this.gameOArr.getById(hit[1]);
                        else to = this.gameOArr.getById(hit.id);

                        const a = ant.doDmg(to);

                        this.resolveDmg(a, ant.owner);
                    }
                }

                // autoAttack
                if(mess.antO[ant.id].at != 0 && !ant.autoAttackPos){
                    const target = this.antArr.getById(mess.antO[ant.id].at);
                    if(target && !target.modoring && !ant.modoring && !ant.goingToAttack && ant.onTarget){

                        ant.goingToAttack = true;

                        this.autoMoveRequest({
                            ant: ant,
                            target: target,
                            autoAttack: true
                        });
                    }
                }
            }
        }
    }

    do(what, data) {
        switch (what) {
            case "start":
                // data.a.forEach(ant => {
                //     this.antArr.push(new Ant(ant));
                // });
                data.g.forEach(data => {
                    const gameO = new GameO(data);
                    gameO.destroy = () => this.destroyF(gameO);
                    this.gameOArr.push(gameO);
                });
                break;
            case "newBase":
                const gameOo = new GameO(data);
                gameOo.destroy = () => this.destroyF(gameOo);
                this.gameOArr.push(gameOo);
                break;
            case "newAnt":
                this.antArr.forEach(ant => {
                    if (ant.x == data.x && ant.y == data.y) {
                        data.x += 1;
                        data.y += 2;
                    }
                });
                const ant = new Ant(data);
                ant.getCoor = (target) => this.getCoor(target);
                ant.destroy = () => this.destroyF(ant);
                ant.returnBack = () => {
                    this.autoMoveRequest({
                        ant: ant,
                        target: ant.autoAttackPos,
                        autoAttack: false
                    });
                }
                this.antArr.push(ant);
                break;
            case "setSpawnPoint":
                const gameO = this.gameOArr.getById(data.id);
                if(gameO) gameO.spawnPoint = data.spawnPoint;
                break;
            case "moveAnt":
                const ant2 = this.antArr.getById(data.antId);
                if(ant2){
                    ant2.setTarget(data);
                    ant2.timeOut();
                }
                break;
            case "onDis":
                // this.antArr.removeByOwnerS(data);
                // this.gameOArr.removeByOwnerS(data); // tohle už sem udělal na logicu
                break;
            case "destroyed":
                console.error("destroyed u bota");
                break;
            case "upgrade": // u, lvl, owner
                const u = S.upgrade[data.u]; // upgrade
                const up = u[data.lvl]; // přímo ten upgrade lvl

                switch (u.to) {
                    case "ant":
                        this.antArr.forEach(ant => {
                            if(ant.owner == data.owner && ant.type == u.type){
                                for(const keyVal of up.up){
                                    ant[keyVal.key] = keyVal.val;
                                }
                            }
                        });
                        break;
                    case "gameO":
                        this.gameOArr.forEach(gameO => {
                            if(gameO.owner == data.owner && gameO.type == u.type){
                                for(const keyVal of up.up){
                                    gameO[keyVal.key] = keyVal.val;
                                }
                            }
                        });
                        break;
                }
                break;
            default:
                console.log("BOT DO SWITCH");
            break;
        }
    }
    getCoor(target) {
        var to = false;
        switch (target.targetType) {
            case "ant":
                to = this.antArr.getById(target.id);
                break;
            case "gameO":
                to = this.gameOArr.getById(target.id);
                break;
        }
        if (to) return new Array(to.center.x, to.center.y);
        else return false;
    }
    destroyF(to){
        const target = to.getTarget();
        
        switch (target.targetType) {
            case "ant":
                this.antArr.removeByIdS(target.id);
                break;
            case "gameO":
                this.gameOArr.removeByIdS(target.id);
                break;
        }

        to.destroyed = true;
        this.destroy(to);
    }

    kill(){
        clearInterval(this.loop);

        this.worker.kill();
    }
}

module.exports = Bot;