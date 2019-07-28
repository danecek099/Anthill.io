const PF = require("./pathfinding");
const Settings = require('./public/gameMainProperties').Settings;
const S = new Settings();

class Path {
    constructor(s) {
        this.s = s;

        this.finder = new PF.AStarFinder({
            allowDiagonal: true,
            dontCrossCorners: true
        });

        /**
         * Má prohozený souřadnice
         */
        this.f = new Array(this.s.resW);
        for (var x = 0; x < this.s.resW; x++) {
            this.f[x] = new Array(this.s.resW);
            for (var y = 0; y < this.s.resW; y++) {
                this.f[x][y] = 0;
            }
        }

        this.grid = new PF.Grid(this.f);

        this.removeObject = this.removeObject.bind(this);
        this.addObject = this.addObject.bind(this);
        this.doPath = this.doPath.bind(this);
        this.toReal = this.toReal.bind(this);
        this.findPoint2 = this.findPoint2.bind(this);
        this.findPointEx = this.findPointEx.bind(this);
        this.randPos = this.randPos.bind(this);
        this.findFreePos = this.findFreePos.bind(this);
    }

    /**
     * co je tohle kurwa za píčovinu
     */
    removeObject(gameObjects){
        if(gameObjects.length != 0){
            for (let x = 0; x < this.s.resW; x++) {
                for (let y = 0; y < this.s.resW; y++) {
                    if(this.f[x][y] == 1){
                        for(const obj of gameObjects){
                            const left = obj.dX;
                            const right = obj.dX + obj.dS;
                            const top = obj.dY;
                            const bottom = obj.dY + obj.dS;
                            
                            if( y >= left && y <= right && x >= top && x <= bottom ){ //jakoby collider
                                this.f[x][y] = 0;
                            }
                        }
                    }
                }
            }
        } else {
            return false
        }
        //console.log(this.f);
        this.grid = new PF.Grid(this.f);
    }
    /**
     * Přidá do collideru GameO z pole, bool zamezí počítání gridu
     */
    addObject(gameObjects, makeGrid = true){
        //console.log(gameObjects);
        if(gameObjects.length != 0){
            for (let x = 0; x < this.s.resW; x++) {
                for (let y = 0; y < this.s.resW; y++) {
                    if(this.f[x][y] == 0){
                        for(const obj of gameObjects){
                            const left = obj.dX;
                            const right = obj.dX + obj.dS;
                            const top = obj.dY;
                            const bottom = obj.dY + obj.dS;
                            
                            if( y >= left && y <= right && x >= top && x <= bottom ){ //jakoby collider
                                this.f[x][y] = 1;
                            }
                        }
                    }
                }
            }
        }

        if(makeGrid)
            this.grid = new PF.Grid(this.f);
        // return this.f;
    }

