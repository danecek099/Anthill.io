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
        try {
            this.process.stdin.write(JSON.stringify(["removeObject", ...gameObjects]) + "\n");
        } catch (error) {
            this.suicide();
        }
    }

    /**
     * Přidá do collideru GameO z pole, bool zamezí počítání gridu
     * 
     * return undefined
     */
    addObject(gameObjects){
        try {
            this.process.stdin.write(JSON.stringify(["addObject", ...gameObjects]) + "\n");
        } catch (error) {
            this.suicide();
        }
    }

    /**
     * return Promise resolve
     */
    doPath(start, end){
        return new Promise((jo) => {

            const reqId = this.reqArr.push(retVal => {
                jo(retVal);
            });
            
            try {
                this.process.stdin.write(JSON.stringify(["findPath", reqId, {
                    x1: start.x,
                    y1: start.y,
                    x2: end.x,
                    y2: end.y,
                    s: end.s,
                    attack: end.atack
                }]) + "\n");
            } catch (error) {
                this.suicide();
            }
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

            try {
                this.process.stdin.write(JSON.stringify(["findPointEx", reqId, {x, y}]) + "\n");
            } catch (error) {
                this.suicide();
            }
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

            try {
                this.process.stdin.write(JSON.stringify(["findFreePos", reqId, {dS}]) + "\n");
            } catch (error) {
                this.suicide();
            }
        });
    }

    kill(){
        this.process.kill();
    }
}

module.exports = Path;