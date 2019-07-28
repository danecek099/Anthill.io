class Path {
    constructor(id) {
        this.process = require('child_process').fork('modules/patherProcess.js');
        this.process.on("message", this.processReturn.bind(this));
        this.process.send({});
        this.process.on("close", () => console.log("p" + id + " closed"))

        this.reqArr = [];
    }

    processReturn(message){
        const retVal = message.retVal && JSON.parse(message.retVal);
        const reqId = message.reqId;

        if(reqId){
            this.reqArr[reqId - 1](retVal);
        }
    }

    /**
     * return undefined
     */
    removeObject(gameObjects){
        this.process.send({
            action: "removeObject",
            paramArr: JSON.stringify([gameObjects])
        });
    }

    /**
     * Přidá do collideru GameO z pole, bool zamezí počítání gridu
     * 
     * return undefined
     */
    addObject(gameObjects, makeGrid = true){
        this.process.send({
            action: "addObject",
            paramArr: JSON.stringify([gameObjects, makeGrid])
        });
    }

    /**
     * return Promise resolve
     */
    doPath(start, end){
        return new Promise((jo) => {

            const reqId = this.reqArr.push(retVal => {
                jo(retVal);
            });
            
            this.process.send({
                action: 'doPath',
                paramArr: JSON.stringify([start, end]),
                reqId: reqId
            });

        });
    }

    /**
    * Vrací nejbližší možné walkable body od zadaného bodu
    * 
    * return Promise resolve
    */
    findPointEx(x2, y2){
        return new Promise((jo) => {

            const reqId = this.reqArr.push(retVal => {
                jo(retVal);
            });
            
            this.process.send({
                action: 'findPointEx',
                paramArr: JSON.stringify([x2, y2]),
                reqId: reqId
            });

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
                jo(retVal);
            });
            
            this.process.send({
                action: 'findFreePos',
                paramArr: JSON.stringify([dS]),
                reqId: reqId
            });
        });
    }

    kill(){
        this.process.kill();
    }
}

module.exports = Path;