    doPath(start, end){
        // console.log("doPath", start, end);
        const ress = this.s.gridRess;
        const clone = this.grid.clone();
        let x = Math.round(start.x / ress);
        let y = Math.round(start.y / ress); // rozlišení gridu

        let x2 = Math.round(end.x / ress);
        let y2 = Math.round(end.y / ress);
        let s = end.s;

        // collider s hranou plochy
        if(x2 > this.s.resGcW || y2 > this.s.resGcW || x2 < this.s.resGcA || y2 < this.s.resGcA) return false;
        
        if(!clone.isWalkableAt(x, y)){ // start point
            // console.log("x y", x, y);
            const res = this.findPoint2(x, y).raw;
            // console.log("res", res);
            if(res) [x, y] = res;
            else return false;
        }

        if(!clone.isWalkableAt(x2, y2)){
            if(s == undefined){ // neplatnej BOD blízko/kolem gameO
                const res = this.findPoint2(x2, y2).raw;
                if(res){
                    [x2, y2] = res;
                } else return false;
            } else { // nejbližší bod ke gameO
                var pointArr = [], min = Infinity, point;

                //console.log("a", x, y, x2, y2, s, Math.round(s / 2));
                const half = Math.round(s / 2);
                const mod = s % 2 == 0 ? -1 : 0;

                //                                         + 1 fix 1.5.18
                for(let i = x2 - half + mod; i <= x2 + half + 1; i++){
                    for(let j = y2 - half + mod; j <= y2 + half + 1; j++){
                        if(clone.isWalkableAt(i ,j)){
                            //console.log("ij", i, j);
                            let vx = Math.abs(i - x),
                                vy = Math.abs(j - y),
                                magnitude = Math.sqrt(vx * vx + vy * vy);
                            if(magnitude < min){
                                min = magnitude;
                                point = [i, j];
                            }
                        }
                    }
                }
                //console.log(point);
                if(point){
                    [x2, y2] = point;
                } else return false;
            }
        }
        //console.log(clone.isWalkableAt(x, y), clone.isWalkableAt(x2, y2));
        //console.log("b", x, y, x2, y2);
        const path = this.finder.findPath(x, y, x2, y2, clone);
        let path2;
        try{
            path2 = PF.Util.smoothenPath(this.grid, path);
            path2 = this.toReal(path2);
        }catch(e){
            // console.error("zas ta chyba");
            return false;
        }

        if(end.atack){
            path2.push("target");
        }

        /**
         * první point je start pozice,
         * kvůli zaokrouhlování musí pryč
         */
        path2.splice(0, 1);

        return path2;
    }

    toReal(array){
        let ress = this.s.gridRess;
        array.forEach((element) => {
            element[0] *= ress;
            element[1] *= ress; 
        });
        return array;
    }

    findPoint2(x, y){
        let s = 0;

        while(s < 5){ // max dS 5 asi...
            s++;                   // round() + 1 -> 23.02, v3.2
            for(let i = x - Math.round(s / 2) + 1; i < x + s - 1; i++){
                for(let j = y - Math.round(s / 2) + 1; j < y + s - 1; j++){
                    if(this.grid.isWalkableAt(i, j)) return {
                        raw: [i, j],
                        toReal: () => this.toReal(new Array([i, j]))[0]
                    }
                }
            }
        }
        return false;
    }
    
    /**
    * Vrací nejbližší možné walkable body od zadaného bodu
    */
    findPointEx(x2, y2){
        x2 = Math.round(x2 / this.s.gridRess);
        y2 = Math.round(y2 / this.s.gridRess);
        const res = this.findPoint2(x2, y2);
        return res ? res.toReal() : res;
    }

    /**
     * Random pozice uvnitř gameBorder
     */
    randPos(dS = 0){
        // const dX = Math.floor((Math.random() * (this.s.resGcW - 2 * dS - 1)) + this.s.resGcA + 1);
        // const dY = Math.floor((Math.random() * (this.s.resGcW - 2 * dS - 1)) + this.s.resGcA + 1);
        const dX = Math.floor((Math.random() * (this.s.resGcW - 2 * dS - 1)) + this.s.resGcA);
        const dY = Math.floor((Math.random() * (this.s.resGcW - 2 * dS - 1)) + this.s.resGcA);

        return [dX, dY];
    }

    /**
     * Najde volný místo pro s*s
     */
    findFreePos(dS){
        const fc = () => {
            const [dX, dY] = this.randPos(dS);
    
            for(let x = dX; x < dX + dS; x++){
                for(let y = dY; y < dY + dS; y++){
                    
                    if(this.f[y][x] == 1) return false;
                }
            }

            return [dX, dY];
        }

        while(true){
            const ret = fc();
            if(ret) return ret
        }
    }
}

process.on("message", (e) => { // server
    if (this.path === undefined) {
        this.path = new Path(S);

    } else {
        // action, dataArr
        const action = e.action;
        const paramArr = JSON.parse(e.paramArr);
        const reqId = e.reqId;

        // do action
        const retVal = this.path[action](...paramArr);

        process.send({
            action: action,
            retVal: retVal && JSON.stringify(retVal),
            reqId: reqId
        });
    }
})