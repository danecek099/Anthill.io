const {chunksToLinesAsync} = require('@rauschma/stringio');

class Path {
    constructor(id) {
        this.process = require('child_process').spawn(
            'java', ['-jar', 'javatest/oof.jar', ''], {
                stdio: ["pipe", "pipe", "pipe"]
            }
        );

        this.process.on("close", () => console.log("pather " + id + " closed"));
        this.process.stderr.on('data', (d) => {
            console.log("path err:", d.toString());
        });

        this.reqArr = [];

        this.read(this.process.stdout);
    }

    async read(readable) {
        for await (const line of chunksToLinesAsync(readable)) {
            const data = JSON.parse(line);
            // console.log('LINE:', data);
            this.processReturn(data);
        }
    }

    processReturn(message){
        const reqId = message.shift();

        this.reqArr[reqId - 1](message);
    }

    /**
     * return undefined
     */
    removeObject(gameObjects){
        // console.log(JSON.stringify(["removeObject", ...gameObjects]));
        this.process.stdin.write(JSON.stringify(["removeObject", ...gameObjects]) + "\n");
    }

    /**
     * Přidá do collideru GameO z pole, bool zamezí počítání gridu
     * 
     * return undefined
     */
    addObject(gameObjects){
        // console.log(JSON.stringify(["addObject", ...gameObjects]));
        this.process.stdin.write(JSON.stringify(["addObject", ...gameObjects]) + "\n");
    }

    /**
     * return Promise resolve
     */
    doPath(start, end){
        return new Promise((jo) => {

            const reqId = this.reqArr.push(retVal => {
                jo(retVal);
            });
            
            // console.log(JSON.stringify(["findPath", reqId, {
            //     x1: start.x,
            //     y1: start.y,
            //     x2: end.x,
            //     y2: end.y,
            //     s: end.s,
            //     attack: end.atack
            // }]));
            this.process.stdin.write(JSON.stringify(["findPath", reqId, {
                x1: start.x,
                y1: start.y,
                x2: end.x,
                y2: end.y,
                s: end.s,
                attack: end.atack
            }]) + "\n");
        });
    }

    /**
    * Vrací nejbližší možné walkable body od zadaného bodu
    * 
    * return Promise resolve
    */
    findPointEx(x, y){
        return new Promise((jo) => {

            const reqId = this.reqArr.push(retVal => {
                jo(retVal[0]);
            });

            this.process.stdin.write(JSON.stringify(["findPointEx", reqId, {x, y}]) + "\n");
        });
    }

    /**
     * Najde volný místo pro s*s 
     * 
     * return Promise resolve
     */
    findFreePos(dS){
        return new Promise((jo) => {

            const reqId = this.reqArr.push(retVal => {
                jo(retVal[0]);
            });

            this.process.stdin.write(JSON.stringify(["findFreePos", reqId, {dS}]) + "\n");
        });
    }

    kill(){
        this.process.kill();
    }
}

module.exports = Path;