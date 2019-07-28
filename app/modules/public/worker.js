class Worker {
    constructor(gameW, radius, gameORadius) {
        this.gameHalf = gameW / 2;
        this.attackRadius = radius;
        this.gameORadius = gameORadius;
        this.gameORadius = gameORadius;

        this.antO;
        this.gameO;
    }
    collide(antO, gameO) {
        // console.log(antO);
        this.antO = antO;
        this.gameO = gameO;

        let sect1 = [],
            sect2 = [],
            sect3 = [],
            sect4 = [],
            sect11 = [],
            sect22 = [],
            sect33 = [],
            sect44 = [];

        for (let c in this.antO) {
            antO[c].xx = 0;
            antO[c].yy = 0;

            let x = antO[c].x + antO[c].r,
                y = antO[c].y + antO[c].r;
            // if (x < this.gameHalf) {
            //     if (y < this.gameHalf) sect1.push(c);
            //     else sect2.push(c);
            // } else {
            //     if (y < this.gameHalf) sect3.push(c);
            //     else sect4.push(c);
            // }
            if (x < this.gameHalf) {
                if (y < this.gameHalf) sect1.push(c);
                else sect3.push(c);
            } else {
                if (y < this.gameHalf) sect2.push(c);
                else sect4.push(c);
            }
        }

        for (let c in this.gameO) {
            let x = gameO[c].x,
                y = gameO[c].y,
                r = gameO[c].r * 2;

            if (x <= this.gameHalf && y <= this.gameHalf) { // 1
                sect11.push(c);
            }
            if ((x > this.gameHalf || x + r > this.gameHalf) && y <= this.gameHalf) { // 2
                sect22.push(c);
            }
            if (x <= this.gameHalf && (y > this.gameHalf || y + r > this.gameHalf)) { // 3
                sect33.push(c);
            }
            if ((x > this.gameHalf || x + r > this.gameHalf) && (y > this.gameHalf || y + r > this.gameHalf)) { // 4
                sect44.push(c);
            }
        }

        // console.log(sect1, sect2, sect3, sect4);
        // console.log(sect11, sect22, sect33, sect44);

        this.collF(sect1, sect11);
        this.collF(sect2, sect22);
        this.collF(sect3, sect33);
        this.collF(sect4, sect44);

        // console.log(this.antO);
        return [this.antO, this.gameO];
    }
    collF(ar, gr) { // pole idček
        for (let i = 0; i < ar.length; i++) {
            for (let j = i + 1; j < ar.length; j++) {
                this.movingCircleCollision(this.antO[ar[i]], this.antO[ar[j]]);
            }

            // console.log("pre ant, gameO coll", ar.length,  gr.length);

            for (let k = 0; k < gr.length; k++) {
                // if(this.gameO[gr[k]].c) this.circleCollision(this.antO[ar[i]], this.gameO[gr[k]]);
                // else this.rectangleCollision(this.antO[ar[i]], this.gameO[gr[k]]);

                // console.log("ant, gameO coll");

                this.circleCollision(this.antO[ar[i]], this.gameO[gr[k]]);
            }
        }
    }
    movingCircleCollision(c1, c2) { // ant, ant
        let combinedRadii, overlap, xSide, ySide,
            s = {},
            hit = false;

        s.vx = (c2.x + c2.r) - (c1.x + c1.r);
        s.vy = (c2.y + c2.r) - (c1.y + c1.r);

        s.magnitude = Math.sqrt(s.vx * s.vx + s.vy * s.vy);

        // console.log(s.magnitude);

        if(s.magnitude < this.attackRadius && c1.o != c2.o){
            c1.at = c2.id;
            c2.at = c1.id;
        }

        combinedRadii = c1.r + c2.r;

        if (s.magnitude < combinedRadii) {

            hit = true;

            overlap = combinedRadii - s.magnitude;

            overlap += 1;

            s.dx = s.vx / s.magnitude;
            s.dy = s.vy / s.magnitude;

            s.vxHalf = Math.abs(s.dx * overlap / 2);
            s.vyHalf = Math.abs(s.dy * overlap / 2);

            (c1.x > c2.x) ? xSide = 1: xSide = -1;
            (c1.y > c2.y) ? ySide = 1: ySide = -1;

            c1.x = c1.x + (s.vxHalf * xSide);
            c1.y = c1.y + (s.vyHalf * ySide);
            c2.x = c2.x + (s.vxHalf * -xSide);
            c2.y = c2.y + (s.vyHalf * -ySide);

            c1.xx += s.vxHalf * xSide;
            c1.yy += s.vyHalf * ySide;
            c2.xx += s.vxHalf * -xSide;
            c2.yy += s.vyHalf * -ySide;

            if (!c1.hit) c1.hit = [];
            c1.hit.push(["a", c2.id]);
            if (!c2.hit) c2.hit = [];
            c2.hit.push(["a", c1.id]);
        }
        return hit;
    }
    circleCollision(c1, c2) { // ant, gameO
        let magnitude, combinedRadii, overlap,
            vx, vy, dx, dy, s = {},
            hit = false;

        vx = (c2.x + c2.r) - (c1.x + c1.r);
        vy = (c2.y + c2.r) - (c1.y + c1.r);

        // console.log("1", vx, vy);

        magnitude = Math.sqrt(vx * vx + vy * vy);
        
        // attackuje jenom cizí
        if(c2.dmg && magnitude < this.gameORadius && c1.o != c2.o){
            c2.at = c1.id; // attack nastavuju jenom gameO
        }

        // healuje jenom svoje
        if(c2.heal && magnitude < c2.heal && c1.o == c2.o){
            if(!c2.he) c2.he = [];
            c2.he.push(c1.id); // heal nastavuju jenom gameO
        }

        combinedRadii = c1.r + c2.r;

        if (magnitude < combinedRadii) {

            hit = true;

            overlap = combinedRadii - magnitude;

            // quantumPadding = 0.3;
            overlap += 0.3;

            dx = vx / magnitude;
            dy = vy / magnitude;

            c1.x -= overlap * dx;
            c1.y -= overlap * dy;

            c1.xx -= overlap * dx;
            c1.yy -= overlap * dy;

            if (!c1.hit) c1.hit = [];
            c1.hit.push(["g", c2.id]);
        }
        return hit;
    }
    rectangleCollision(r1, r2) {
        let combined, overlapX, overlapY, vx, vy, hit = false;

        // vx = (r1.x + Math.abs(r1.halfWidth) - r1.xAnchorOffset) - (r2.x + Math.abs(r2.halfWidth) - r2.xAnchorOffset);
        // vy = (r1.y + Math.abs(r1.halfHeight) - r1.yAnchorOffset) - (r2.y + Math.abs(r2.halfHeight) - r2.yAnchorOffset);

        vx = (r1.x + r1.r) - (r2.x + r2.r);
        vy = (r1.y + r1.r) - (r2.y + r2.r);

        // console.log(r1, r2);
        // console.log("2", vx, vy);


        combined = r1.r + r2.r;

        // console.log(combined);

        if (Math.abs(vy) < combined && Math.abs(vx) < combined) {
            hit = true;
            overlapX = combined - Math.abs(vx);
            overlapY = combined - Math.abs(vy);

            if (overlapX >= overlapY) {
                if (vy > 0) {
                    r1.y += overlapY;
                    r1.yy += overlapY;
                } else {
                    r1.y -= overlapY;
                    r1.yy -= overlapY;
                }
            } else {
                if (vx > 0) {
                    r1.x += overlapX;
                    r1.xx += overlapX;
                } else {
                    r1.x -= overlapX;
                    r1.xx -= overlapX;
                }
            }

            if (!r1.hit) r1.hit = [];
            r1.hit.push(["g", r2.id]);
        }
        return hit;
    }
    rectToRect(r1, r2) {
        let hit = false;
        if (r1.r.x < r2.r.x + r2.s &&
          r1.r.x + r1.s > r2.r.x &&
          r1.r.y < r2.r.y + r2.s &&
          r1.s + r1.r.y > r2.r.y) {
            hit = true;
        }
    
        return hit;
    }
}

try {
    self.onmessage = function (e) { // client
        if (self.worker === undefined) {
            self.worker = new Worker(e.data.gameW, e.data.attackRadius, e.data.gameORadius);
        } else {
            const [antO, gameO] = worker.collide(JSON.parse(e.data.antArr), JSON.parse(e.data.gameOArr));
            postMessage({
                antO: JSON.stringify(antO),
                gameO: JSON.stringify(gameO)
            });
        }
    }
} catch (error) {
    process.on("message", (e) => { // server
        if (this.worker === undefined) {
            // console.log(e.gameW, e.attackRadius);
            this.worker = new Worker(e.gameW, e.attackRadius, e.gameORadius);
        } else {
            const [antO, gameO] = this.worker.collide(JSON.parse(e.antArr), JSON.parse(e.gameOs));
            process.send({
                msg: "collide",
                antO: JSON.stringify(antO),
                gameO: JSON.stringify(gameO)
            });
        }
    })
}