'use strict';

const Set = require("public/gameMainProperties").Settings;
const S = new Set();
const JSONParser = rrequire("socket.io-json-parser");

class MujTink extends Tink {
    constructor(p, r) {
        super(p, r);
    }

    makePointer() {
        this.mainPointer = super.makePointer();
        return this.mainPointer;
    }
}
class Square {
    constructor(x, y, s, color) {
        this.s = s;
        this.color = color;
        this.r = new PIXI.Graphics();
        this.r.beginFill(this.color);
        this.r.drawRect(0, 0, this.s, this.s);
        this.r.endFill();
        this.r.x = x;
        this.r.y = y;
        this.r.circular = true;
        this.r.radius = this.s / 2 + 6;
    }
}
class Square1 {
    constructor(x, y, s, color, icon) {
        this.x = x;
        this.y = y;
        this.s = s;

        if(color){
            this.r = new PIXI.Graphics();
            this.r.beginFill(color);
            this.r.drawRect(0, 0, this.s, this.s);
            this.r.endFill();
            this.r.x = this.x;
            this.r.y = this.y;
            this.r.radius = this.s / 2 + 2;
            this.circular = true;

            this.sprite = new PIXI.Sprite.from(icon);
            this.sprite.width = this.s * .6;
            this.sprite.height = this.s * .6;
            this.sprite.x = this.s * .2;
            this.sprite.y = this.s * .2;
            this.r.addChild(this.sprite);
        } else {
            this.r = new PIXI.Container();
            this.r.x = this.x;
            this.r.y = this.y;
            this.ico = new PIXI.Sprite.from(icon);
            this.ico.width = this.s;
            this.ico.height = this.s;
            this.r.addChild(this.ico);
        }
    }
}
class Rectangle {
    /**
     * prohozený a, b
     */
    constructor(x, y, a, b, color, outline, r) {
        this.x = x;
        this.y = y;
        this.a = a;
        this.b = b;
        this.r = new PIXI.Graphics();
        if(color)       this.r.beginFill(color);
        if (outline)    this.r.lineStyle(4, outline, 1);
        if (r)          this.r.drawRoundedRect(0, 0, this.b, this.a, 5);
        else            this.r.drawRect(0, 0, this.b, this.a);
        if(color)       this.r.endFill();
        this.r.x = this.x;
        this.r.y = this.y;
    }
}
class Rectangle1 {
    /**
     * normální a, b
     */
    constructor(x, y, a, b, color, icon) {
        this.x = x;
        this.y = y;
        this.a = a;
        this.b = b;
        // this.color = color || 0x000000;
        
        this.r = new PIXI.Graphics();
        this.r.beginFill(color);
        this.r.drawRect(0, 0, this.a, this.b);
        this.r.endFill();
        this.r.x = this.x;
        this.r.y = this.y;
        
        const sp = new PIXI.Sprite.from(icon);
        sp.width = this.a * .6;
        sp.height = this.b * .6;
        sp.x = this.a * .2;
        sp.y = this.b * .2;
        this.r.addChild(sp);
    }
}
class Circle {
    constructor(x, y, s, color) {
        this.s = s;
        this.color = color || S.COLOR_OUTLINE_GREEN;
        this.r = new PIXI.Graphics();
        this.r.lineStyle(1, this.color, 1);
        this.r.drawCircle(0, 0, this.s);
        this.r.endFill();
        this.r.x = x;
        this.r.y = y;
        this.r.radius = this.s / 2 + 2;
    }
}
class BaseCircle {
    constructor(x, y, s, color) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.color = color || 0x000000;
        this.r = new PIXI.Graphics();
        this.r.beginFill(this.color);
        this.r.drawCircle(this.s / 2, this.s / 2, this.s / 2);
        this.r.endFill();
        this.r.x = x;
        this.r.y = y;
        this.r.radius = this.s / 2 + 2; // protože bump ho dopočítává blbě/jinak
        this.circular = true;
    }
}
class BaseCircle1 {
    /**
     * @param {*} x pozice
     * @param {*} y pozice
     * @param {*} s velikost v px
     * @param {*} color barva pozadí
     * @param {*} icon textura
     */
    constructor(x, y, s, color, icon) {
        this.x = x;
        this.y = y;
        this.s = s;
        // this.color = color;
        this.icon = icon;
        
        if(color){
            this.r = new PIXI.Graphics();
            this.r.beginFill(color);
            this.r.drawCircle(this.s / 2, this.s / 2, this.s / 2);
            this.r.endFill();
            
            this.sprite = new PIXI.Sprite.from(icon);
            this.sprite.width = this.s * .6;
            this.sprite.height = this.s * .6;
            this.sprite.x = this.s * .2;
            this.sprite.y = this.s * .2;
            this.r.addChild(this.sprite);
        } else {
            this.r = new PIXI.Container();
            this.sprite = new PIXI.Sprite.from(icon);
            this.sprite.width = this.s;
            this.sprite.height = this.s;
            this.r.addChild(this.sprite);
        }

        this.r.x = this.x;
        this.r.y = this.y;
        this.r.radius = this.s / 2 + 2;
        this.circular = true;
    }
}
class HealthBar {
    constructor(color, s) {
        const gap = s - s * .9;
        this.r = new Rectangle(gap, -8, 3, s - 2 * gap, color).r;
    }
}
class Ant {
    /**
     * Server: {x, y, type, owner, id, taget, path, enemy}
     * Set: {s, dmgVal, hp, color, speed}
     */
    constructor(prop) {
        Object.assign(this, S.ant[prop.type]);
        Object.assign(this, prop);

        // const shape = ShapeArr[this.shape](this.x, this.y, this.s, this.color, S.COLOR_OUTLINE_RED);
        // const texture = this.enemy ? "t7a" : "t9a";
        // Object.assign(this, ShapeArr[this.shape](this.x, this.y, this.s, texture));

        const color = this.enemy ? S.REE2 : S.GREE2
        // Object.assign(this, ShapeArr[this.shape](this.x, this.y, this.s, color, this.icon));
        Object.assign(this, ShapeArr[this.shape](this.x, this.y, this.s, false, this.icon));
        // Object.assign(this, new BaseCircle1(this.x, this.y, this.s, false, this.icon));

        this.sprite.x = 9;
        this.sprite.y = 9;
        this.sprite.pivot = {
            x: 250,
            y: 250
        }

        this.speed = this.defSpeed;

        if (this.target == undefined) this.target = {
            x: this.r.x,
            y: this.r.y
        }
        this.step = 0;
        this.targetTimeout = false;
        this.onTarget = true;
        this.doCollide = true;

        // this.healthBar = new HealthBar(this.enemy ? S.COLOR_HP_ENEMY : S.COLOR_HP, this.s).r;
        this.healthBar = new HealthBar(this.enemy ? S.COLOR_HP_ENEMY : this.owner == "default" ? S.COLOR_BLUE : S.COLOR_HP, this.s).r;
        this.r.addChild(this.healthBar);
        this.barWidth = this.healthBar.width;
        this.healthBar.width = this.barWidth / this.defHp * this.hp;

        this.r.interactive = true;
        this.r.cursor = 'pointer';
    }
    get collProps() {
        return {
            id: this.id,
            x: Math.round(this.r.x),
            y: Math.round(this.r.y),
            r: this.r.radius,
            o: this.owner
        }
    }
    set props(obj) {
        this.r.x += obj.xx;
        this.r.y += obj.yy;
    }
    get center() {
        return {
            x: this.r.x + this.s / 2,
            y: this.r.y + this.s / 2
        }
    }
    get pos() {
        return {
            x: Math.round(this.r.x),
            y: Math.round(this.r.y)
        }
    }
    getTarget() {
        return {
            targetType: "ant",
            id: this.id
        }
    }
    dmg(a) {
        // this.hp -= a;
        const realDmg = Math.max(a - this.armor, 0);
        this.hp -= realDmg;

        const dead = this.hp <= 0;
        // is client-dead?
        // if(dead) this.clientDead = true;

        this.hpBar();

        return {
            mineable: false,
            item: false,
            value: false,
            dmg: realDmg,
            dead: dead
        }
    }
    hpBar(){
        if(this.hp <= 0) this.hp = 0;
        this.healthBar.width = this.barWidth / this.defHp * this.hp;
    }
    doDmg(obj) { // gameO と ant
        if (this.step == 0) {
            // if (obj && this.matchTarget(obj.getTarget()) && (obj.enemyOf(this) || obj.mineable)) {
            if (obj && this.matchTarget(obj.getTarget()) && (obj.enemyOf(this) || obj.mineable) && this.attackSet.indexOf(obj.type) == -1) {
                const a = obj.dmg(this.dmgVal);
                if (a.dead) this.removeTarget();
                this.stepBack();
                if (a.mineable) new DmgNumber(this.pos, a.value, true);
                else new DmgNumber(this.pos, a.dmg, false);
                return a;
            }
            // nebyl return, takže bude asi můj
            // -> onTargetStop
            if (obj && obj.getTarget().targetType == "ant") {
                if (!this.goingToAttack && obj.target.x == this.target.x && obj.target.y == this.target.y && obj.onTarget) {
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
        const c1 = this.r,
        c2 = {
            x: this.path[0][0],
            y: this.path[0][1],
            radius: 5
        },
        s = {};

        s.vx = (c2.x + c2.radius) - (c1.x + c1.radius);
        s.vy = (c2.y + c2.radius) - (c1.y + c1.radius);
        s.magnitude = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        const combinedRadii = c1.radius + c2.radius;
        if (s.magnitude < combinedRadii) return true;
        return false;
    }
    nextPoint() {
        if (this.path[0] !== undefined && !this.onTarget) {

            if (this.path[0] === "target") {
                const ret = this.getCoor(this.target);
                if (!ret) {
                    this.removeTarget();
                    return false;
                }
                return ret;
            }

            if (this.gridColl()) {
                // this.path.splice(0, 1);
                PIXI.utils.removeItems(this.path, 0, 1)
                if (this.path.length == 0) {
                    this.onTarget = true;
                    return false;
                }
            }
            return this.path[0];
        }
        return false;
    }
    update() {
        // if (this.autoAttackPos) {
        //     const pos = this.pos;
        //     const vx = pos.x - this.autoAttackPos.x;
        //     const vy = pos.y - this.autoAttackPos.y;
        //     const magnitude = Math.sqrt(vx * vx + vy * vy);

        //     if (magnitude > S.attackMax) {
        //         this.removeTarget();
        //         delete this.autoAttackPos;
        //     }
        // }

        if (this.hp == 0) this.r.aplha = .7;
        else this.r.aplha = 1;

        this.move();
    }
    move() {
        const target = this.nextPoint();
        if (!target) return;

        const work = this.center;

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
        this.sprite.rotation = -a;
        work.x += Math.sin(a) * q;
        work.y += Math.cos(a) * q;
        this.r.x -= work.x;
        this.r.y -= work.y;
    }
    removeTarget() {
        this.onTarget = true;
        this.path = [];
        this.target = {
            x: this.r.x,
            y: this.r.y
        };
        // this.target = null;
        this.step = 0;
        this.speed = this.defSpeed;
        this.goingToAttack = false;

        // this.realTarget.underMyAttack = false;
    }
    listenF(bool = false) {
        if (bool) {
            this.selectRound();
            this.listen = true;
        } else {
            this.selR && this.selR.destroy();
            this.selR = null;
            this.listen = false;
        }
    }
    setTarget(data) {
        this.onTarget = false;
        this.target = data.target || this.pos;
        this.path = data.path;
        
        if(this.path[this.path.length - 1] == "target"){
            this.goingToAttack = true;
        } else {
            this.goingToAttack = false;
        }
    }
    timeOut() {
        this.targetTimeout = true;
        setTimeout(() => {
            this.targetTimeout = false;
        }, S.antTimeout);
    }
    selectRound() {
        this.selR = new Circle(this.s / 2, this.s / 2, 16).r;
        this.r.addChildAt(this.selR);
    }
    canTarget(target) {
        if (!this.targetTimeout)
            return !this.matchTarget(target);

        return false;
    }
    matchTarget(pos) {
        if (pos.targetType !== undefined) {
            return pos.targetType == this.target.targetType && pos.id == this.target.id;
        } else {
            return this.target.x == pos.x && this.target.y == pos.y
        }
    }
    enemyOf(obj) {
        return obj.owner != this.owner && this.owner != "default";
    }
    updateMove(x, y){
        this.r.x = x;
        this.r.y = y;
    }
}
class GameO {
    /**
     * {type, hp, id, owner, enemy, color}
     */
    constructor(prop) {
        Object.assign(this, prop);
        const options = Object.assign({}, S.gameO[this.type]);
        this.defHp = options.hp;
        delete options.hp;
        Object.assign(this, options);

        if(this.owner == "default"){
            Object.assign(this, ShapeArr[this.shape](this.x, this.y, this.s, false, this.icon));
        } else {
            const color = this.enemy ? S.REE1 : S.GREE1;
            Object.assign(this, ShapeArr[this.shape](this.x, this.y, this.s, color, this.icon));
        }

        this.onTarget = false;
        this.spawnQueue = [];
        this.upgradeQueue = [];
        this.canAttack = true;
        this.doCollide = true;

        this.healthBar = new HealthBar(this.enemy ? S.COLOR_HP_ENEMY : this.owner == "default" ? S.COLOR_BLUE : S.COLOR_HP, this.s).r;
        this.r.addChild(this.healthBar);
        this.barWidth = this.healthBar.width;
        this.healthBar.width = this.barWidth / this.defHp * this.hp;

        this.r.interactive = true;
        this.r.cursor = 'pointer';

        this.selBox = new PIXI.Graphics();
        this.selBox.lineStyle(1, 0x0080c0);
        this.selBox.drawRect(0, 0, this.s, this.s);
    }
    get collProps() {
        return {
            id: this.id,
            x: Math.round(this.r.x),
            y: Math.round(this.r.y),
            r: this.r.radius,
            o: this.owner,
            dmg: this.dmgVal
        }
    }
    get center() {
        return {
            x: this.r.x + this.s / 2,
            y: this.r.y + this.s / 2
        }
    }
    matchTarget(pos) {
        if (pos.targetType !== undefined) {
            return pos.targetType == this.target.targetType && pos.id == this.target.id;
        } else {
            return this.target.x == pos.x && this.target.y == pos.y
        }
    }
    getTarget() {
        return {
            targetType: "gameO",
            id: this.id
        }
    }
    dmg(a) {
        const realDmg = Math.max(a - this.armor, 0)
        this.hp -= realDmg;

        const dead = this.hp <= 0;

        // console.log(dead, this.onDead, dead && this.onDead);
        // if(dead && this.onDead){
        //     console.log("onDead");
        //     this.onDead();
        // }

        this.hpBar();

        return {
            mineable: this.mineable,
            item: this.item,
            value: this.ps * realDmg,
            dmg: realDmg,
            dead: dead
        }
    }
    hpBar(){
        if(this.hp <= 0) this.hp = 0;
        this.healthBar.width = this.barWidth / this.defHp * this.hp;
    }
    enemyOf(obj) {
        return obj.owner != this.owner && this.owner != "default";
    }
    canSpawn(){
        return this.spawnQueue.length < 11;
    }
    spawnAntIntr(antType, start) {
        // if(this.spawnQueue.length < 11){
            if(this.spawnIntr){
                const spawnDelay = S.delay(S.ant[antType].spawnDelay);
                this.spawnQueue.push({antType, spawnDelay, start});
            }else{
                const spawnDelay = S.delay(S.ant[antType].spawnDelay);
                this.spawnQueue.push({antType, spawnDelay, start});                    
                this.spawnTime = 100;
    
                this.spawnIntr = setInterval(() => {
                    this.spawnTime -= this.spawnQueue[0].spawnDelay;
                    if(this.spawnTime <= 0){
                        this.spawnQueue.shift().start();
                        
                        if(this.spawnQueue.length == 0){
                            clearInterval(this.spawnIntr);
                            this.spawnIntr = null;
                        } else {
                            this.spawnTime = 100;
                        }
                        
                    }
                }, S.fpsToMs);
            }
            return true;
        // } else return false;
    }
    canUpgrade(){
        return this.upgradeQueue.length < 11;
    }
    upgradeIntrF(u, lvl, start) {
        // if(this.upgradeQueue.length < 11){
            if(this.upgradeIntr){
                const upgradeDelay = S.delay(S.upgrade[u][lvl].upgradeDelay);
                this.upgradeQueue.push({upgrade: [u, lvl], upgradeDelay, start});
            }else{
                const upgradeDelay = S.delay(S.upgrade[u][lvl].upgradeDelay);
                this.upgradeQueue.push({upgrade: [u, lvl], upgradeDelay, start});                    
                this.upgradeTime = 100;

                this.upgradeIntr = setInterval(() => {
                    this.upgradeTime -= this.upgradeQueue[0].upgradeDelay;
                    if(this.upgradeTime < 0){
                        // this.upgrade(...this.upgradeQueue[0].upgrade);
                        this.upgradeQueue.shift().start();
    
                        if(this.upgradeQueue.length == 0){
                            clearInterval(this.upgradeIntr);
                            delete this.upgradeIntr;
                        }else{ // upgrade
                            this.upgradeTime = 100;
                        }

                    }
                }, S.fpsToMs);
            }
            return true;
        // } else return false;
    }
    attack(ant) {
        if(this.canAttack){
            const projectile = new Projectile(this.owner, this.center, ant, this.dmgVal);
            this.gameOCont.addChild(projectile.r);
            this.updateArr.push(projectile.update.bind(projectile));

            this.canAttack = false;
            setTimeout(() => {
                this.canAttack = true;
            }, S.gameOAttackDelay);
        }
    }
    selectBox(show = true){
        if(show){
            this.r.addChild(this.selBox);
        } else {
            this.r.removeChild(this.selBox);
        }
    }
}
class Panel{
    /**
     * @param {*} x Pozice
     * @param {*} y Pozice
     * @param {*} a Šířka panelu
     * @param {*} b Výška panelu
     * @param {*} color jiná barva
     * @param {*} r poloměr rohů
     */
    constructor(x, y, a, b, color, r){
        this.x = x;
        this.y = y;
        this.a = a;
        this.b = b;

        this.cont = new PIXI.Container();
        this.cont.x = x;
        this.cont.y = y;
        this.cont.width = a;
        this.cont.height = b;

        if(r){
            this.box = new Rectangle(0, 0, b, a, color || S.BLU3, false, r);
        } else {
            this.box = new Rectangle(0, 0, b, a, color || S.BLU3);
        }

        this.cont.addChild(this.box.r);
    }
}
class UIInfo extends Panel{
    /**
     * statArr: [pozice, text1, source, key]
     *  / [pozice, text1, text2]
     *  / [pozice, text1, source, key, style]
     */
    constructor(w, h, main, name, statArr) {
        const a = 386;
        const b = 136;
        const x = w - a - 16;
        const y = h - b - 16;

        super(x, y, a, b);
        this.box.r.alpha = .8;

        this.rArr = [];
        this.children = [];

        this.opts = {
            fontSize: 14,
            fontWeight: "600",
            fill: S.FONT_COLOR
        }
        this.opts2 = {
            fontSize: 14,
            fontWeight: "400",
            fill: S.FONT_COLOR
        }

        this.txt = new PIXI.Text(main, { // h:18
            fontSize: 16,
            fontWeight: "600",
            fill: S.FONT_COLOR
        })
        // this.txt.x = a / 2 - this.txt.width / 2;
        // this.txt.y = 3;

        if(name){
            this.txt1 = new PIXI.Text(name, { // h:18
                fontSize: 16,
                fontWeight: "600",
                fill: S.FONT_COLOR
            });
    
            this.txt2 = new PIXI.Text("|", { // h:18
                fontSize: 16,
                fontWeight: "600",
                fill: S.FONT_COLOR
            });
    
            this.txt.x = a / 2 - this.txt2.width - this.txt.width - 5;
            this.txt.y = 3;
            this.txt1.x = a / 2 + this.txt2.width + 5;
            this.txt1.y = 3;
            this.txt2.x = a / 2 - this.txt2.width / 2;
            this.txt2.y = 2;
    
            this.cont.addChild(this.txt, this.txt1, this.txt2);
        } else {
            this.txt.x = a / 2 - this.txt.width / 2;
            this.txt.y = 3;

            this.cont.addChild(this.txt);
        }

        statArr.forEach(stat => {
            let child;

            switch (stat.style) {
                case 1:
                    child = this.cirleText(stat.pos, stat.text1, stat.source, stat.key, stat.icon);
                break;
                case 2:
                    child = this.spawnBar(stat.pos, stat.text1, stat.source, stat.timeKey, stat.queueKey);
                break;
            }
            this.cont.addChild(...child.rArr);
            this.children.push(child);
        });

        this.intr = setInterval(() => {
            this.children.forEach(child => {
                child.update();
            });
        }, S.fpsToMs);

    }
    spawnBar (i, t1, source, timeKey, queueKey){
        const x = i < 3 ? 8 : this.box.r.width / 2;
        if (i > 2) i -= 3;
        const y = 18 + i * 30 + i * 8;
        const c1 = new Square1(x, 6 + y, 30, false, "ic19");
        const txt2 = new PIXI.Text(t1, this.opts); // h:16
        txt2.x = x + 30 + 8;
        txt2.y = y + 3;
        const bar = new Rectangle(0, 0, 4, this.box.r.width / 2 - 50, S.COLOR_GREEN).r;
        bar.x = x + 30 + 8;
        bar.y = 3 + y + 16;

        const ww = bar.width;
        bar.width = ww / 100 * source[timeKey];

        const antArr = [];

        const barAnt = (i) => {
            const ant = new Rectangle(0, 0, 10, 10, S.COLOR_GREEN).r;
            ant.x = x + 30 + 8 + i*12;
            ant.y = 3 + y + 16 + 7;
            return ant;
        }
        const genAnts = () => {
            antArr.forEach(ant => ant.destroy());
            antArr.length = 0;
            
            if(source[queueKey].length == 0) return false;
            source[queueKey].forEach((item, i) => {
                antArr.push(barAnt(i));
            });

            return true;
        }
        genAnts();

        const update = () => {
            bar.width = ww / 100 * source[timeKey];
            if(bar.width < 0) bar.width = 0;

            if(source[queueKey].length != antArr.length){
                if(genAnts())
                    this.cont.addChild(...antArr);
            }
        }

        return {
            rArr: [c1.r, txt2, bar, ...antArr],
            update: update
        }
    }
    cirleText (i, t1, source, key, icon){
        const x = i < 3 ? 8 : this.a / 2;
        if (i > 2) i -= 3;
        const y = 18 + i * 30 + i * 8;
        const c1 = new Square1(x, 6 + y, 30, false, icon);
        const txt2 = new PIXI.Text(t1, this.opts); // h:16
        txt2.x = x + 30 + 8;
        txt2.y = y + 3;
        const txt3 = new PIXI.Text(key ? source[key] : source, this.opts2);
        txt3.x = x + 30 + 8;
        txt3.y = 6 + y + 16;

        const update = () => {
            if (!key) return;
            txt3.text = source[key];
        }

        return {
            rArr: [c1.r, txt2, txt3],
            update: update
        }
    }
}
class UIContr extends Panel{
    constructor(w, h, pointer, fcArr) {
        const a = 370;
        const b = fcArr.length < 7 ? 76 : 136;
        const x = 16;
        const y = h - b - 16;
        
        super(x, y, a, b);
        this.box.r.alpha = .0;
        // this.box.r.height += 16;
        // this.box.r.width += 16;
        this.box.r.x -= 16;
        this.box.r.y += 16;
        this.box.r.interactive = true;
        this.pointer = pointer;

        this.hint = new UIContrHint(0, 0, 2);
        this.hintAdv = new UIContrHintAdvanced(0, 0, 2);

        // this.hint2 = new UIContrHint(0, - this.hint.box.r.height - 16, 1);
        this.hint2 = new UIContrHint(0,  this.hintAdv.y, 1);

        this.rArr = [];

        fcArr.forEach((fc, i) => {
            this.rArr.push(this.butt(i, fc));
        })

        if(this.only)
            fcArr.forEach((fc, i) => {
                if(!fc[3]){
                    this.rArr[i].alpha = .5;
                    this.rArr[i].interactive = false;
                    this.rArr[i].buttonMode = false;
                }
            })

        this.cont.addChild(...this.rArr, this.hint.cont, this.hintAdv.cont, this.hint2.cont);

        // řeší ten bug
        this.cont.height
    }
    butt(i, fc){
        const y = i < 6 ? this.b - 40 : this.b - 96;

        if (i > 5) i -= 6;
        const x = 0 + i * 40 + i * 18;

        const b = new Rectangle1(x, y, 40, 40, S.BLU3, fc[1].icon).r;
        b.interactive = true;
        b.buttonMode = true;

        // const ten = fc[1].cost ? this.hintAdv : this.hint
        const ten = fc[1].source ? this.hintAdv : this.hint

        b.on("mouseover", () => ten.show(fc[0], fc[1].source))
        b.on("mouseout", () => ten.hide());
        b.on("click", () => {
            if(!this.pointer.inUse)
                fc[2]();
        });

        if(fc[3])
            this.only = true

        return b
    }
}
class UIContrHint extends Panel{
    /**
     * Sám odečítá svojí výšku, použij souřadnice parent boxu
     */
    constructor(x, y, lines) {
        const a = 370;
        const b = 30 + (lines-1) * 16
        const y1 = y - b - 16;
        super(x, y1, a, b);
        this.box.r.alpha = .8;
        this.cont.renderable = false

        this.txt = new PIXI.Text("", {
            fontSize: 16,
            fontWeight: "400",
            fill: S.FONT_COLOR,
            wordWrap: true,
            wordWrapWidth: 360
        })
        this.txt.x = 5;
        this.txt.y = 5;

        this.cont.addChild(this.txt)
    }
    show(text) {
        this.txt.text = text;
        this.cont.renderable = true;
    }
    hide() {
        this.cont.renderable = false;
    }
    pop(text){
        this.show(text)

        setTimeout(() => {
            this.hide();
        }, 800);
    }
}
class UIContrHintAdvanced extends Panel{
    /**
     * Sám odečítá svojí výšku, použij souřadnice parent boxu
     */
    constructor(x, y, lines) {
        const a = 370;
        const b = 2 * 8 + lines * 16 + 3 * 16 + 3 * 8;
        const y1 = y - b - 16;
        super(x, y1, a, b);
        this.lines = lines;
        this.cont.renderable = false;
        this.box.r.alpha = .8;

        this.txt = new PIXI.Text("", {
            fontSize: 16,
            fontWeight: "400",
            fill: S.FONT_COLOR,
            wordWrap: true,
            wordWrapWidth: 360
        });
        this.txt.x = 8;
        this.txt.y = 8;
        this.cont.addChild(this.txt);

        this.opts = Object.assign({}, S.opts);
        this.opts.fontSize = 14;
        this.opts.fontWeight = "400";
        
        this.pos = [
            8 + lines * 16 + 8,
            8 + lines * 16 + 8 + 16 + 8,
            8 + lines * 16 + 8 + 16 + 8 + 16 + 8
        ]

        const icTe1 = this.icon(8, this.pos[0], "ic22");
        const icTe2 = this.icon(8, this.pos[1], "ic21");
        const icTe3 = this.icon(8, this.pos[2], "ic23");
        this.text1 = icTe1.text;
        this.text2 = icTe2.text;
        this.text3 = icTe3.text;
        const icTe4 = this.icon(a / 3, this.pos[0], "ic27");
        this.text4 = icTe4.text;
        
        this.icTe5 = this.icon(a / 3, this.pos[1], "ic24"); // pro farmu

        // tohle je pro ty upgrady
        this.icTe6 = this.icon(a / 3, this.pos[2], "ic16");        // hp
        this.icTe7 = this.icon(a / 3 * 2, this.pos[0], "ic17");    // dmg
        this.icTe8 = this.icon(a / 3 * 2, this.pos[1], "ic5");    // armor
        this.icTe9 = this.icon(a / 3 * 2, this.pos[2], "ic14a");    // speed
        this.icTe10 = this.icon(a / 3 * 2, this.pos[2], "ic29");    // healVal - stejná pozice se speedem
        
    }
    icon(x, y, ico){
        const icon = new Square1(x, y, 16, false, ico).r;
        const text = new PIXI.Text("", this.opts);
        text.x = x + 16 + 8;
        text.y = y;
        this.cont.addChild(icon, text);

        return {
            icon, text, 
            hide: () => {
                icon.visible = false;
                text.visible = false;
            },
            show: pos => {
                icon.visible = true;
                text.visible = true;
                if(pos != undefined){
                    icon.y = this.pos[pos];
                    text.y = this.pos[pos];
                }
            }
        }
    }
    show(text, source) {
        this.txt.text = text;
        
        this.text1.text = source.cost.gold;
        this.text2.text = source.cost.item0;
        this.text3.text = source.cost.item1;
        
        this.text4.text = source.spawnDelay || source.upgradeDelay;
        
        this.icTe5.hide();
        this.icTe6.hide();
        this.icTe7.hide();
        this.icTe8.hide();
        this.icTe9.hide();
        this.icTe10.hide();

        if(source.unitValue){
            this.icTe5.show();
            this.icTe5.text.text = "+ " + source.unitValue;
        }

        let pos = 0;
        if(source.up){
            for(const up of source.up){
                switch(up.key){
                    case "defHp":
                        this.icTe6.show();
                        this.icTe6.text.text = up.val;
                        break;
                    case "dmgVal":
                        this.icTe7.show(pos++);
                        this.icTe7.text.text = up.val;
                        break;
                    case "armor":
                        this.icTe8.show(pos++);
                        this.icTe8.text.text = up.val;
                        break;
                        // ty dva spolu
                    case "defSpeed":
                        this.icTe9.show(pos++);
                        this.icTe9.text.text = up.val;
                        break;
                    case "healVal":
                        this.icTe10.show(pos++);
                        this.icTe10.text.text = up.val;
                    break;
                }
            }
        }
        
        this.cont.renderable = true;
    }
    hide() {
        this.cont.renderable = false;
    }
    pop(text, cost){
        this.show(text, cost)

        setTimeout(() => {
            this.hide();
        }, 800);
    }
}
class FadingBullshit extends BaseCircle1 {
    constructor(x, y) {
        super(x - 9, y - 18, 18, false, "ic11");
        this.intr = setInterval(() => {
            this.r.alpha -= .25;
            if (this.r.alpha == 0) {
                this.r.destroy();
                clearInterval(this.intr);
            }
        }, 50);
    }
    update(){

    }
}
class UIStats{
    constructor(statArr) {
        this.cont = new PIXI.Container();
        this.cont.x = 16;
        this.cont.y = 16;
        this.itemArr = [];
        this.width = 0;

        this.opts = Object.assign({}, S.opts)
        this.opts.fontSize = 14
        this.opts.fontWeight = "600"

        this.opts2 = Object.assign({}, S.opts)

        statArr.forEach(stat => {
            const a = this.item(...stat);
            this.cont.addChild(...a.rArr);
            this.itemArr.push(a);

            this.width += a.width();
        })

        this.backGround(false);

        this.intr = setInterval(() => {
            let newWidth = 0;
            this.itemArr.forEach(item => {
                item.reWidth(newWidth);
                newWidth += item.width();

                if (!item.id || !item.source) return;
                if(item.of) item.rArr[2].text = item.source[item.id] + "/" + item.of[0][item.of[1]];
                else item.rArr[2].text = item.source[item.id];
            });
            if (newWidth != this.width) {
                this.width = newWidth;
                this.backGround(true);
            }
        }, S.fpsToMs);
    }
    backGround(re){
        if (re) this.cont.removeChildAt(0);

        this.r = new PIXI.Graphics();
        this.r.beginFill(S.BLU3);
        // this.r.lineStyle(4, S.COLOR_OUTLINE_RED, 1);
        // this.r.drawRoundedRect(0, 0, this.width + 16, 30, 5);
        this.r.drawRect(0, 0, this.width + 16, 30);
        this.r.endFill();
        this.r.alpha = .8;
        this.r.x = 0;
        this.r.y = 0;

        this.cont.addChildAt(this.r, 0);
    }
    item(dText, ic, source, id, ...of){
        // const icon = new Rectangle(this.width + 16, 7, 16, 16, S.GREE1).r;
        const icon = new Square1(this.width + 16, 7, 16, false, ic).r;
        const text = new PIXI.Text(dText, this.opts);
        text.x = this.width + 16 + icon.width + 5;
        text.y = 8;
        const text2 = new PIXI.Text("", this.opts2);
        text2.x = this.width + 16 + icon.width + 5 + text.width + 5;
        text2.y = 8;

        const width = () => {
            return 16 + icon.width + 5 + text.width + 5 + text2.width;
        }

        const reWidth = (currWidth) => {
            icon.x = currWidth + 16;
            text.x = currWidth + 16 + icon.width + 5;
            text2.x = currWidth + 16 + icon.width + 5 + text.width + 5;
        }

        if(of.length != 0)
            return {
                rArr: [icon, text, text2],
                width,
                reWidth,
                source,
                id,
                of
            }
        else
            return {
                rArr: [icon, text, text2],
                width,
                reWidth,
                source,
                id
            }
    }
}
class UIMap extends Panel{
    constructor(width, height, gameCont, scaleRatio, mainPointer) {
        const a = 100;
        const b = 100;
        const x = width / 2 - a / 2;
        const y = 586;
        super(x, y, a, b);
        this.box.r.alpha = .8;
        this.w = width;
        this.h = height;
        this.gameCont = gameCont;
        this.scaleRatio = scaleRatio;
        this.mainPointer = mainPointer;

        this.cont2 = new PIXI.Container();
        this.mapSize = a;
        this.objects = [];

        this.view = new PIXI.Graphics();
        this.view.lineStyle(1, S.COLOR_BLUE, 1);
        this.view.drawRect(0, 0, width / S.gameW * this.mapSize, height / S.gameW * this.mapSize);
        this.view.alpha = .8;
        this.view.x = 0;
        this.view.y = 0;

        this.cont.addChild(this.cont2, this.view);

        this.doUpdate = false;
        
        this.box.r.interactive = true;
        this.box.r.buttonMode = true;

        this.box.r.on("mousedown", event => {
            this.doUpdate = true;
            this.mainPointer.inUse = true;
            this.updatePos(event);
        });
        this.box.r.on("mouseup", event => {
            this.doUpdate = false;
            this.mainPointer.inUse = false;
        });
        this.box.r.on("mouseupoutside", event => {
            this.doUpdate = false;
            this.mainPointer.inUse = false;
        });
        this.box.r.on("mousemove", event => {
            if(this.doUpdate){
                this.updatePos(event)
            }
        });

        this.intr = setInterval(() => {
            this.objects.forEach((to, i) => {
                if (to.source.destroyed) {
                    // this.objects.splice(i, 1);
                    PIXI.utils.removeItems(this.objects, i, 1)

                    // to.r.destroy();
                    setInterval(() => {
                        this.cont2.removeChild(to.r)
                    }, 0)

                } else {
                    this.display(to);
                }
            });
        }, S.fpsToMs);
    }
    add(to, main = false) {
        this.objects.push({source: to, r: false, main});
    }
    display(g) {
        if(g.r){
            const x = Math.round(g.source.r.x / S.gameW * this.mapSize);
            const y = Math.round(g.source.r.y / S.gameW * this.mapSize);

            g.r.x = x - g.r.s
            g.r.y = y - g.r.s
        }else{
            const x = Math.round(g.source.r.x / S.gameW * this.mapSize);
            const y = Math.round(g.source.r.y / S.gameW * this.mapSize);
            let s = Math.round(g.source.s / S.gameW * this.mapSize);
            if (s < 2) s = 2;
    
            // if(g.source.type == 0){
            if(g.main){
                g.r = ShapeArr[g.source.shape](x - 5, y - 5, 10, S.GREE1, g.source.icon).r;
                g.r.s = 5;
            } else {
                g.r = new PIXI.Graphics();
                g.r.beginFill(g.source.color);
                g.r.drawRect(0, 0, s, s);
                g.r.endFill();
                g.r.x = x;
                g.r.y = y;
                g.r.s = s / 2;
            }
            
            this.cont2.addChild(g.r);
        }
    }
    moveView(x, y){
        this.view.x = -(x / S.gameW * this.mapSize);
        this.view.y = -(y / S.gameW * this.mapSize);
    }
    updatePos(event){
        const x = Math.round(event.data.global.x / this.scaleRatio - this.cont.x);
        const y = Math.round(event.data.global.y / this.scaleRatio - this.cont.y);
        
        this.gameCont.x = -(x * (S.gameW / this.mapSize) - this.w / 2);
        this.gameCont.y = -(y * (S.gameW / this.mapSize) - this.h / 2);
        
        if (this.gameCont.x > 0) this.gameCont.x = 0;
        if (this.gameCont.y > 0) this.gameCont.y = 0;
        if (this.gameCont.x < this.w - S.gameW) this.gameCont.x = this.w - S.gameW;
        if (this.gameCont.y < this.h - S.gameW) this.gameCont.y = this.h - S.gameW;
        
        this.moveView(this.gameCont.x, this.gameCont.y);
    }
    reset(){
        this.objects.length = 0;
        this.cont2.removeChildren();
    }
}
class DmgNumber {
    constructor(pos, value, mine) {
        const opts = {
            fontSize: 14,
            fontWeight: "600",
            fill: mine ? "#2980b9" : "#c0392b"
        };

        this.text = new PIXI.Text(value, opts);
        this.text.x = pos.x;
        this.text.y = pos.y;
        this.gameOCont.addChild(this.text);

        this.time = 10;

        this.updateArr.push(this.update.bind(this));
    }
    update(){
        this.text.y -= 5;
        this.text.alpha -= .07;
        this.time--;
        if (this.time == 0) {
            this.text.destroy();
            return true; //  update self-destroy
        }
    }
}
class PreGameO{
    constructor(x, y, s, type, enemy){
        const color = enemy ? S.REE1 : S.GREE1;
        Object.assign(this, ShapeArr[S.gameO[type].shape](x, y, s, color, S.gameO[type].icon));

        this.healthBar = new HealthBar(this.enemy ? S.COLOR_HP_ENEMY : this.owner == "default" ? S.COLOR_BLUE : S.COLOR_HP, s).r;
        this.r.addChild(this.healthBar);
        this.barWidth = this.healthBar.width;
        this.healthBar.width = 0;
        this.spawnDelay = S.delay(S.gameO[type].spawnDelay);
        this.counter = 0;
        this.intr = setInterval(() => {
            this.counter += this.spawnDelay;
            this.healthBar.width = this.barWidth / 100 * this.counter;
            if(this.counter > 100){
                clearInterval(this.intr);
                this.r.destroy();
            }
        }, S.fpsToMs);
    }

    ref(){
        return {
            r: this.r,
            s: this.s
        }
    }
}
class Projectile{
    constructor(owner, start, target, dmg){
        // const sq = new Square(start.x - 5, start.y - 5, 10, S.COLOR_RED);
        // sq.r.pivot = {
        //     x: 5,
        //     y: 5
        // }
        // sq.r.rotation = Math.random() * Math.PI * 2;

        const sq = new BaseCircle(start.x - 5, start.y - 5, 10, S.COLOR_RED);

        Object.assign(this, sq);
        this.target = target;
        this.owner = owner;

        this.speed = 15; // 15
        this.dmg = dmg;
    }
    update(i){
        if(this.target.destroyed || this.target.clientDead || !this.move()){
            this.r.destroy();

            return true;
        }
    }
    move(){
        const work = {
            x: this.r.x,
            y: this.r.y
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
        this.r.x -= work.x;
        this.r.y -= work.y;

        if(this.r.x == target.x && this.r.y == target.y){
            const a = this.target.dmg(this.dmg);
            this.resolveDmg(a, this.owner);
            
            return false;
        }

        return true;
    }
}
class RoomSel extends Panel{
    constructor(w, h, renderer, scaleRes){
        const a = 700 - 98 - 16;
        const b = 285 - 55 - 16;
        const x = (w / 2) - (a / 2);
        const y = (h / 2) - (b / 2) - 130
        super(x, y, a, b);

        this.buttArr = [];
        
        for(let j = 0; j < 2; j++){
            for(let i = 0; i < 5; i++){
                this.buttArr.push(new Rectangle(i * 98 + i * 16 + 16, 70 + j * 55 + j * 16, 55, 98, S.BLU4, false, true))
            }
        }

        this.opts = Object.assign({}, S.opts);
        this.opts.fontSize = 15;
        this.opts.fontWeight = 700;

        this.opts1 = Object.assign({}, S.opts);
        this.opts1.fontSize = 15;
        
        this.opts2 = Object.assign({}, S.opts);
        this.opts2.fontSize = 18;

        for(const butt of this.buttArr)
            this.cont.addChild(butt.r);

        for(const b in this.buttArr){
            this.buttArr[b].r.addChild(...this.buttFilling(S.TXTe_ROOM + (parseInt(b) + 1), S.TXTe_OFFLINE));
            this.buttArr[b].r.alpha = .4;
        }

        const name = new PIXI.Text(S.TXTe_NAME, this.opts2);
        name.x = (a / 2) - (name.width / 2);
        name.y = 8;
        this.cont.addChild(name);

        this.selControll = "keys";

        this.inp = document.getElementById("nameInput");
        this.inp.style.display = "block";
        this.inp.style.top = (this.y - 38) * scaleRes + "px";
        this.inp.style.left = (renderer.width / S.resolution / 2) - this.inp.clientWidth / 2 + "px";
    }
    buttFilling(t1, t2){
        const text = new PIXI.Text(t1, this.opts);
        text.x = 8;
        text.y = 5;

        const text1 = new PIXI.Text(t2, this.opts1);
        text1.x = 8;
        text1.y = 30;

        return [text, text1];
    }
    rooms(roomData){
        for(const b in this.buttArr){
            this.buttArr[b].r.removeChildren();
            if(roomData[b]){
                if(roomData[b].conn){
                    this.buttArr[b].r.addChild(...this.buttFilling(S.TXTe_ROOM + (parseInt(b) + 1), S.TXTe_PLAYERS + roomData[b].players));            
                    this.buttArr[b].r.interactive = true;
                    this.buttArr[b].r.alpha = 1;
                    this.buttArr[b].r.buttonMode = true;
                } else {
                    this.buttArr[b].r.addChild(...this.buttFilling(S.TXTe_ROOM + (parseInt(b) + 1), S.TXTe_FULL));            
                    this.buttArr[b].r.alpha = .4;
                    this.buttArr[b].r.interactive = false;
                }
            } else {
                this.buttArr[b].r.addChild(...this.buttFilling(S.TXTe_ROOM + (parseInt(b) + 1), S.TXTe_OFFLINE));
                this.buttArr[b].r.alpha = .4;
                this.buttArr[b].r.interactive = false;
            }
        }
    }
    off(){
        for(const butt of this.buttArr){
            butt.r.interactive = false;
            butt.r.alpha = .4;
        }
    }
}
class ChangeRoom extends Panel{
    constructor(w, h, f){
        super(w - 131 - 16, 32, 131, 30);
        this.box.r.alpha = .8;

        const opts = Object.assign({}, S.opts);
        opts.fontWeight = 600;

        const text = new PIXI.Text(S.TXTe_CH_ROOM, opts);
        text.x = 16;
        text.y = 7;

        this.cont.interactive = true;
        this.cont.buttonMode = true;  
        this.cont.on("click", f);

        this.cont.addChild(text);
    }
}
class Fps{
    constructor(w, h, smoothie){
        this.cont = new PIXI.Container();
        this.cont.x = 16;
        this.cont.y = 50;
        this.smoothie = smoothie;

        // const opts = {
        //     fontSize: 14,
        //     fontWeight: "600",
        //     fill: "#17b900",
        //     fontFamily: "\"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif"
        // }

        const opts = Object.assign({}, S.opts);
        opts.fontWeight = 600;

        this.text = new PIXI.Text("", opts);

        this.cont.addChild(this.text);

        this.intr = setInterval(() => {
            this.text.text = Math.round(1000 / this.smoothie.elapsed)
        }, 500);
    }
}
class BottomBar extends Panel{
    constructor(w, h){
        const a = 700;
        const b = 32;
        const x =(w / 2) - (a / 2);
        const y = h - b;
        super(x, y, a, b);

        const opts = Object.assign({}, S.opts)
        opts.fontSize = 16

        const text = new PIXI.Text(S.TXTe_HELP_INFO, opts);
        text.x = 16;
        text.y = 6;
        text.interactive = true;
        text.buttonMode = true

        // const text2 = new PIXI.Text("Titotu .io Games", opts);
        // text2.x = a - text2.width - 16;
        // text2.y = 6;
        // text2.interactive = true;
        // text2.buttonMode = true

        // const text3 = new PIXI.Text("BroGames.Space", opts);
        // text3.x = a - text3.width - text2.width - 2 * 16;
        // text3.y = 6;
        // text3.interactive = true;
        // text3.buttonMode = true
        
        const text4 = new PIXI.Text(S.TXTe_MORE_IO, opts);
        text4.x = a - text4.width - 16;
        text4.y = 6;
        text4.interactive = true;
        text4.buttonMode = true

        const text5 = new PIXI.Text(S.TXTe_DISCORD, opts);
        text5.x = 16 + text.width + 16;
        text5.y = 6;
        text5.interactive = true;
        text5.buttonMode = true

        // this.cont.addChild(text, text2, text3);
        this.cont.addChild(text, text4, text5);

        text.on("click", () => window.open(location + 'helpPage.html', '_blank'));
        // text2.on("click", () => window.open('http://titotu.io', '_blank'));
        // text3.on("click", () => window.open('http://brogames.space', '_blank'));
        text4.on("click", () => window.open('https://iogames.space/', '_blank'));
        text5.on("click", () => window.open('https://discord.gg/vyZynqZ', '_blank'));
    }
}
class Message extends Panel{
    /**
     * Text je 40px tak s tím počítej
     * 
     * @param {*} selfHide za ms se destroyne
     */
    constructor(w, h, text, bar, selfHide){
        // const opts = {
        //     fontSize: 40,
        //     fill: S.FONT_COLOR,
        //     fontFamily: "\"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif"
        // }

        const opts = Object.assign({}, S.opts);
        opts.fontSize = 40;

        const textt = new PIXI.Text(text, opts);
        textt.x = 16;
        textt.y = 16;

        const a = textt.width + 2 * 16;
        const b = textt.height + 2 * 16;
        const x = (w / 2) - (a / 2);
        const y = (h / 2) - (b / 2);
        super(x, y, a, b);
        
        this.cont.addChild(textt);
        
        if(bar){
            this.bar = new Rectangle(0, b + 5, 5, a, S.COLOR_GREEN).r;
            this.barWidth = this.bar.width;
            this.bar.width = 0;
            this.cont.addChild(this.bar);
        }

        if(selfHide){
            setTimeout(() => {
                this.cont.destroy();
            }, selfHide);
        }

    }
    setBar(percent){
        this.bar.width = this.barWidth / 100 * percent;
    }
}
class Hint extends Panel{
    /**
     * @param {*} x pozice nápovědy
     * @param {*} y pozice nápovědy
     * @param {*} target worldTransform cíle
     * @param {*} scale scaleRatio
     * @param {*} head nadpis
     * @param {*} text text nápovědy
     */
    constructor(x, y, target, scale, head, text){
        const a = 200;
        const b = 100;
        super(x, y, a, b);

        let {tx: c, ty: d} = target;
        c /= scale;
        d /= scale;

        const p = new PIXI.Graphics();
        p.lineStyle(5, S.COLOR_FONT, 1);
        p.moveTo(a / 2, b / 2);
        const xx = c - x;
        const yy = d - y;
        p.lineTo(xx, yy);

        const o = new BaseCircle(xx - 7, yy - 7, 15, S.COLOR_BLUE);

        const opts = Object.assign({}, S.opts)
        opts.fontSize = 20

        const t = new PIXI.Text(head, opts);
        t.x = a / 2 - t.width / 2;
        t.y = 8;

        const opts1 = Object.assign({}, S.opts)
        opts1.fontSize = 15
        opts1.wordWrap = true
        opts1.wordWrapWidth = a - 10

        const t1 = new PIXI.Text(text, opts1);
        t1.x = 8;
        t1.y = t.height + 8;

        const opts2 = Object.assign({}, S.opts)
        opts2.fontSize = 10
        
        const t2 = new PIXI.Text(S.TXTe_CLICK_HIDE, opts2);
        t2.x = a / 2 - t2.width / 2;
        t2.y = b - t2.height - 8;
        
        this.cont.addChildAt(p, 0);
        this.cont.addChild(o.r, t, t1, t2);

        this.cont.interactive = true;
        this.cont.buttonMode = true;

        this.promise = new Promise(res => {
            this.cont.on("pointertap", () => {
                this.cont.destroy();
                res();
            });
        })
    }
}
class GameName {
    constructor(w, h, text){
        const opts = Object.assign({}, S.opts);
        opts.fontSize = 70;

        this.cont = new PIXI.Text(text, opts);
        this.cont.x = w / 2 - this.cont.width / 2;
        this.cont.y = 18
    }
}
class Particulator{
    /**
     * @param {*} x x
     * @param {*} y y
     * @param {*} r poloměr úmrtí
     * @param {*} s rychlost 
     * @param {*} g gameO u kterýho je
     */
    constructor(x, y, r, s, g){
        this.r = new PIXI.particles.ParticleContainer(100, {
            rotation: true,
            tint: true
        })

        this.r.x = x
        this.r.y = y
        this.radius = r;
        this.speed = s;
        this.texture = g.prt;
        this.g = g;

        this.count = 0;
        this.treshold = 6;
    }
    update(){
        for(const s of this.r.children){
            if(s.ne) continue

            s.x += s.vvx;
            s.y += s.vvy;

            s.alpha -= 1 / (this.radius / this.speed)

            if(s.alpha <= 0){
                s.alpha = 0
                s.ne = true

                setTimeout(() => {
                    this.r.removeChild(s);
                    // s.destroy(true, true, true)
                }, 0)
                
            }
        }

        // this.makeOne()
        
        if(this.count > this.treshold){
            this.makeOne()
            this.count = 0;
        }

        this.count++;

        if(this.g.clientDead)
            return true;
    }

    makeOne(){
        const sprite = new PIXI.Sprite.from(this.texture);
        
        sprite.x = 0;
        sprite.y = 0;
        const size = Math.floor((Math.random() * 15) + 5);
        sprite.width = size
        sprite.height = size
        sprite.angle = Math.random() * Math.PI * 2;
        sprite.rotation = sprite.angle

        sprite.vvx = Math.sin(sprite.angle) * this.speed;
        sprite.vvy = Math.cos(sprite.angle) * this.speed;

        this.r.addChild(sprite);
    }
}
class TextPanel extends Panel{
    /**
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} a (wrap)
     * @param {*} b (wrap)
     * @param {*} fSize 
     * @param {*} text 
     * @param {*} color 
     * @param {*} fColor 
     */
    constructor(x, y, a, b, fSize, text, color, fColor){
        const aa = a == "wrap" ? 1 : a;
        const bb = b == "wrap" ? 1 : b;
        super(x, y, aa, bb, color)

        const opts = Object.assign({}, S.opts);
        opts.fontSize = fSize || 15;
        opts.wordWrap = true;
        opts.wordWrapWidth = a - 16;
        if(fColor) opts.fill = fColor;

        const t = new PIXI.Text(text, opts)
        t.x = 16
        t.y = 8

        if(a == "wrap"){
            this.box.r.width = t.width + 32;
        }
        if(b == "wrap"){
            this.box.r.height = t.height + 16;
        }

        this.cont.addChild(t);
    }
}
class HintAdvanced{
    constructor(w, h){
        this.cont = new PIXI.Container();
        
        this.hintButt = new TextPanel(0, 0, "wrap", "wrap", 18, "?");
        this.hintButt.cont.interactive = true;
        this.hintButt.cont.buttonMode = true;
        this.hintButt.cont.on("mouseover", () => {
            this.main.cont.visible = true;
            this.subButt.cont.visible = true;
        });
        this.hintButt.box.r.alpha = .8;
        
        this.cont.x = w - this.hintButt.cont.width - 16;
        this.cont.y = 30 + 16 + 32;
        
        this.main = new TextPanel(0, 0, "wrap", "wrap", 15, S.TXTe_HELP_TEXT);
        this.main.cont.interactive = true;
        this.main.cont.buttonMode = true;
        this.main.cont.on("mouseout", () => {
            this.main.cont.visible = false;
            this.subButt.cont.visible = false;
        });
        this.main.cont.x = - this.main.cont.width + this.hintButt.cont.width;
        this.main.cont.y = 0;
        this.main.cont.visible = false;
        this.main.box.r.alpha = .8;

        this.subButt = new TextPanel(0, 0, "wrap","wrap", 14, S.TXTe_SUBMIT, S.BLU4);
        this.subButt.cont.x = 180;
        this.subButt.cont.y = 138;

        this.subButt.cont.visible = false;
        this.subButt.cont.interactive = true;
        this.subButt.cont.buttonMode = true;
        this.subButt.cont.on("mousedown", () => window.open("https://docs.google.com/forms/d/e/1FAIpQLSdCu-ogJAqdclxzEM010N6_NiHfnCuB_h8vtfT-wJkAKo7bUg/viewform", '_blank'));
        this.main.cont.addChild(this.subButt.cont);
        
        this.cont.addChild(this.hintButt.cont, this.main.cont);
    }
}
class LowFps extends Panel{
    constructor(){
        super(16, 70, 200, 100);
        // this.cont = new PIXI.Container();
        // this.cont.x = 16;
        // this.cont.y = 70;

        this.text = new TextPanel(25, 0, "wrap", "wrap", 28, S.TXTe_LOW_FPS);
        
        this.butt = new TextPanel(20, 55, "wrap","wrap", 14, S.TXTe_HELP, S.BLU4);
        this.butt.cont.interactive = true;
        this.butt.cont.buttonMode = true;
        this.butt.cont.on("mousedown", () => {
            // window.open(location + 'helpPage.html', '_blank');
            window.location.href = "helpPage.html";
            this.cont.destroy();
        });

        this.canc = new TextPanel(100, 55, "wrap","wrap", 14, S.TXTe_CANCEL, S.BLU4);
        this.canc.cont.interactive = true;
        this.canc.cont.buttonMode = true;
        this.canc.cont.on("mousedown", () => this.cont.destroy());

        this.cont.addChild(this.text.cont, this.butt.cont, this.canc.cont);
    }
}
class EmitWatcher {
    constructor(uiCont){
        /**
         * object emit typů, obsahuje pole
         */
        this.emits = {};
        this.uiCont = uiCont;

        this.text = new TextPanel(16, 206, "wrap", "wrap", 15, S.TXTe_LAG);
        this.text.box.r.alpha = .8;
        this.text.cont.visible = false;

        this.icon = new BaseCircle1(16, 150, 40, false, "ic30").r;
        this.icon.visible = false;
        this.icon.interactive = true;
        this.icon.buttonMode = true;
        this.icon.on("mouseover", () => {
            this.text.cont.visible = true;
        });
        this.icon.on("mouseout", () => {
            this.text.cont.visible = false;
        });

        this.uiCont.addChild(this.text.cont, this.icon);
        this.update = this.update.bind(this);
    }
    /**
     * @param {String} type zaregistruje emit type
     */
    registerEmit(type){
        this.emits[type] = [];
    }
    /**
     * přidá emit s novým id ke sledování
     * @param {String} type typ emitu
     * @param {Boolean} wait počká na start(), jenom vrátí id
     * @returns {Number} id eventu tohohle typu
     */
    watch(type, wait = false, f = null){
        // console.log("watch", type);

        if(wait){
            return this.emits[type].push({
                time: Infinity,
                f
            }) - 1;
        } else {
            return this.emits[type].push({
                time: Date.now(),
                f
            }) - 1;
        }
    }
    /**
     * 
     * @param {*} type typ emitu
     * @param {*} id id tvl co by to asi bylo kurwa
     */
    start(type, id){
        // console.log("start", id);

        if(this.emits[type][id] !== null) // server se udělal dřív
            this.emits[type][id].time = Date.now();
    }
    /**
     * 
     * @param {*} type typ emitu
     * @param {*} id id emitu kterej se vrátil
     */
    done(type, id){
        // console.log("done", id);

        this.emits[type][id] && this.emits[type][id].f && this.emits[type][id].f();
        this.emits[type][id] = null;
    }
    /**
     * resetuje watch u všech emit typů
     */
    reset(){
        for(const type in this.emits){
            this.emits[type] = [];
        }
    }
    /**
     * update funkce
     */
    update(){
        this._update();
    }
    _update(){
        for(const type in this.emits){ // object
            for(let i = 0; i < this.emits[type].length; i++){
                if(this.emits[type][i] && Date.now() - this.emits[type][i].time > S.responseDelay){ // je tam moc dlouho
    
                    if(!this.icon.visible){
                        this.show();

                        return;
                    } else return;
    
                }
            }
        }
    
        if(this.icon.visible){
            this.hide();
        }
    }
    show(){
        this.icon.visible = true;
    }
    hide(){
        this.icon.visible = false;
        this.text.cont.visible = false;
    }
}
class Calculating extends Panel{
    constructor(pos){
        const size = {a: 116, b: 50};
        super(pos.x - size.a / 2, pos.y - size.b / 2, size.a, size.b, false, 10);
        this.box.r.alpha = .8;

        const opts = Object.assign({}, S.opts);
        opts.fontSize = 16;

        const text = new PIXI.Text(S.TXTe_CALC, opts);
        text.x = 8;
        text.y = 16;

        this.cont.alpha = 0;
        this.cont.addChild(text);
        
        setTimeout(() => {
            this.cont.alpha = 1;
        }, 200);
    }
}

const ShapeArr = [];
ShapeArr[0] = function () {
    return new Square(...arguments)
}
ShapeArr[1] = function () {
    return new BaseCircle(...arguments)
}
ShapeArr[2] = function () {
    return new Square1(...arguments)
}
ShapeArr[3] = function () {
    return new BaseCircle1(...arguments)
}

class TheGame {
    constructor() {
        PIXI.utils.skipHello();

        if(window.location.hash != "#mobile" && PIXI.utils.isMobile.any){
            // window.open(location + 'mobilePage.html', '_blank')

            window.location.href = 'mobilePage.html';

            return;
        }

        this.renderer = new PIXI.WebGLRenderer({
            antialias: true,
            resolution: S.resolution,
            powerPreference: "high-performance",
            roundPixels: true
        })
        this.renderer.view.style.position = "absolute";
        this.renderer.view.style.display = "block";
        this.renderer.view.style.zIndex = 1;
        this.renderer.autoResize = true;
        this.renderer.resize(window.innerWidth, window.innerHeight);
        this.renderer.plugins.interaction.moveWhenInside = true;
        document.body.appendChild(this.renderer.view);

        this.antCont = new PIXI.Container();
        this.gameOCont = new PIXI.Container();
        this.dragSelectCont = new PIXI.Container();

        this.backGround = new PIXI.Container();
        this.backGround.interactive = true;
        this.backGround.on("rightclick", () => {
            this.target = this.shiftedPointerPos();
            this.gameCont.addChild(new FadingBullshit(this.target.x, this.target.y).r);
        })
        this.backGround.on("click", () => {
            this.showOptions();
            this.bckF && this.bckF();
        });
        this.backGround.on("mousedown", () => {
            this.mouseDown = true;
        });
        this.backGround.on("mouseup", () => {
            this.mouseDown = false;
        });
        this.mouseDown = false;

        this.supremeCont = new PIXI.Container();
        this.uiCont = new PIXI.Container();
        this.gameCont = new PIXI.Container();

        this.gameCont.vx = this.gameCont.vy = 0;
        this.gameCont.addChild(this.backGround, this.gameOCont, this.antCont, this.dragSelectCont);

        const aspectRatio = this.renderer.width / this.renderer.height;
        if (aspectRatio > 1) this.scaleRatio = this.renderer.height / S.visibleArea;
        else this.scaleRatio = this.renderer.width / S.visibleArea;
        /**
         * hlavní container pro hru
         */
        this.gameStage = new PIXI.Container();
        this.gameStage.addChild(this.gameCont, this.uiCont, this.supremeCont);
        /**
         * hlavní container pro room select screen
         */
        this.roomSelStage = new PIXI.Container();
        /**
         * hlavní container
         */
        this.mainStage = new PIXI.Container();
        this.mainStage.scale.set(this.scaleRatio, this.scaleRatio);

        this.scaleRatioRes = this.scaleRatio * S.resolution;
        this.borderW = this.renderer.width / this.scaleRatioRes;
        this.borderH = this.renderer.height / this.scaleRatioRes;
        this.loadScreen();
        
        this.smoothie = new Smoothie({
            engine: PIXI,
            renderer: this.renderer,
            root: this.mainStage,
            update: this.update.bind(this),
            fastupdate: this.fastupdate.bind(this),
            fps: S.fps,
            properties: {
                position: true, 
                rotation: false, 
                alpha: false, 
                scale: false, 
                size: false,
                tile: false
            }
        })
        this.smoothie.start();
        
        this.t = new MujTink(PIXI, this.renderer.view);
        this.mainPointer = this.t.makePointer();
        this.mainPointer.scale = this.scaleRatio;

        this.pixiPointer = this.renderer.plugins.interaction.mouse.global;
        this.roomSelectData = {};

        const promArr = [
            new Promise((jo) => {
                const conn = () => {
                    this.socket = io({
                        path: "/s1", 
                        transports: ['websocket'],
                        parser: JSONParser
                    });

                    const intr = setInterval(() => {
                        clearInterval(intr);
                        this.socket.close();
                        console.log("new conn try");
                        
                        conn();
                    }, 3000);
    
                    this.socket.on("connect", () => {
                        clearInterval(intr);
                        jo();
                    });
                }

                conn();

            }),
            new Promise((jo) => {
                S.importList.forEach(a => PIXI.loader.add(a.name, a.dir));
                let progress = 0;
                PIXI.loader.onProgress.add(() => {
                    progress++;
                    const percent = progress / S.importList.length * 100;
                    this.mainStage.loading.setBar(percent);
                })
                PIXI.loader.load((loader, resources) => {
                    jo()
                })
            })
        ]
        Promise.all(promArr).then(() => {
            // new Promise((jo) => {
            //     this.initMainScreen();
            //     this.setIo();
            //     jo();
            // }).then(() => {
            //     this.inp.value = this.socket.id.substr(5, 8) || "";
            // });
            
            this.initMainScreen();
            this.setIo();
        });

        this.worker = new Worker("public/worker.js");

        this.keyF = {
            e: () => {
                // this.runtimeToggle()
            },
            r: () => {
                // if(this.gameState == "game")
                //     for (let i = 0; i < 10; i++) {
                //         // const reqId = this.emitWatcher.watch("requestAnt");
                //         this.socket.emit("requestAnt", {
                //             x: 200,
                //             y: 500,
                //             type: 10
                //         })
                //     }
            },
            t: () => {
            },
            z: () => {
                //this.uiCont.renderable = !this.uiCont.renderable;
            },
            space: () => {
                //this.collide = !this.collide;
            },

            left: () => this.gameCont.left = true,
            up: () => this.gameCont.up = true,
            right: () => this.gameCont.right = true,
            down: () => this.gameCont.down = true,

            unLeft: () => this.gameCont.left = false,
            unUp: () => this.gameCont.up = false,
            unRight: () => this.gameCont.right = false,
            unDown: () => this.gameCont.down = false
        }

        this.keys = [
            this.t.keyboard(32 /* space */ ).setPress(this.keyF.space),
            this.t.keyboard(69 /* e */ ).setPress(this.keyF.e),
            this.t.keyboard(82 /* r */ ).setPress(this.keyF.r),
            this.t.keyboard(84 /* t */ ).setPress(this.keyF.t),
            this.t.keyboard(90 /* z */ ).setPress(this.keyF.z),
            
            this.t.keyboard(37 /* left */ ).setPress(this.keyF.left),
            this.t.keyboard(38 /* up */ ).setPress(this.keyF.up),
            this.t.keyboard(39 /* right */ ).setPress(this.keyF.right),
            this.t.keyboard(40 /* down */ ).setPress(this.keyF.down),
            this.t.keyboard(37 /* left */ ).setRelease(this.keyF.unLeft),
            this.t.keyboard(38 /* up */ ).setRelease(this.keyF.unUp),
            this.t.keyboard(39 /* right */ ).setRelease(this.keyF.unRight),
            this.t.keyboard(40 /* down */ ).setRelease(this.keyF.unDown),
            
            this.t.keyboard(65 /* a */ ).setPress(this.keyF.left),
            this.t.keyboard(87 /* w */ ).setPress(this.keyF.up),
            this.t.keyboard(68 /* d */ ).setPress(this.keyF.right),
            this.t.keyboard(83 /* s */ ).setPress(this.keyF.down),
            this.t.keyboard(65 /* left */ ).setRelease(this.keyF.unLeft),
            this.t.keyboard(87 /* up */ ).setRelease(this.keyF.unUp),
            this.t.keyboard(68 /* right */ ).setRelease(this.keyF.unRight),
            this.t.keyboard(83 /* down */ ).setRelease(this.keyF.unDown)
        ]

        window.addEventListener('resize', this.resize.bind(this));

        this.inp = document.getElementById("nameInput");
        this.inp.addEventListener("focus", () => this.toggleKeys(false));
        this.inp.addEventListener("focusout", () => this.toggleKeys(true));
        this.inp.hide = () => {
            this.inp.style.display = "none";
            this.inp.blur();
        }
        this.textBox = document.getElementById("txtR");
        this.textBox1 = document.getElementById("txtR1");

        this.userLang = navigator.language || navigator.userLanguage;
        console.log(this.userLang);

        this.adPlayed = false;

        window.onfocus = () => {
            if(this.gameState == "roomSelect"){
                this.smoothie.paused = false;
            }
        }
        window.onblur = () => {
            if(this.gameState == "roomSelect"){
                this.smoothie.paused = true;
            }
        }
    }
    initGame(){
        this.listen = false;
        this.target = null;
        this.dragStart = null;
        this.gameCont.vx = this.gameCont.vy = 0;
        this.gameCont.x = - S.gameW / 2 + this.borderW / 2;
        this.gameCont.y = - S.gameW / 2 + this.borderH / 2;
        this.onlyMain = true;
        this.clearPointer();
        
        if(this.gameInit){
            this.antCont.removeChildren();
            this.gameOCont.removeChildren();
            this.uiCont.removeChildren();
            this.supremeCont.removeChildren();
            this.dragSelectCont.removeChildren();
            
            this.antArr.length = 0;
            this.gameOArr.length = 0;
            this.updateArr.length = 0;
            this.preArr.length = 0;

            this.uiObj.spriteArr.length = 0;
            this.uiObj.objArr.length = 0;
            this.uiObj.map.reset();
            this.emitWatcher.reset();
            
            Object.assign(this.stats, S.stats);
            Object.assign(this.baseSet, S.baseSet);
            Object.assign(this.upgraded, S.upgraded);

            // this.bckF = null;
        } else {
            this.stats = Object.assign({}, S.stats);
            this.baseSet = Object.assign({}, S.baseSet);
            this.upgraded = Object.assign({}, S.upgraded);

            // console.log(this.upgraded);

            this.listen = false;
            this.target = null;
            this.dragStart = null;
            this.prevShape = null;
            this.antArr = [];
            this.gameOArr = [];
            this.updateArr = [];
            this.preArr = [];
            this.uiObj = {
                spriteArr: [],
                objArr: [],
                map: new UIMap(this.borderW, this.borderH, this.gameCont, this.scaleRatio, this.mainPointer),
                statBar: new UIStats([
                    [S.TXT_7, "ic22", this.stats, "gold"],
                    [S.TXT_4, "ic21", this.stats, "item0"],
                    [S.TXT_5, "ic23", this.stats, "item1"],
                    [S.TXTe_UNIT, "ic24", this.stats, "ants", this.baseSet, "maxAnt"]
                ]),
                chRoom: new ChangeRoom(this.borderW, this.borderH, () => this.chRoom()),
                fps: new Fps(this.borderW, this.borderH, this.smoothie),
                hintAdv: new HintAdvanced(this.borderW, this.borderH)
            }
            this.uiObj.map.moveView(this.gameCont.x, this.gameCont.y);
            this.updateArr.push(this.emitWatcher.update);
            
            Ant.prototype.getCoor = (target) => this.getCoor(target);
            DmgNumber.prototype.gameOCont = this.antCont;
            DmgNumber.prototype.updateArr = this.updateArr;
            GameO.prototype.gameOCont = this.gameOCont;
            GameO.prototype.updateArr = this.updateArr;
            Projectile.prototype.resolveDmg = (a, owner) => this.resolveDmg(a, owner);
    
            this.mapInit();
    
            this.worker.postMessage({
                gameW: S.gameW,
                attackRadius: S.attackRadius,
                gameORadius: S.gameORadius
            })
            this.worker.onmessage = this.afterColide.bind(this);
        }

        this.uiCont.renderable = true;
        this.uiCont.addChild(
            this.uiObj.statBar.cont, 
            this.uiObj.map.cont, 
            this.uiObj.chRoom.cont, 
            this.uiObj.fps.cont,
            this.uiObj.hintAdv.cont
        )

        this.showOptions()

        if(this.roomSel.selControll == "cursor")
            this.pointerLock();
        
        this.inp.hide();
        this.textBox.style.display = "none";
        this.textBox1.style.display = "none";

        this.name = this.inp.value;
        // stage pro hru
        this.mainStage.removeChildren();
        this.mainStage.addChild(this.gameStage);
        // updaty pro gameStage
        this.stateUpdate = this.gameUpdate;
        this.fastGameState = this.gameFastUpdate;
        this.gameState = "game";
        
        this.collide = true;
        this.gameInit = true;

        this.smoothie.waitOnNewFrame = () => {
            this.showHintGame();
        }

        this.adToggle(false);

        this.fpsWatch();
    }
    initMainScreen(re){
        this.renderer.view.onclick = () => {};
        this.collide = false;

        this.roomSelStage.removeChildren();
        const r = new Rectangle(0, 0, this.borderH, this.borderW, S.BLU1, false, false).r;
        const grid = this.grider(this.borderW, this.borderH, S.gridRess);
        this.roomSelStage.addChild(r, grid);
        
        // gameO resources sprites
        this.mainScreenUpdateArr = [];
        for(let i = 0; i < 20; i++){
            const x = Math.floor(Math.random() * this.borderW);
            const y = Math.floor(Math.random() * this.borderH);
            const type = Math.floor((Math.random() * 3) + 1);
            
            const g = new BaseCircle1(x, y, 70, false, "lp" + type);

            const p = new Particulator(g.s / 2, g.s / 2, g.s / 2 + 14, 5, {prt: "prt" + type});
            this.mainScreenUpdateArr.push(p.update.bind(p));
            g.r.addChildAt(p.r, 0);
            
            this.roomSelStage.addChild(g.r);
        }
        
        const motd = new BottomBar(this.borderW, this.borderH);
        const gameName = new GameName(this.borderW, this.borderH, S.GM);
        const beta = new TextPanel(50, 50, "wrap", "wrap", 35, "BETA", S.COLOR_YELLOW, "#212121");
        
        this.roomSel = new RoomSel(this.borderW, this.borderH, this.renderer, this.scaleRatioRes);
        for(const b in this.roomSel.buttArr){
            this.roomSel.buttArr[b].r.interactive = true;
            this.roomSel.buttArr[b].r.alpha = 1;

            this.roomSel.buttArr[b].r.on("click", () => {
                this.roomSelStage.loading = new Message(this.borderW, this.borderH, S.TXTe_LOADING);
                this.roomSelStage.addChild(this.roomSelStage.loading.cont);
                this.socket.emit("roomSelect", {room: b, name: this.inp.value});
                this.saveName(this.inp.value);

                this.roomSel.off();
            })
        }
        this.roomSelStage.addChild(motd.cont, gameName.cont, this.roomSel.cont, beta.cont);

        if(S.motd){
            const a = 600;
            const b = "wrap";
            const x = this.borderW / 2 - a / 2;
            const y = this.roomSel.y + this.roomSel.b + 16;
            const motd = new TextPanel(x, y, a, b, false, S.motd);
            this.roomSelStage.addChild(motd.cont);
        }

        this.roomSelStage.interactive = true;
        this.roomSelStage.on("click", () => {
            this.inp.blur();
        })
        this.textBox.style.display = "block";
        this.textBox1.style.display = "block";

        if(!re){ // resize
            this.mainStage.removeChildren();
            this.mainStage.addChild(this.roomSelStage);
    
            // updaty pro roomSelStage
            this.stateUpdate = this.mainScreenUpdate;
            this.fastGameState = this.mainScreenFastUpdate;
            this.gameState = "roomSelect";
    
            this.showHintRoomSel();

            this.smoothie.paused = false;
            this.socket.emit("ready");

            // this.adToggle(true);
            document.getElementById("anthill-io-eu_728x90").style.display = "block";
            document.getElementById("anthill-io-eu_300x250").style.display = "block";

            // console.log(window);
            // console.log(document);
            // console.log(document.referrer);
            // console.log(document.location.ancestorOrigins);
            // console.log(document.location.ancestorOrigins[0]);

            if(document.location.ancestorOrigins && document.location.ancestorOrigins.length != 0){
                if(document.location.ancestorOrigins[0].includes("titotu") || document.location.ancestorOrigins[0].includes("iogames")){
                    this.mainPointer.press = () => {
                        const w = window.open("https://anthill-io.eu", "_blank");

                        if(w){
                            this.runtimeToggle();
    
                            this.mainPointer.press = null;
                        }
                    }
                }
            }
            if(document.referrer.includes("iogames")){
                this.mainPointer.press = () => {
                    const w = window.open("https://anthill-io.eu", "_blank");

                    if(w){
                        this.runtimeToggle();

                        this.mainPointer.press = null;
                    }
                }
            }
        }

        // setTimeout(() => {
        //     this.runtimeToggle();
            
        // }, 500);
    }

    // normální updaty -->
    update(){
        this.stateUpdate && this.stateUpdate();
    }
    gameUpdate() {
        this.pointerCollider();
        
        // this.smartRender();
        if (this.collide) this.workerCollide();

        if (this.target !== null) {
            const reqArr = [];
            for (const ant of this.antArr) {
                if (ant.listen && !ant.enemy) {
                    if (ant.canTarget(this.target)) {
                        ant.timeOut();
                        reqArr.push(ant.id);
                    }
                }
            }
            if(reqArr.length != 0){
                const a = new Calculating(this.shiftedPointerPos());
                // this.gameCont.addChild(a.cont);
                this.uiCont.addChild(a.cont);
                const reqId = this.emitWatcher.watch("multiMoveRequest", true, () => a.cont.destroy());
                this.socket.emit("multiMoveRequest", {reqArr, target: this.target, reqId});
            }
            this.target = null;
        }
        
        for(const ant of this.antArr){
            ant.update()
        }

        for(let i = 0; i < this.updateArr.length; i++){
            if(this.updateArr[i](i)){ // self-delete
                PIXI.utils.removeItems(this.updateArr, i, 1)
                i--;
            }
        }

    }
    mainScreenUpdate(){
        if(this.roomSelectData.new){
            this.roomSel.rooms(this.roomSelectData.data);
            this.roomSelectData.new = false;
        }

        for(let i = 0; i < this.mainScreenUpdateArr.length; i++){
            if(this.mainScreenUpdateArr[i](i)){ // self-delete
                // this.mainScreenUpdateArr.splice(i, 1);
                PIXI.utils.removeItems(this.mainScreenUpdateArr, i ,1)
                i--;
            }
        }
    }
    // <-- normální updaty
    // fast updaty -->
    fastupdate(){
        this.fastGameState && this.fastGameState();
    }
    gameFastUpdate() {
        if (this.mouseDown) this.dragSelectUpdate();
        if (this.prevShape) this.gameOPrevUpd();

        if(this.mainPointer.lock){
            // držení cursoru ve hře
            let x = this.pixiPointer.x / this.scaleRatio;
            let y = this.pixiPointer.y / this.scaleRatio;

            if (x - this.cursor.s / 2  < 0){
                this.pixiPointer.x = this.cursor.s / 2;
                x = this.pixiPointer.x / this.scaleRatio;
            }
            if (y - this.cursor.s / 2 < 0){
                this.pixiPointer.y = this.cursor.s / 2;
                y = this.pixiPointer.y / this.scaleRatio;
            } 
            if (x + this.cursor.s / 2 > this.borderW){
                this.pixiPointer.x = (this.renderer.width / S.resolution) - this.cursor.s / 2;
                x = this.pixiPointer.x / this.scaleRatio;
            } 
            if (y + this.cursor.s / 2 > this.borderH){
                this.pixiPointer.y = (this.renderer.height / S.resolution) - this.cursor.s / 2;
                y = this.pixiPointer.y / this.scaleRatio;
            }

            this.mainPointer.x = x;
            this.mainPointer.y = y;

            this.cursor.r.x = this.mainPointer.x - this.cursor.s / 2;
            this.cursor.r.y = this.mainPointer.y - this.cursor.s / 2;

        }
    }
    mainScreenFastUpdate(){
        
    }
    // <-- fast updaty

    pointerCollider(){
        if(this.mainPointer.lock){
            // border collide
            let changed = false;
            if (this.mainPointer.x - this.cursor.s < 0 || this.gameCont.left) { // doleva
                this.gameCont.vx = 60;
                changed = true;
            }
            if (this.mainPointer.y - this.cursor.s < 0 || this.gameCont.up) { // nahoru
                this.gameCont.vy = 60;
                changed = true;
            }
            if (this.mainPointer.x + this.cursor.s > this.borderW || this.gameCont.right) { // doprava
                this.gameCont.vx = -60;
                changed = true;
            }
            if (this.mainPointer.y + this.cursor.s > this.borderH || this.gameCont.down) { // dolu
                this.gameCont.vy = -60;
                changed = true;
            }
            if (!changed) {
                this.gameCont.vx = this.gameCont.vy = 0;
            }else{
                this.uiObj.map.moveView(this.gameCont.x, this.gameCont.y);
            }
        }else{ // když nemá Pointer Lock
            if (this.gameCont.left) { // doleva
                this.gameCont.vx = 60;
                this.gameCont.changed = true;
            }
            if (this.gameCont.up) { // nahoru
                this.gameCont.vy = 60;
                this.gameCont.changed = true;
            }
            if (this.gameCont.right) { // doprava
                this.gameCont.vx = -60;
                this.gameCont.changed = true;
            }
            if (this.gameCont.down) { // dolu
                this.gameCont.vy = -60;
                this.gameCont.changed = true;
            }
            if (!this.gameCont.changed) {
                this.gameCont.vx = this.gameCont.vy = 0;
            }else{
                this.gameCont.x += this.gameCont.vx;
                this.gameCont.y += this.gameCont.vy;

                if (this.gameCont.x > 0) this.gameCont.x = 0;
                if (this.gameCont.y > 0) this.gameCont.y = 0;
                if (this.gameCont.x < this.borderW - S.gameW) this.gameCont.x = this.borderW - S.gameW;
                if (this.gameCont.y < this.borderH - S.gameW) this.gameCont.y = this.borderH - S.gameW;

                this.uiObj.map.moveView(this.gameCont.x, this.gameCont.y);

                this.gameCont.vx = this.gameCont.vy = 0;
            }
            this.gameCont.changed = false;
        } 
    }
    runtimeToggle(noStart) {
        if ( !(noStart && this.smoothie.paused)) {
            this.smoothie.togglePause();
            this.collide = !this.collide;
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
    shiftedPointerPos() {
        return {
            x: Math.round(this.mainPointer.x - this.gameCont.x),
            y: Math.round(this.mainPointer.y - this.gameCont.y)
        }
    }
    unListen() {
        this.listen = false;
        this.antArr.forEach(ant => ant.listenF(false));
    }
    joListen(target) {
        this.unListen();
        const type = this.getByTargetType(target).type;
        for (let ant of this.antArr) {
            if (!ant.enemy && ant.attackSet.indexOf(type) == -1) {
                ant.listen = true;
            }
        }
        this.listen = true;
    }
    getByTargetType(target) {
        let to = false;
        switch (target.targetType) {
            case "ant":
                to = this.antArr.getById(target.id);
                break;
            case "gameO":
                to = this.gameOArr.getById(target.id);
                break;
        }
        return to;
    }
    setIo() {
        const s = this.socket;
        s.on("start", (data) => {
            // console.log("start");

            this.initGame();

            data.a.forEach((data) => {
                this.antBase(data);
            });
            data.g.forEach((gameO) => {
                this.gameObject(gameO);
            });
        });
        s.on("destroyed", (data) => {
            let to = false;
            switch (data.targetType) {
                case "ant":
                    to = this.antArr.removeByIdC(this, data.id);
                    if(to.owner == this.socket.id)
                        this.stats.ants--;
                    break;
                case "gameO":
                    to = this.gameOArr.removeByIdC(this, data.id);
                    if(to && to.owner == this.socket.id){
                        if(to.type == 0){
                            this.endGame();
                        }
                        if(to.type == 2){
                            this.baseSet.maxAnt -= to.unitValue;
                            this.baseSet.curFarm--;
                        }
                        if(to.type == 6) this.baseSet.curTower--;
                    }
                    break;
            }
            if(!to){
                console.error("destroy na neexistující to");
                return false;
            } 
            
            to.destroyed = true;
            to.hp = 0;
            if (this.uiObj.source.getTarget) { // jestli je source gameO nebo typ 100
                const a = this.uiObj.source.getTarget();
                const b = to.getTarget();
                if (a.targetType == b.targetType && a.id == b.id) 
                    this.showOptions()
            }

            // this.map.remove(to.getTarget());
        });
        s.on("onDis", (data) => {
            this.antArr.removeByOwnerC(this, data).forEach(to => to.destroyed = true);
            this.gameOArr.removeByOwnerC(this, data).forEach(to => to.destroyed = true);
        });
        s.on("newBase", (data) => {
            this.gameObject(data);
            
            // if(data.owner == this.socket.id) this.emitWatcher.done("requestGameO", data.reqId);
            // this.gameObject(data.props);
        });
        s.on("newAnt", (data) => {
            if(data.owner == this.socket.id) this.emitWatcher.done("requestAnt", data.reqId);
            
            this.antBase(data.props);
        });
        s.on("moveAnt", (data) => {
            const ant = this.antArr.getById(data.antId);
            if (ant) ant.setTarget(data);

            // console.log(data, ant);
            
            // const ant = this.antArr.getById(data.antId);
            // if(ant){
            //     ant.setTarget({
            //         target: data.target,
            //         path: data.moved[i].path
            //     })
            // }
        });
        s.on("setSpawnPoint", (data) => {
            // this.gameOArr.forEach(gameO => {
            //     if (gameO.id == data.id) {
            //         gameO.spawnPoint = data.spawnPoint;
            //     }
            // });
            const gameO = this.gameOArr.getById(data.id);
            if (gameO) gameO.spawnPoint = data.spawnPoint;
        });
        s.on("update", data => {

            // console.log(Date.now() - this.upTime);
            // this.upTime = Date.now();

            for(const ant of this.antArr){
                if (data.a[ant.id]) {
                    ant.hp = data.a[ant.id].hp;
                    ant.hpBar();
                    if(data.a[ant.id].x){
                        const vx = data.a[ant.id].x - ant.r.x;
                        const vy = data.a[ant.id].y - ant.r.y;
                        const m = Math.sqrt(vx * vx + vy * vy);
                        if(m > 40){
                            const {x, y} = data.a[ant.id];

                            if(document.hasFocus()){
                                ant.setTarget({path: [[x, y]] });
                            } else {
                                ant.updateMove(x, y);
                            }
                        }
                    }
                }
            }
            for(const gameO of this.gameOArr){
                if (data.g[gameO.id]) {
                    gameO.hp = data.g[gameO.id].hp;
                }
            }

            this.stats.item0 = data.s.item0;
            this.stats.item1 = data.s.item1;
            this.stats.gold = data.s.gold;
        });
        s.on("show", data => console.log(data));
        s.on("disconnect", data => {
            console.error("SERVER ERROR", data);
            
            if(this.gameState == "roomSelect"){
                this.roomSel.off();
            } else {
                this.uiCont.removeChildren();
                const msg = new Message(this.borderW, this.borderH, S.TXTe_GAME_RESTART);
                this.supremeCont.addChild(msg.cont);
            }
        });
        s.on("upgrade", data => {
            if(data.owner == this.socket.id) this.emitWatcher.done("upgrade", data.reqId);

            this.upgradeStats(data.data);
        });
        s.on("pre", data => {
            if(data.owner == this.socket.id) this.emitWatcher.done("requestGameO", data.reqId);

            if(data.data != false){
                const props = data.data;
                const x = props.dX * S.gridRess + S.gameOGapPx;
                const y = props.dY * S.gridRess + S.gameOGapPx;
                const s = (S.gameO[props.type].dS) * S.gridRess - 2 * S.gameOGapPx;
    
                const pre = new PreGameO(x, y, s, props.type, props.owner != this.socket.id);
                pre.r.alpha = .7;
    
                this.gameOCont.addChild(pre.r);
                this.preArr.push(pre.ref());
            }
        });
        s.on("rooms", data => {
            this.roomSelectData.data = data;
            this.roomSelectData.new = true;
        });
        s.on("moving", data => {
            this.emitWatcher.start("multiMoveRequest", data);
        });
        s.on("multiMoveAnt", data => {
            if(data.owner == this.socket.id) this.emitWatcher.done("multiMoveRequest", data.reqId);

            // console.log(data.owner, this.socket.id, data.reqId);

            for(const ant of this.antArr.getByOwner(data.owner)){
                for(let i = data.moved.length - 1; i >= 0; --i){
                    if(ant.id == data.moved[i].antId){
                        ant.setTarget({
                            target: data.target,
                            path: data.moved[i].path,
                        })
                        PIXI.utils.removeItems(data.moved, i, 1)
                    }
                }
            }
        });
        s.on("nonono", () => {
            this.roomSelStage.removeChild(this.roomSelStage.loading.cont);
            const msg = new Message(this.borderW, this.borderH, S.TXTe_ROOMFULL, false, 1000);
            this.roomSelStage.addChild(msg.cont);
        });
        s.on("test", data => console.log(data));
        s.on("showMsg", data => {
            this.supremeCont.addChild(new Message(this.borderW, this.borderH, data, false, 3000).cont);
        });
        s.on("connect", data => {
            console.log("(re)connected");
            this.initMainScreen();
            this.adToggle(true);
        });
        s.on("roomRestart", data => {
            this.initMainScreen();
            this.adToggle(true);

            this.playAd();
        });

        const name = this.getName();
        this.inp.value = name ? name : this.socket.id.substr(5, 8);

        this.emitWatcher = new EmitWatcher(this.uiCont);
        this.emitWatcher.registerEmit("multiMoveRequest");
        this.emitWatcher.registerEmit("requestAnt");
        this.emitWatcher.registerEmit("requestGameO");
        this.emitWatcher.registerEmit("upgrade");
    }
    showMsg(pass, text, all = false){
        this.socket.emit("showMsg", {pass, text, all});
    }
    selectRoom(room){
        this.socket.emit("roomSelect", {room});
    }
    antBase(prop) {
        for (const ant of this.antCont.children) {
            if (ant.x == prop.x && ant.y == prop.y) {
                prop.x += 1;
                prop.y += 2;
            }
        }

        prop.enemy = !(prop.owner == this.socket.id || prop.owner == "default");

        const ant = new Ant(prop);
        this.antCont.addChild(ant.r);
        this.antArr.push(ant);

        if (prop.target) {
            ant.setTarget(prop);
        }

        ant.r.on("click", () => {
            this.showOptions(ant);
        });
        ant.r.on("rightclick", () => this.target = ant.getTarget());

        if(prop.owner == this.socket.id) this.stats.ants++;

        this.uiObj.map.add(ant);

        return ant;
    }
    gameObject(prop) {
        prop.enemy = !(prop.owner == this.socket.id || prop.owner == "default");
        prop.x = prop.dX * S.gridRess + S.gameOGapPx;
        prop.y = prop.dY * S.gridRess + S.gameOGapPx;
        prop.s = S.gameO[prop.type].dS * S.gridRess - 2 * S.gameOGapPx;
        
        const g = new GameO(prop);
        this.gameOArr.push(g);
        this.gameOCont.addChild(g.r);

        g.r.on("click", () => this.showOptions(g));
        g.r.on("rightclick", () => this.target = g.getTarget());

        // moje
        if(prop.owner == this.socket.id){
            // farma zvyšuje kapacitu
            if(prop.type == 2){
                this.baseSet.maxAnt += g.unitValue;
            }
            // odemkne další budovy
            if(prop.type == 0){
                this.onlyMain = false;
                this.showOptions()

                g.onDead = () => this.endGame();
                this.uiObj.map.add(g, true);
            }

        } else {
            this.uiObj.map.add(g);
        }

        if(prop.owner == "default"){
            const p = new Particulator(g.s / 2, g.s / 2, g.s / 2 + 14, 5, g);
            this.updateArr.push(p.update.bind(p));
            g.r.addChildAt(p.r, 0)
        }
    }
    /**
     * ["gameOCont / uiCont / antCont", spriteArr ]
     */
    spriteToCont(arr) {
        arr.forEach(sprite => {
            switch (sprite[0]) {
                case "gameOCont":
                    this.gameOCont.addChild(sprite[1]);
                    break;
                case "uiCont":
                    this.uiCont.addChild(sprite[1]);
                    break;
                case "antCont":
                    this.antCont.addChild(sprite[1]);
                    break;
                default:
                    console.error("Máš to blbě");
                    break;
            }
        });
    }
    /**
     * ["gameOCont / uiCont / antCont", sprite ]
     */
    delFromCont(arr) {
        arr.forEach(sprite => {
            switch (sprite[0]) {
                case "gameOCont":
                    this.gameOCont.removeChild(sprite[1]);
                    break;
                case "uiCont":
                    this.uiCont.removeChild(sprite[1]);
                    break;
                case "antCont":
                    this.antCont.removeChild(sprite[1]);
                    break;
                default:
                    console.error("Máš to blbě");
                    break;
            }
        });
    }
    takeResources(cost){
        // if(this.stats.gold - cost.gold < 0 || this.stats.items[0] - cost.items[0] < 0 || this.stats.items[1] - cost.items[1] < 0) return false;
        if(this.stats.gold - cost.gold < 0 || this.stats.item0 - cost.item0 < 0 || this.stats.item1 - cost.item1 < 0) return false;
        else {
            this.stats.gold -= cost.gold;
            this.stats.item0 -= cost.item0;
            this.stats.item1 -= cost.item1;
            return true;
        }
    }
    /**
     * Zkotroluje maximum jednotek, počet budov a tak
     * @param {*String} type typ to
     * @param {*Integer} délka aktuální fronty
     */
    checkBaseSet(type, param = null){
        switch(type){
            case 10:
            case 11:
            case 12:
                if(this.stats.ants + param >= this.baseSet.maxAnt) return false;
            break;
            case 2:
                if(this.baseSet.curFarm >= this.baseSet.maxFarm) return false;

                if(param)
                    this.baseSet.curFarm++;
            break;
            case 6:
                if(this.baseSet.curTower >= this.baseSet.maxTower) return false;

                if(param)
                    this.baseSet.curTower++;
            break;
        }

        return true;
    }
    upgradeStats(data){
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
                })
                break;
            case "gameO":
                this.gameOArr.forEach(gameO => {
                    if(gameO.owner == data.owner && gameO.type == u.type){
                        for(const keyVal of up.up){
                            gameO[keyVal.key] = keyVal.val;
                        }
                    }
                })
                break;
        }
    }
    // tady je to ****************************
    showOptions(source = {type: 100}) {
        this.unListen();
        this.delFromCont(this.uiObj.spriteArr);
        this.uiObj.spriteArr = [];
        // this.uiObj.objArr.forEach(obj => obj.destroyed = true);
        // this.uiObj.objArr = [];
        this.uiObj.uiContr = null;
        this.uiObj.uiInfo = null;

        this.uiObj.source = source;

        // showOptions- type: 100, nebo source
        const reload = (sameSource) => {
            if(sameSource) this.showOptions(this.uiObj.source);
            else this.showOptions()
        }

        // generuje tlačítka pro kovárnu - upgrady
        const genButts = () => {
            const butts = [];
            for(const u in S.upgrade){
                const lvlUp = S.upgrade[u][this.upgraded[u] + 1];
                
                if(!lvlUp){
                    // const butt = [S.TXT_UP + " " + S.upgrade[u].desc, {icon: S[S.upgrade[u].to][S.upgrade[u].type].icon}, f];
                    const butt = [S.upgrade[u].desc + S.TXTe_MAX_LVL, {icon: S[S.upgrade[u].to][S.upgrade[u].type].icon}, () => {}];
                    butts.push(butt) 
                } else {
                    const butt = [S.TXT_UP + " " + S.upgrade[u].desc, {icon: S[S.upgrade[u].to][S.upgrade[u].type].icon, source: lvlUp}, 
                        () => {
                            if(this.takeResources(lvlUp.cost)){
                                if(this.uiObj.source.canUpgrade()){

                                    const reqId = this.emitWatcher.watch("upgrade", true);
                                    this.uiObj.source.upgradeIntrF(u, this.upgraded[u] + 1, () => {
                                        this.emitWatcher.start("upgrade", reqId);
                                    })
                                    this.socket.emit("upgrade", {u, reqId});

                                    this.upgraded[u]++;
                                    reload(true);
                                } else this.uiObj.uiContr.hint2.pop(S.TXTe_QUEUE_FULL);
                            } else this.uiObj.uiContr.hint2.pop(S.TXTe_INSF_ITEMS);
                        }
                    ];
                    butts.push(butt) 
                }
            }
            return butts;
        }

        // info -> sprite
        const additionalSprite = (o) => {
            const rArr = [];
            
            if(o.getTarget && o.getTarget().targetType == "gameO"){ // selectBox
                const box = new PIXI.Graphics();
                box.lineStyle(1, 0x0080c0);
                box.drawRect(o.r.x, o.r.y, o.s, o.s);
                rArr.push(["gameOCont", box]);
            }

            if(o.type == 0 || o.type == 1) { // spawnPoint
                const sq = new Square1(o.spawnPoint.x - 10, o.spawnPoint.y - 10, 20, false, "ic11").r;
                rArr.push(["gameOCont", sq]);
            }
            
            if(o.type == 6){
                const r = new PIXI.Graphics();
                r.lineStyle(1, S.COLOR_RED, 1);
                r.beginFill(S.COLOR_RED2, .3);
                r.drawCircle(o.r.x + o.s / 2, o.r.y + o.s / 2, S.gameORadius);
                r.endFill();
                rArr.push(["gameOCont", r]);
            }

            if(o.type == 9){
                const r = new PIXI.Graphics();
                r.lineStyle(1, S.COLOR_GREEN, 1);
                r.beginFill(S.COLOR_LIGHT_GREEN, .3);
                r.drawCircle(o.r.x + o.s / 2, o.r.y + o.s / 2, o.healRad);
                r.endFill();
                rArr.push(["gameOCont", r]);
            }

            return rArr;
        }
        
        // info -> UIInfo
        const additionalInfo = (o) => {
            const iArr = [];
            if(o.spawnIntr){
                iArr.push({pos: 5, text1: S.TXT1_SPAWNING, source: o, timeKey: "spawnTime", queueKey: "spawnQueue", style: 2});
            }
            if(o.upgradeIntr){
                iArr.push({pos: 5, text1: S.TXT1_UPGRADING, source: o, timeKey: "upgradeTime", queueKey: "upgradeQueue", style: 2});
            }
            return iArr.length > 0 ? iArr : false;
        }

        let uiInfo, uiContrArgs, statArr, aI;
        switch (this.uiObj.source.type) {
            case 0: // base
                statArr = [
                    {pos: 0, text1: S.TXT1_HP, source: this.uiObj.source, key: "hp", style: 1, icon: "ic16"},
                    {pos: 1, text1: S.TXT1_ARMOR, source: this.uiObj.source, key: "armor", style: 1, icon: "ic5"}
                ]
                aI = additionalInfo(this.uiObj.source);
                if(aI) statArr.push(...aI);
                uiInfo = new UIInfo(this.borderW, this.borderH, S.TXT_0, source.name, statArr);

                if (!this.uiObj.source.enemy) { // ぼくの
                    uiContrArgs = [
                        [S.TXT_SPAWN_ANT, {icon: S.ant[10].icon, source: S.ant[10]}, () => {
                            if(this.checkBaseSet(10, this.uiObj.source.spawnQueue.length)){
                                if(this.takeResources(S.ant[10].cost)){
                                    if(this.uiObj.source.canSpawn()){

                                        const reqId = this.emitWatcher.watch("requestAnt", true);
                                        this.uiObj.source.spawnAntIntr(10, () => {
                                            this.emitWatcher.start("requestAnt", reqId);
                                        });

                                        this.socket.emit("requestAnt", {
                                            target:  this.uiObj.source.getTarget(),
                                            type: 10,
                                            reqId
                                        });
    
                                        reload(true);
                                    } else this.uiObj.uiContr.hint2.pop(S.TXTe_QUEUE_FULL);
                                } else this.uiObj.uiContr.hint2.pop(S.TXTe_INSF_ITEMS);
                            } else this.uiObj.uiContr.hint2.pop(S.TXTe_MAX_UNITS);
                        }],
                        [S.TXT_SET_SPAWN, {icon: "ic9"}, () => this.setSpawnPoint(this.uiObj.source)],
                        [S.TXT_CONVENE, {icon: "ic8"}, () => {
                            this.target = this.uiObj.source.getTarget();
                            this.joListen(this.target);
                        }],
                        [S.TXT_DESTROY_BASE, {icon: "ic7"}, () => {
                            this.socket.emit("destroy", this.uiObj.source.getTarget());
                            this.endGame();
                            reload();
                        }]
                    ];
                } else {
                    uiContrArgs = [
                        [S.TXT_ATTACK_THIS, {icon: "ic10"}, () => {
                            this.target = this.uiObj.source.getTarget();
                            this.joListen(this.target);
                        }]
                    ];
                }
                break;
            case 1: // kasárny
                statArr = [
                    {pos: 0, text1: S.TXT1_HP, source: this.uiObj.source, key: "hp", style: 1, icon: "ic16"},
                    {pos: 1, text1: S.TXT1_ARMOR, source: this.uiObj.source, key: "armor", style: 1, icon: "ic5"}
                ]
                aI = additionalInfo(this.uiObj.source);
                if(aI) statArr.push(...aI);
                uiInfo = new UIInfo(this.borderW, this.borderH, S.TXT_1, source.name, statArr);

                if(!this.uiObj.source.enemy){
                    uiContrArgs = [
                        [S.TXT_11, {icon: S.ant[11].icon, source: S.ant[11]}, () => {
                            if(this.checkBaseSet(11, this.uiObj.source.spawnQueue.length)){
                                if(this.takeResources(S.ant[11].cost)){
                                    if(this.uiObj.source.canSpawn()){

                                        const reqId = this.emitWatcher.watch("requestAnt", true);
                                        this.uiObj.source.spawnAntIntr(11, () => {
                                            this.emitWatcher.start("requestAnt", reqId);
                                        });

                                        this.socket.emit("requestAnt", {
                                            target:  this.uiObj.source.getTarget(),
                                            type: 11,
                                            reqId
                                        });
    
                                        reload(true);
                                    } else this.uiObj.uiContr.hint2.pop(S.TXTe_QUEUE_FULL);
                                } else this.uiObj.uiContr.hint2.pop(S.TXTe_INSF_ITEMS);
                            } else this.uiObj.uiContr.hint2.pop(S.TXTe_MAX_UNITS);
                        }],
                        [S.TXT_12, {icon: S.ant[12].icon, source: S.ant[12]}, () => {
                            if(this.checkBaseSet(12, this.uiObj.source.spawnQueue.length)){
                                if(this.takeResources(S.ant[12].cost)){
                                    if(this.uiObj.source.canSpawn()){

                                        const reqId = this.emitWatcher.watch("requestAnt", true);
                                        this.uiObj.source.spawnAntIntr(12, () => {
                                            this.emitWatcher.start("requestAnt", reqId);
                                        });

                                        this.socket.emit("requestAnt", {
                                            target:  this.uiObj.source.getTarget(),
                                            type: 12,
                                            reqId
                                        });
    
                                        reload(true);
                                    } else this.uiObj.uiContr.hint2.pop(S.TXTe_QUEUE_FULL);
                                } else this.uiObj.uiContr.hint2.pop(S.TXTe_INSF_ITEMS);
                            } else this.uiObj.uiContr.hint2.pop(S.TXTe_MAX_UNITS);
                        }],
                        [S.TXT_SET_SPAWN, {icon: "ic9"}, () => this.setSpawnPoint(this.uiObj.source)],
                        [S.TXT_DESTROY, {icon: "ic7"}, () => {
                            this.socket.emit("destroy", this.uiObj.source.getTarget());
                            reload();
                        }]
                    ];
                } else {
                    uiContrArgs = [
                        [S.TXT_ATTACK_THIS, {icon: "ic10"}, () => {
                            this.target = this.uiObj.source.getTarget();
                            this.joListen(this.target);
                        }]
                    ];
                }
                break;
            case 2: // farma
                statArr = [
                    {pos: 0, text1: S.TXT1_HP, source: this.uiObj.source, key: "hp", style: 1, icon: "ic16"},
                    {pos: 1, text1: S.TXT1_ARMOR, source: this.uiObj.source, key: "armor", style: 1, icon: "ic5"}
                ]
                aI = additionalInfo(this.uiObj.source);
                if(aI) statArr.push(...aI);
                uiInfo = new UIInfo(this.borderW, this.borderH, S.TXT_2, source.name, statArr);

                if (!this.uiObj.source.enemy) { // ぼくの
                    uiContrArgs = [
                        [S.TXT_DESTROY, {icon: "ic7"}, () => {
                            this.socket.emit("destroy", this.uiObj.source.getTarget());
                            reload();
                        }]
                    ];
                } else {
                    uiContrArgs = [
                        [S.TXT_ATTACK_THIS, {icon: "ic10"}, () => {
                            this.target = this.uiObj.source.getTarget();
                            this.joListen(this.target);
                        }]
                    ];
                }
                break;
            case 3: // kovárna - staty
                statArr = [
                    {pos: 0, text1: S.TXT1_HP, source: this.uiObj.source, key: "hp", style: 1, icon: "ic16"},
                    {pos: 1, text1: S.TXT1_ARMOR, source: this.uiObj.source, key: "armor", style: 1, icon: "ic5"}
                ]
                aI = additionalInfo(this.uiObj.source);
                if(aI) statArr.push(...aI);
                uiInfo = new UIInfo(this.borderW, this.borderH, S.TXT_3, source.name, statArr);

                if (!this.uiObj.source.enemy) { // ぼくの
                    uiContrArgs = [
                        ...genButts(),
                        [S.TXT_DESTROY, {icon: "ic7"}, () => {
                            this.socket.emit("destroy", this.uiObj.source.getTarget());
                            reload();
                        }]
                    ];
                } else {
                    uiContrArgs = [
                        [S.TXT_ATTACK_THIS, {icon: "ic10"}, () => {
                            this.target = this.uiObj.source.getTarget();
                            this.joListen(this.target);
                        }]
                    ];
                }
                break;
            case 7:
            case 5:
            case 4: // těžitelný gameO
                statArr = [
                    {pos: 0, text1: S.TXT1_MINE_CAP, source: this.uiObj.source, key: "hp", style: 1, icon: "ic15"},
                    {pos: 3, text1: S.TXT1_MINE_PS, source: this.uiObj.source, key: "ps", style: 1, icon: "ic18"}
                ]
                aI = additionalInfo(this.uiObj.source);
                if(aI) statArr.push(aI);
                uiInfo = new UIInfo(this.borderW, this.borderH, S["TXT_" + source.type], false, statArr);

                uiContrArgs = [
                    [S.TXT_MINE_THIS, {icon: "ic12"}, () => {
                        this.target = this.uiObj.source.getTarget();
                        this.joListen(this.target);
                    }]
                ];
                break;
            case 6: // obranné gameO
                statArr = [
                    {pos: 0, text1: S.TXT1_HP, source: this.uiObj.source, key: "hp", style: 1, icon: "ic16"},
                    {pos: 1, text1: S.TXT1_ARMOR, source: this.uiObj.source, key: "armor", style: 1, icon: "ic5"},
                    {pos: 2, text1: S.TXT1_DMG, source: this.uiObj.source, key: "dmgVal", style: 1, icon: "ic17"}
                ]
                aI = additionalInfo(this.uiObj.source);
                if(aI) statArr.push(aI);
                uiInfo = new UIInfo(this.borderW, this.borderH, S.TXT_6, source.name, statArr);

                if (!this.uiObj.source.enemy) { // ぼくの
                    uiContrArgs = [
                        [S.TXT_DESTROY, {icon: "ic7"}, () => {
                            this.socket.emit("destroy", this.uiObj.source.getTarget());
                            reload();
                        }]
                    ];
                } else {
                    uiContrArgs = [
                        [S.TXT_ATTACK_THIS, {icon: "ic10"}, () => {
                            this.target = this.uiObj.source.getTarget();
                            this.joListen(this.target);
                        }]
                    ];
                }
                break;
            case 8: // zeď
                statArr = [
                    {pos: 0, text1: S.TXT1_HP, source: this.uiObj.source, key: "hp", style: 1, icon: "ic16"},
                    {pos: 1, text1: S.TXT1_ARMOR, source: this.uiObj.source, key: "armor", style: 1, icon: "ic5"}
                ]
                aI = additionalInfo(this.uiObj.source);
                if(aI) statArr.push(...aI);
                uiInfo = new UIInfo(this.borderW, this.borderH, S.TXT_8, source.name, statArr);

                if (!this.uiObj.source.enemy) { // ぼくの
                    uiContrArgs = [
                        [S.TXT_DESTROY, {icon: "ic7"}, () => {
                            this.socket.emit("destroy", this.uiObj.source.getTarget());
                            reload();
                        }]
                    ];
                } else {
                    uiContrArgs =  [
                        [S.TXT_ATTACK_THIS, {icon: "ic10"}, () => {
                            this.target = this.uiObj.source.getTarget();
                            this.joListen(this.target);
                        }]
                    ];
                }
                break;
            case 9: // heal
                statArr = [
                    {pos: 0, text1: S.TXT1_HP, source: this.uiObj.source, key: "hp", style: 1, icon: "ic16"},
                    {pos: 1, text1: S.TXT1_ARMOR, source: this.uiObj.source, key: "armor", style: 1, icon: "ic5"},
                    {pos: 2, text1: S.TXT1_HEAL, source: this.uiObj.source, key: "healVal", style: 1, icon: "ic29"},
                ]
                aI = additionalInfo(this.uiObj.source);
                if(aI) statArr.push(...aI);
                uiInfo = new UIInfo(this.borderW, this.borderH, S.TXT_9, source.name, statArr);

                if (!this.uiObj.source.enemy) { // ぼくの
                    uiContrArgs = [
                        [S.TXT_DESTROY, {icon: "ic7"}, () => {
                            this.socket.emit("destroy", this.uiObj.source.getTarget());
                            reload();
                        }]
                    ];
                } else {
                    uiContrArgs =  [
                        [S.TXT_ATTACK_THIS, {icon: "ic10"}, () => {
                            this.target = this.uiObj.source.getTarget();
                            this.joListen(this.target);
                        }]
                    ];
                }
                break;
            case 12:
            case 11:
            case 10: // ant
                this.uiObj.source.listenF(true);
                statArr = [
                    {pos: 0, text1: S.TXT1_HP, source: this.uiObj.source, key: "hp", style: 1, icon: "ic16"},
                    {pos: 1, text1: S.TXT1_ARMOR, source: this.uiObj.source, key: "armor", style: 1, icon: "ic5"},
                    {pos: 2, text1: S.TXT1_DMG, source: this.uiObj.source.dmgVal, style: 1, icon: "ic17"},
                    {pos: 3, text1: S.TXT1_SPEED, source: this.uiObj.source.defSpeed, style: 1, icon: "ic14a"}
                ]
                aI = additionalInfo(this.uiObj.source);
                if(aI) statArr.push(...aI);
                uiInfo = new UIInfo(this.borderW, this.borderH, S["TXT_" + this.uiObj.source.type], source.name, statArr);

                if (!this.uiObj.source.enemy) { // ぼくの
                    uiContrArgs = [
                        [S.TXT_DESTROY, {icon: "ic7"}, () => {
                            this.socket.emit("destroy", this.uiObj.source.getTarget());
                            reload();
                        }]
                    ];
                } else {
                    uiContrArgs = [
                        [S.TXT_ATTACK_THIS, {icon: "ic10"}, () => {
                            this.target = this.uiObj.source.getTarget();
                            this.joListen(this.target);
                        }]
                    ];
                }
                break;
            case 100: // main menu
                uiContrArgs = [
                    [S.TXT_GAMEOPREV_0, {icon: S.gameO[0].icon, source: S.gameO[0]}, () => this.gameOPrev(0), this.onlyMain],
                    [S.TXT_GAMEOPREV_1, {icon: S.gameO[1].icon, source: S.gameO[1]}, () => this.gameOPrev(1), !this.onlyMain],
                    [S.TXT_GAMEOPREV_2, {icon: S.gameO[2].icon, source: S.gameO[2]}, () => this.gameOPrev(2), !this.onlyMain],
                    [S.TXT_GAMEOPREV_3, {icon: S.gameO[3].icon, source: S.gameO[3]}, () => this.gameOPrev(3), !this.onlyMain],
                    [S.TXT_GAMEOPREV_6, {icon: S.gameO[6].icon, source: S.gameO[6]}, () => this.gameOPrev(6), !this.onlyMain],
                    [S.TXT_GAMEOPREV_8, {icon: S.gameO[8].icon, source: S.gameO[8]}, () => this.gameOPrev(8), !this.onlyMain],
                    [S.TXT_GAMEOPREV_9, {icon: S.gameO[9].icon, source: S.gameO[9]}, () => this.gameOPrev(9), !this.onlyMain]
                ];
                break;
            default:
                console.log("tohle si ještě neudělal boi");
            break;
        }
        
        if(uiContrArgs){
            const uiContr = new UIContr(this.borderW, this.borderH, this.mainPointer, uiContrArgs);
            this.uiObj.spriteArr.push(["uiCont", uiContr.cont]);
            // this.uiObj.objArr.push(uiContr);
            this.uiObj.uiContr = uiContr;
        }
        
        if(uiInfo){
            this.uiObj.spriteArr.push(["uiCont", uiInfo.cont]);
            // this.uiObj.objArr.push(uiInfo);
            this.uiObj.uiInfo = uiInfo;
        }

        this.uiObj.spriteArr.push(...additionalSprite(this.uiObj.source));
        this.spriteToCont(this.uiObj.spriteArr);
    }
    setSpawnPoint(gameO) {
        if (this.mainPointer.inUse) return;

        const destroy = () => {
            this.prevShape.r.destroy();
            this.prevShape = null;
            this.mainPointer.inUse = false;
            this.mainPointer.press = null;
            this.mainPointer.rightPress = null;
        }

        const pos = this.shiftedPointerPos();
        this.prevShape = new Square1(pos.x - 10, pos.y - 10, 20, false, "ic11");
        this.prevShape.stickToGrid = false;
        this.prevShape.r.alpha = 0.7;
        this.prevShape.r.interactive = true; // aby se neprokliknul
        this.prevShape.r.tint = S.COLOR_BLUE
        this.prevShape.isSpawn = gameO.center;

        this.gameOCont.addChild(this.prevShape.r);

        this.mainPointer.inUse = true;
        this.mainPointer.press = () => {
            if (this.prevShape.r.tint != S.COLOR_RED) {
                // gameO.spawnPoint = this.shiftedPointerPos();
                gameO.spawnPoint = {
                    x: this.prevShape.r.x + this.prevShape.s / 2,
                    y: this.prevShape.r.y + this.prevShape.s / 2
                };

                this.socket.emit("setSpawnPointRequest", {
                    id: gameO.id,
                    spawnPoint: gameO.spawnPoint
                });
                this.showOptions(gameO);
                destroy();
            }
        }
        this.mainPointer.rightPress = () => {
            destroy();
        }

        const r = new PIXI.Graphics();
        r.lineStyle(1, S.COLOR_DRAG_LINE, 1);
        r.beginFill(S.COLOR_DRAG_LINE, .3);
        r.drawCircle(gameO.r.x + gameO.s / 2, gameO.r.y + gameO.s / 2, S.spawnDistance);
        r.endFill();

        this.uiObj.spriteArr.push(["gameOCont", r]);
        this.spriteToCont(this.uiObj.spriteArr);
    }
    dragSelectEnd() {
        this.unListen();
        this.antArr.forEach(ant => {
            if (ant.owner != this.socket.id) return;
            if (this.dragSelectCont.children[0].containsPoint({
                    x: (ant.center.x + this.gameCont.x) * this.scaleRatioRes / S.resolution,
                    y: (ant.center.y + this.gameCont.y) * this.scaleRatioRes / S.resolution
                })) {
                ant.listenF(true);
            }
        });
        this.dragSelectCont.children[0].destroy();
        this.mainPointer.inUse = false;
        this.mainPointer.release = () => {};
        this.dragStart = null;

        this.mouseDown = false;
    }
    dragSelectUpdate() { 
        /**
         * když mousedown na backgroud
         */

        if (!this.dragStart) { //jakoby dragStart
            if(this.mainPointer.inUse) return 

            this.dragStart = this.shiftedPointerPos();
            this.mainPointer.release = () => this.dragStart = null;
        }

        if (!this.mainPointer.inUse) {
            const actPos = this.shiftedPointerPos();
            const vx = Math.abs(this.dragStart.x - actPos.x),
                vy = Math.abs(this.dragStart.y - actPos.y);
            const dist = Math.sqrt(vx * vx + vy * vy);
            if (dist > 5) {
                this.mainPointer.inUse = true;
                this.mainPointer.release = () => this.dragSelectEnd();
            } else {
                return;
            }
        }

        let box = new PIXI.Graphics();

        const {
            x: x1,
            y: y1
        } = this.shiftedPointerPos();
        const {
            x: x0,
            y: y0
        } = this.dragStart;

        box.beginFill(0x51b5f0, 0.3);
        box.lineStyle(1, 0x0080c0, 1);
        box.drawPolygon([
            x0, y0, // 0/4
            x0, y1, // 1
            x1, y1, // 2
            x1, y0, // 3
            x0, y0 // 4/0
        ]);
        box.endFill();

        try {
            this.dragSelectCont.children[0].destroy();
        } catch (e) {}
        this.dragSelectCont.addChild(box);
    }
    mapInit() {
        const back = new Rectangle(0, 0, S.gameW, S.gameW, S.BLU1, false, false);
        this.backGround.addChild(back.r);

        const g = S.gameContain;
        const rect = new PIXI.Graphics();

        rect.lineStyle(2, 0xFFFFFF, .5);
        rect.beginFill(0x000000, 0);
        rect.drawRect(g.x, g.y, g.width, g.height);
        rect.endFill();
        this.backGround.addChild(rect);

        // grid
        const ctx = this.grider(S.gameW, S.gameW, S.gridRess);

        ctx.lineStyle(1, S.COLOR_VIOLET, 1);
        ctx.moveTo(0, S.gameW / 2);
        ctx.lineTo(S.gameW, S.gameW / 2);
        ctx.moveTo(S.gameW / 2, 0);
        ctx.lineTo(S.gameW / 2, S.gameW);

        this.backGround.addChild(ctx);
    }
    grider(w, h, r){
        const ctx = new PIXI.Graphics();
        const max = h / r;

        // ctx.lineStyle(0.5, 0x828282, 0.7);
        ctx.lineStyle(0.5, 0xFFFFFF, 0.2);
        for (let i = 1; i < w / r; i++) {
            if (i < max) {
                ctx.moveTo(0, i * r + 0.5);
                ctx.lineTo(w, i * r + 0.5);
            }
            ctx.moveTo(i * r + 0.5, 0);
            ctx.lineTo(i * r + 0.5, h);
        }

        return ctx
    }
    workerCollide() {
        this.smartRender();

        const antProps = this.antArr.propsColl();
        const antPropsString = JSON.stringify(antProps);

        const gameOProps = this.gameOArr.propsColl();
        const gameOPropsString = JSON.stringify(gameOProps);

        this.worker.postMessage({
            antArr: antPropsString,
            gameOArr: gameOPropsString
        });
    }
    afterColide(e) {
        const antO = JSON.parse(e.data.antO);
        const gameOColl = JSON.parse(e.data.gameO);

        for(const gameO of this.gameOArr){ // obranná gameO
            if(gameOColl[gameO.id] && gameOColl[gameO.id].at != undefined){
                // console.log("at");
                
                const ant = this.antArr.getById(gameOColl[gameO.id].at);
                if(ant && !ant.clientDead) gameO.attack(ant);
            }
        }

        for(const ant of this.antArr){
            if (antO[ant.id]) { // jestli existuje v aktuálním setu (nový, mrtvý)
                ant.props = antO[ant.id]; // pozice po kolizi
                if (antO[ant.id].hit !== undefined) { // do něčeho mrdnul
                    antO[ant.id].hit.forEach(hit => {
                        let to; // to, do čeho mrdnul
                        if (hit[0] == "a") to = this.antArr.getById(hit[1]);
                        else to = this.gameOArr.getById(hit[1]);

                        const a = ant.doDmg(to);
                        this.resolveDmg(a, ant.owner);
                    });
                }
            }
        }
    }
    centerOn(r) {
        this.gameCont.x = -Math.round(r.x - this.renderer.width / 2);
        this.gameCont.y = -Math.round(r.y - this.renderer.height / 2);
    }
    clearPointer(des = true){
        if(des && this.prevShape) this.prevShape.r.destroy();
        this.prevShape = null;
        this.mainPointer.inUse = false;
        this.mainPointer.press = null;
        this.mainPointer.rightPress = null;
        this.dragStart = null;

        this.bckF = null;
    }
    gameOPrev(type) {
        if(this.prevShape)
            this.clearPointer();

        const set = S.gameO[type];
        const s = (set.dS) * S.gridRess - 2 * S.gameOGapPx;
        this.prevShape = ShapeArr[set.shape](0, 0, s, S.GREE1, set.icon);
        this.prevShape.r.alpha = 0.7;
        this.prevShape.type = type;
        this.prevShape.stickToGrid = true;
        const box = new PIXI.Graphics();
        box.lineStyle(1, 0x0080c0);
        box.drawRect(0, 0, this.prevShape.s, this.prevShape.s);
        this.prevShape.r.addChild(box);
        this.gameOCont.addChild(this.prevShape.r);
        this.mainPointer.inUse = true;
        this.bckF = () => {
            if (this.prevShape.r.tint != S.COLOR_RED) {
                if(this.takeResources(S.gameO[type].cost)){
                    if(this.checkBaseSet(type, true)){
                        // if(type == 2){
                        //     this.baseSet.curFarm++;
                        // }
                        
                        const reqId = this.emitWatcher.watch("requestGameO");
                        this.socket.emit("requestGameO", {
                            dX: Math.round(this.prevShape.r.x / 20),
                            dY: Math.round(this.prevShape.r.y / 20),
                            type: type,
                            reqId
                        });
    
                        this.clearPointer();
                        this.bckF = null;
                    } else {
                        this.uiObj.uiContr.hint2.pop(S.TXTe_MAX_BUILD);
                    }
                }else{
                    this.uiObj.uiContr.hint2.pop(S.TXTe_INSF_ITEMS);
                }
            }
        }
        this.mainPointer.rightPress = () => this.clearPointer();

    }
    gameOPrevUpd() {
        const curPos = this.shiftedPointerPos();
        const fc = this.prevShape.stickToGrid ? (pos) => {
            return Math.round((pos - this.prevShape.s / 2) / S.gridRess) * S.gridRess + S.gameOGapPx;
        } : (pos) => {
            return pos - this.prevShape.s / 2;
        }
        this.prevShape.r.x = fc(curPos.x);
        this.prevShape.r.y = fc(curPos.y);

        let hit = false;
        for(const gameO of this.gameOArr){
            if (gameO.r.x < this.prevShape.r.x + this.prevShape.s &&
                gameO.r.x + gameO.s > this.prevShape.r.x &&
                gameO.r.y < this.prevShape.r.y + this.prevShape.s &&
                gameO.s + gameO.r.y > this.prevShape.r.y) {
                hit = true;
            }
        }

        !hit && this.preArr.forEach((pre, i) => {
            if(pre.r.transform){
                if (pre.r.x < this.prevShape.r.x + this.prevShape.s &&
                    pre.r.x + pre.s > this.prevShape.r.x &&
                    pre.r.y < this.prevShape.r.y + this.prevShape.s &&
                    pre.s + pre.r.y > this.prevShape.r.y) {
                    hit = true;
                }
            } else {
                this.preArr.splice(i, 1);
            }
        });

        if(!hit && (
            S.gameW - S.gameBorder < this.prevShape.r.x + this.prevShape.s ||
            S.gameBorder > this.prevShape.r.x ||
            S.gameW - S.gameBorder < this.prevShape.r.y + this.prevShape.s ||
            S.gameBorder> this.prevShape.r.y
        )) hit = true;

        if(this.prevShape.isSpawn){
            const vx = this.prevShape.r.x - this.prevShape.isSpawn.x;
            const vy = this.prevShape.r.y - this.prevShape.isSpawn.y;
            const m = Math.sqrt(vx * vx + vy * vy);

            // console.log("length", m);
            if(m > S.spawnDistance){
                const dx = vx / m;
                const dy = vy / m;

                this.prevShape.r.x -= (m - S.spawnDistance) * dx + this.prevShape.s / 2;
                this.prevShape.r.y -= (m - S.spawnDistance) * dy + this.prevShape.s / 2;
            }
        }

        this.prevShape.r.tint = hit ? S.COLOR_RED : 0xFFFFFF;
    }
    pointerLock() {
        this.renderer.view.onclick = () => {
            this.renderer.view.requestPointerLock();
        }

        if(!this.pointerLockEventsAdded){
            const spawnCursor = () => {
                this.cursor = new BaseCircle(0, 0, 10, S.COLOR_RED);
                this.supremeCont.addChild(this.cursor.r);
            }
            const delCursor = () => {
                this.cursor.r.destroy();
                this.cursor = null;
            }
    
            const lockChangeAlert = () => {
                console.log("change");
                if (document.pointerLockElement === this.renderer.view || document.mozPointerLockElement === this.renderer.view) {                
                    spawnCursor();
                    this.mainPointer.lock = true;
    
                    this.renderer.view.onclick = () => {};
                } else {
                    delCursor();
                    this.mainPointer.lock = false;
                    
                    if(this.gameState == "game")
                        this.renderer.view.onclick = () => {
                            console.log("request lock");
                            this.renderer.view.requestPointerLock();
                        };
                }
            }
            const lockError = (e) => {
                console.err(e);
            }
            document.addEventListener('pointerlockerror', lockError, false);
            document.addEventListener('mozpointerlockerror', lockError, false);
            document.addEventListener('pointerlockchange', lockChangeAlert, false);
            document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
            this.pointerLockEventsAdded = true;
        }
    }
    resolveDmg(a, owner){
        if (a && owner == this.socket.id && !a.dead) {
            if (a.mineable) { // když můj útočí na mineable
                this.stats[a.item] += a.value;
            } else {
                this.stats.gold += Math.round(a.dmg);
            }
        }
    }
    chRoom(){
        this.socket.emit("roomDis");
        this.initMainScreen();
        this.adToggle(true);

        this.playAd();
    }
    resize(){
        this.renderer.resize(window.innerWidth, window.innerHeight);

        const aspectRatio = this.renderer.width / this.renderer.height;
        if (aspectRatio > 1) this.scaleRatio = this.renderer.height / S.visibleArea;
        else this.scaleRatio = this.renderer.width / S.visibleArea;

        this.scaleRatioRes = this.scaleRatio * S.resolution;
        this.borderW = this.renderer.width / this.scaleRatioRes;
        this.borderH = this.renderer.height / this.scaleRatioRes;

        this.mainStage.scale.set(this.scaleRatio, this.scaleRatio);
        this.mainPointer.scale = this.scaleRatio;

        if(this.gameInit){
            this.uiCont.removeChildren();
            this.uiObj.spriteArr.length = 0;
            this.uiObj.objArr.length = 0;
            clearInterval(this.uiObj.fps.map);
            clearInterval(this.uiObj.fps.intr);
            this.uiObj.map = new UIMap(this.borderW, this.borderH, this.gameCont, this.scaleRatio, this.mainPointer);
            this.antArr.forEach(ant => this.uiObj.map.add(ant));
            this.gameOArr.forEach(gameO => this.uiObj.map.add(gameO));
            this.uiObj.statBar = new UIStats([
                [S.TXT_7, "ic22", this.stats, "gold"],
                [S.TXT_4, "ic21", this.stats, "item0"],
                [S.TXT_5, "ic23", this.stats, "item1"],
                [S.TXTe_UNIT, "ic24", this.stats, "ants", this.baseSet, "maxAnt"]
            ])
            this.uiObj.chRoom = new ChangeRoom(this.borderW, this.borderH, () => this.chRoom());
            this.uiObj.fps = new Fps(this.borderW, this.borderH, this.smoothie);
            this.uiObj.hintAdv = new HintAdvanced(this.borderW, this.borderH);
            this.uiCont.addChild(
                this.uiObj.statBar.cont, 
                this.uiObj.map.cont, 
                this.uiObj.chRoom.cont, 
                this.uiObj.fps.cont,
                this.uiObj.hintAdv.cont
            )
            this.showOptions()
        }

        if(this.gameState == "roomSelect"){
            this.initMainScreen(true);
        }
    }
    toggleKeys(bool = false){
        this.keys.forEach(key => key.enabled = bool);
    }
    showHintRoomSel(){
        const hintArr = [
            [100, 100, {tx: parseInt(this.roomSel.inp.style.left), ty: parseInt(this.roomSel.inp.style.top)}, this.scaleRatio, "Nickname", "You can choose your nick"],
            [80, 70, this.roomSel.buttArr[0].r.worldTransform, this.scaleRatio, "Game room", "Connect to a game room"]
        ]

        const makeHint = () => {
            const hintArgs = hintArr.shift();
            if(!hintArgs){
                document.cookie = "tutorial1Done=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
                return;
            }
            const hint = new Hint(...hintArgs);
            this.roomSelStage.addChild(hint.cont);
            hint.promise.then(() => makeHint());
        }

        if (document.cookie.replace(/(?:(?:^|.*;\s*)tutorial1Done\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {
            makeHint();
        }
    }
    showHintGame(){
        const hintArr = [
            this.roomSel.selControll == "keys" ?
                [200, 100, {tx: this.borderW - 7, ty: this.borderH / 2}, 1, "View", "You can move over the map using WASD or arrows"]
                : [300, 300, {tx: 600, ty: 325}, this.scaleRatio, "Controls", "Click to activate the game cursor. [esc] to cancel"],
            
            this.roomSel.selControll == "cursor" ?
                [200, 100, {tx: this.borderW - 7, ty: this.borderH / 2}, 1, "View", "Move the cursor to the sides to move over the map"]
                : "ne",
            
            [500, 100, this.uiObj.chRoom.cont.worldTransform, this.scaleRatio, "Room change", "Click this to get back on the home page"],
            [100, 300, this.uiObj.uiContr.cont.worldTransform, this.scaleRatio, "Controls", "Here is a menu with building you can build"],
            [100, 300, {tx: 0, ty: 0}, 0, "Controls", "Press, hold and drag cursor to select multiple units"],
            [100, 300, {tx: 0, ty: 0}, 0, "Controls", "Right click to set the target"],
            [300, 300, this.uiObj.map.cont.worldTransform, this.scaleRatio, "Map", "You can move over the map by clicking on the map"],
            [100, 300, this.uiObj.uiContr.cont.worldTransform, this.scaleRatio, "Start", "Start by placing the Headquarters building"],
            [100, 300, {tx: 0, ty: 0}, 0, "Objective", "Destroy enemy's Headquarters"],
        ]

        const makeHint = () => {
            const hintArgs = hintArr.shift();
            if(hintArgs == "ne"){
                return makeHint();
            }
            if(!hintArgs){
                document.cookie = "tutorial2Done=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
                return;
            }
            const hint = new Hint(...hintArgs);
            this.uiCont.addChild(hint.cont);
            hint.promise.then(() => makeHint());
        }

        if (document.cookie.replace(/(?:(?:^|.*;\s*)tutorial2Done\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {
            makeHint();
        }
    }
    resetHint(){
        document.cookie = "tutorial1Done=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "tutorial2Done=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    loadScreen(){
        this.mainStage.loading = new Message(this.borderW, this.borderH, S.TXTe_LOADING, true);
        const pozadi = new Rectangle(0, 0, this.borderH, this.borderW, S.COLOR_WHITE, false, false);

        this.mainStage.addChild(pozadi.r, this.mainStage.loading.cont);
    }
    smartRender(){
        const a = this.borderW + 120;
        const b = this.borderH + 120;
        
        const x = -this.gameCont.x - 60;
        const y = -this.gameCont.y - 60;
        
        // gameO
        for(const gameO of this.gameOArr){
            if (gameO.r.x < x + a &&
                gameO.r.x + gameO.s > x &&
                gameO.r.y < y + b &&
                gameO.s + gameO.r.y > y)
            {
                gameO.r.visible = true;
                gameO.doCollide = true;
            } else {
                gameO.r.visible = false;
                gameO.doCollide = false;
            }
        }

        // ant
        for(const ant of this.antArr){
            if (ant.r.x < x + a &&
                ant.r.x + ant.s > x &&
                ant.r.y < y + b &&
                ant.s + ant.r.y > y)
            {

                if(!ant.doCollide){
                    for(const ant2 of this.antCont.children){
                        if (ant.r.x == ant2.x && ant.r.y == ant2.y) {
                            ant.r.x += Math.random() * 15;
                            ant.r.y += Math.random() * 15;
                        }
                    }
                }
                
                ant.r.visible = true;
                ant.doCollide = true;
            } else {
                ant.r.visible = false;
                ant.doCollide = false;
            }
        }
    }
    endGame(){
        const msg = new Message(this.borderW, this.borderH, S.TXTe_DEAD);
        this.supremeCont.addChild(msg.cont);

        this.uiCont.renderable = false;
        
        setTimeout(() => {
            this.chRoom();
        }, 2000);
    }
    adToggle(show){
        console.log("ad", show);

        if(show){
            document.getElementById("anthill-io-eu_728x90").style.display = "block";
            document.getElementById("anthill-io-eu_300x250").style.display = "block";

            //re
            aiptag.cmd.display.push(function() {
                aipDisplayTag.display('anthill-io-eu_300x250');
            });
            aiptag.cmd.display.push(function() {
                aipDisplayTag.display('anthill-io-eu_728x90');
            });
        } else {
            document.getElementById("anthill-io-eu_728x90").style.display = "none";
            document.getElementById("anthill-io-eu_300x250").style.display = "none";
        }
    }
    playAd(){
        if(!this.adPlayed){
            aiptag.cmd.player.push(function() {
                adplayer.startPreRoll();
            });

            this.adPlayed = true;
        } else {
            this.adPlayed = false;
        }
    }
    fpsWatch(){
        let frames = 0;
        let count = 0;

        const tmr = setInterval(() => {
            frames += Math.round(1000 / this.smoothie.elapsed);
            
            if(++count == 10){
                clearInterval(tmr);
                const a =  frames / count;
                console.log("průměr", a);

                if(a < 40){
                    const p = new LowFps();
                    this.uiCont.addChild(p.cont);
                }
            }
        }, 500);
    }
    saveName(name){
        document.cookie = `playaName=${name}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }
    getName(){
        const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)playaName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        
        return cookie ? cookie : false;
    }

    test(){
        const p = new LowFps();
        this.uiCont.addChild(p.cont);
    }
}

function cookieShow(){
    if (document.cookie.replace(/(?:(?:^|.*;\s*)cookieShown\s*\=\s*([^;]*).*$)|^.*$/, "$1") === "true")
        return;

    document.getElementById("cookie").style.display = "block";
}

function cookieOk(){
    document.getElementById("cookie").style.display = "none";
    document.cookie = "cookieShown=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

function reCookie(){
    document.cookie = "cookieShown=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

// cookie();