class Settings{
    constructor(){
        this.COLOR_RED =            0xc0392b; // hodně red
        this.COLOR_RED2 =           0xe74c3c; // míň red
        this.COLOR_RED3 =           0xed6a67; // ještě míň red
        this.COLOR_GREEN =          0x27ae60;
        this.COLOR_LIGHT_GREEN =    0x2ecc71;
        this.COLOR_BLUE =           0x2980b9;
        this.COLOR_VIOLET =         0x9b59b6;
        this.COLOR_BACKGROUND =     0xfce8c7;
        this.COLOR_ASPHALT =        0x34495e;
        this.COLOR_GREY =           0xbdc3c7;
        this.COLOR_ASBESTOS =       0x7f8c8d;
        this.COLOR_LIGHT_GREY =     0xecf0f1;
        this.COLOR_SEA =            0x16a085;
        this.COLOR_OUTLINE_RED =    0x353b48; // teď skoročerná
        this.COLOR_OUTLINE_GREEN =  0x2ecc71;
        this.COLOR_OUTLINE_LIGHT =  0xededed;
        this.COLOR_HP =             0x2ecc71;
        this.COLOR_HP_ENEMY =       0xe74c3c;
        this.COLOR_UI =             0xdfe4ea;
        this.COLOR_YELLOW =         0xffcf0d;
        this.COLOR_WHITE =          0xffffff;
        this.COLOR_DEEPBLUE =       0x192a56;
        this.COLOR_DEEPBLUEL =      0x314d95;
        this.COLOR_FONT =           0xc7cce2;
        this.COLOR_DRAG_FILL =      0x51b5f0;
        this.COLOR_DRAG_LINE =      0x0080c0;

        this.BLU1 =                 0x30336b; // pozadí
        this.BLU3 =                 0x130f40; // ui
        this.BLU4 =                 0x5457b1; // ještě světlejší

        // další
        this.GREE1 =                0x7b9ad2; // gameO, buttony
        this.GREE2 =                0xb5ffaa; // ant
        this.REE1 =                 0xd24646; // gameO
        this.REE2 =                 0xde7676; // ant

        // this.FONT_COLOR =           "#bdc3c7";
        this.FONT_COLOR =           "#c7cce2";

        // nadpis infa
        this.TXT_0 = "Headquarters";
        this.TXT_1 = "Barracks";
        this.TXT_2 = "Farm";
        this.TXT_3 = "Factory";
        this.TXT_4 = "Grape Astonishment";
        this.TXT_5 = "Blueberry Joy";
        this.TXT_6 = "Tower";
        this.TXT_7 = "Star Fruit Jam";
        this.TXT_8 = "Wall";
        this.TXT_9 = "Heal";
        this.TXT_10 = "Worker";
        this.TXT_11 = "Stronger";
        this.TXT_12 = "Faster";
        // text1 v infu
        this.TXT1_HP = "HP";
        this.TXT1_SPAWNING = "Spawning";
        this.TXT1_UPGRADING = "Upgrading";
        this.TXT1_MINE_CAP = "Capacity";
        this.TXT1_MINE_PS = "Item per attack";
        this.TXT1_DMG = "Dmg per attack";
        this.TXT1_SPEED = "Speed";
        this.TXT1_ARMOR = "Armor";
        this.TXT1_HEAL = "Heal per sec";
        // další texty
        this.TXTe_LOADING = "Loading...";
        this.TXTe_ROOMFULL = "Room is full";
        this.TXTe_UNIT = "Units";
        this.TXTe_DEAD = "You died";
        this.TXTe_GAME_RESTART = "Game restarted, pls wait";
        this.TXTe_INSF_ITEMS = "Insufficient items";
        this.TXTe_MAX_LVL = " max lvl"; // ta mezera tam musí být
        this.TXTe_QUEUE_FULL = "Queue is full";
        this.TXTe_MAX_UNITS = "Max units";
        this.TXTe_MAX_BUILD = "Maximum buildings of this type";
        this.TXTe_ROOM = "Room "; // mezera!
        this.TXTe_OFFLINE = "Offline";
        this.TXTe_NAME = "Name:";
        this.TXTe_PLAYERS = "Players: "; // mezera!
        this.TXTe_FULL = "Full";
        this.TXTe_CH_ROOM = "Change room";
        this.TXTe_HELP_INFO = "Help | Info";
        this.TXTe_MORE_IO = "More .io Games";
        this.TXTe_CLICK_HIDE = "Click to hide";
        this.TXTe_HELP_TEXT = "‌‌--- Help ---\r"
            + "Move view: wasd, arrows, clicking on map\r"
            + "Select units: press & drag cursor\r"
            + "Move units: right‌‌ mouse btn\r"
            + "Cancel building selection: right mouse btn\r"
            + "Units not moving: try later, the server is under high load\r"
            + "Room will restart after all yellow resources are destroyed\n\r"
            + "Found an error?\n";
        this.TXTe_SUBMIT = "Submit";
        this.TXTe_LOW_FPS = "Low FPS?";
        this.TXTe_HELP = "Help";
        this.TXTe_CANCEL = "Cancel";
        this.TXTe_DISCORD = "Discord";
        this.TXTe_LAG = "Server is overloaded\rActions may be delayed";
        this.TXTe_CALC = "Calculating...";

        // hover nad controls
        this.TXT_GAMEOPREV_0 = "Main building, spawns workers. Don't let it be destroyed!";
        this.TXT_GAMEOPREV_1 = "More kinds of units";
        this.TXT_GAMEOPREV_2 = "Adds more unit space\rMax 6";
        this.TXT_GAMEOPREV_3 = "Upgrades properties of your units";
        this.TXT_GAMEOPREV_6 = "Defense tower\rMax 3";
        this.TXT_GAMEOPREV_8 = "Just a wall";
        this.TXT_GAMEOPREV_9 = "Heals units in a radius from the building";
        this.TXT_ATTACK_THIS = "Attack with all units";
        this.TXT_SET_SPAWN = "Sets the spawn target";
        this.TXT_SPAWN_ANT = "Spawn Worker unit";
        this.TXT_CONVENE = "Call all units back here";
        this.TXT_MINE_THIS = "Mine with all units";
        this.TXT_DESTROY = "Destroying will return half of the price";
        this.TXT_DESTROY_BASE = "Destroying Headquarters will end the game";
        this.TXT_UP = "Upgrade";

        // gameName
        this.GM = "Anthill.io";
        
        this.gameW = 10000;
        this.visibleAreaDef = 700; // neměnit! posere to UI. bylo to 700 kdybys to stejně zkurvil
        this.resolution = 2; // tohle bych taky moc neměnil...
        this.visibleArea = this.visibleAreaDef * this.resolution;
        this.gameBorder = 100;
        this.cursorBorder = 0; // 35
        this.gridRess = 20;
        this.fps = 12; // 12
        this.attackRadius = 150;
        this.attackMax = 400;
        this.gameORadius = 180; // attack, 150
        this.gameOHealRadius = 150; // heal, 150
        this.antTimeout = 500;
        this.gameOGapPx = -8; // -8
        this.gameOAttackDelay = 300;
        this.roomRestartTreshold = 5;
        this.roomRestartTimeout = 180; // s
        this.healDelay = 1000;
        this.responseDelay = 1800; // ms
        this.spawnDistance = 250;
        
        this.baseSet = { // mělo to být spojený se statama...
            maxAnt: 100, // 10

            maxFarm: 6,
            curFarm: 0,

            maxTower: 3,
            curTower: 0
        }
        this.stats = {
            item0: 3000,  // obyč mrdky, 30
            item1: 3000,  // pro ty, co budou spíš útočit, 30
            gold: 3000,   // tak nějak pro všechny stejný, 30
            ants: 0
        }

        // this.baseSet = { // mělo to být spojený se statama...
        //     maxAnt: 100,
        //     maxFarm: 6,
        //     curFarm: 0
        // }
        // this.stats = {
        //     item0: 3000,  // obyč mrdky
        //     item1: 3000,  // pro ty, co budou spíš útočit
        //     gold: 3000,   // tak nějak pro všechny stejný
        //     ants: 0
        // }

        /**
         * - attackSet: to, co nemůžou težit
         * - armor prostě odečítá od dmge
        */
        this.ant = {
            // jednotka na těžbu / základní jednotka                                                                               3
            10: {s: 18, defSpeed: 8, shape: 3, color: this.COLOR_GREEN, icon: "ic24", dmgVal: 1, defHp: 100, armor: 0, spawnDelay: 0, attackSet: [], cost: {item0: 5, item1: 5, gold: 5}, lvl: 1},
            // jednotka pro útok
            11: {s: 18, defSpeed: 5, shape: 3, color: this.COLOR_VIOLET, icon: "ic25", dmgVal: 5, defHp: 200, armor: 0, spawnDelay: 5, attackSet: [4, 5, 7], cost: {item0: 60, item1: 150, gold: 70}, lvl: 1},
            // průzkumná jednotka
            12: {s: 18, defSpeed: 12, shape: 3, color: this.COLOR_BLUE, icon: "ic26", dmgVal: 3, defHp: 50, armor: 3, spawnDelay: 4, attackSet: [4, 5, 7], cost: {item0: 100, item1: 40, gold: 50}, lvl: 1},
            //test
            // 13: {s: 18, defSpeed: 40, shape: 3, color: this.COLOR_BLUE, icon: "ic26", dmgVal: 6, defHp: 50, armor: 3, spawnDelay: 1, attackSet: [], cost: {item0: 0, item1: 0, gold: 0}}
        }

        /**
         * Pole těžitelných / defaultních budov
         */
        this.defGameO = [4, 5, 7];
        
        this.gameO = {
            0: {dS: 4, defHp: 500, armor: 0, color: this.COLOR_BLUE, icon: "ic1", shape: 3, spawnDelay: 1, cost: {item0: 5, item1: 5, gold: 5}, lvl: 1},
            // kasárny - továrna
            1: {dS: 3, defHp: 200, armor: 0, color: this.COLOR_VIOLET, icon: "ic2", shape: 3, spawnDelay: 8, cost: {item0: 50, item1: 200, gold: 100}, lvl: 1},
            // farma - zvyšuje max počet jednotek
            2: {dS: 3, defHp: 100, armor: 0, color: this.COLOR_GREY, icon: "ic3", shape: 3, unitValue: 11, spawnDelay: 5, cost: {item0: 100, item1: 20, gold: 60}, lvl: 1},
            // kovárna - vylepšování statů
            3: {dS: 3, defHp: 200, armor: 0, color: this.COLOR_SEA, icon: "ic4", shape: 3, spawnDelay: 10, cost: {item0: 800, item1: 800, gold: 1200}, lvl: 1},
            // ty tři těžitelný
            4: {dS: 3, defHp: 3000, armor: 0, color: this.COLOR_LIGHT_GREEN, icon: "lp1", prt: "prt1", shape: 3, mineable: true, ps: 1, item: "item0"},
            5: {dS: 3, defHp: 3000, armor: 0, color: this.COLOR_VIOLET, icon: "lp3", prt: "prt3", shape: 3, mineable: true, ps: 1, item: "item1"},
            7: {dS: 3, defHp: 3000, armor: 0, color: this.COLOR_YELLOW, icon: "lp2", prt: "prt2", shape: 3, mineable: true, ps: 1, item: "gold"},
            // obranná? či co
            6: {dS: 3, defHp: 350, armor: 0, color: this.COLOR_RED2, icon: "ic20", shape: 3, spawnDelay: 5, cost: {item0: 120, item1: 300, gold: 200}, dmgVal: 10, lvl: 1},
            // zeď
            8: {dS: 2, defHp: 200, armor: 3, color: this.COLOR_ASPHALT, icon: "ic6", shape: 3, spawnDelay: 3, cost: {item0: 70, item1: 50, gold: 70}, lvl: 1},
            // heal
            9: {dS: 2, defHp: 100, armor: 3, color: this.COLOR_GREEN, icon: "ic16", shape: 3, spawnDelay: 10, cost: {item0: 400, item1: 100, gold: 400}, lvl: 1, healVal: 1},
        }

        /**
         * Představuje lvl upgradů podle jejich id
         */
        this.upgraded = {
            0: 1,
            1: 1,
            2: 1,
            3: 1,
            4: 1
        }

        this.upgrade = { // představuje tlačítka
            0: { to: "ant", type: 10, desc: this.TXT_10,
                2: {cost: {item0: 100, item1: 50, gold: 50}, up: [{key: "dmgVal", val: 1}, {key: "defHp", val: 110}, {key: "defSpeed", val: 9}], upgradeDelay: 7},
                3: {cost: {item0: 200, item1: 80, gold: 80}, up: [{key: "dmgVal", val: 1}, {key: "defHp", val: 120}, {key: "defSpeed", val: 10}], upgradeDelay: 10},
                4: {cost: {item0: 350, item1: 200, gold: 200}, up: [{key: "dmgVal", val: 2}, {key: "defHp", val: 130}, {key: "defSpeed", val: 11}, {key: "armor", val: 1}], upgradeDelay: 13},
                5: {cost: {item0: 420, item1: 250, gold: 250}, up: [{key: "dmgVal", val: 2}, {key: "defHp", val: 140}, {key: "defSpeed", val: 12}, {key: "armor", val: 2}], upgradeDelay: 17}
            },
            1: { to: "ant", type: 11, desc: this.TXT_11,
                2: {cost: {item0: 100, item1: 50, gold: 50}, up: [{key: "dmgVal", val: 6}, {key: "defHp", val: 220}, {key: "defSpeed", val: 6}], upgradeDelay: 7},
                3: {cost: {item0: 200, item1: 150, gold: 150}, up: [{key: "dmgVal", val: 7}, {key: "defHp", val: 240}, {key: "defSpeed", val: 7}, {key: "armor", val: 2}], upgradeDelay: 10},
                4: {cost: {item0: 350, item1: 200, gold: 200}, up: [{key: "dmgVal", val: 7}, {key: "defHp", val: 260}, {key: "defSpeed", val: 8}, {key: "armor", val: 2}], upgradeDelay: 13},
                5: {cost: {item0: 420, item1: 300, gold: 300}, up: [{key: "dmgVal", val: 8}, {key: "defHp", val: 280}, {key: "defSpeed", val: 9}], upgradeDelay: 17}
            },
            2: { to: "ant", type: 12, desc: this.TXT_12,
                2: {cost: {item0: 100, item1: 50, gold: 50}, up: [{key: "dmgVal", val: 3}, {key: "defHp", val: 70}, {key: "defSpeed", val: 13}], upgradeDelay: 7},
                3: {cost: {item0: 200, item1: 150, gold: 150}, up: [{key: "dmgVal", val: 4}, {key: "defHp", val: 80}, {key: "defSpeed", val: 14}, {key: "armor", val: 5}], upgradeDelay: 10},
                4: {cost: {item0: 350, item1: 200, gold: 200}, up: [{key: "dmgVal", val: 4}, {key: "defHp", val: 90}, {key: "defSpeed", val: 15}, {key: "armor", val: 5}], upgradeDelay: 13},
                5: {cost: {item0: 420, item1: 300, gold: 300}, up: [{key: "dmgVal", val: 5}, {key: "defHp", val: 100}, {key: "defSpeed", val: 16}], upgradeDelay: 17}
            },
            3: { to: "gameO", type: 8, desc: this.TXT_8,
                2: {cost: {item0: 100, item1: 50, gold: 50}, up: [{key: "defHp", val: 220}, {key: "armor", val: 3}], upgradeDelay: 7},
                3: {cost: {item0: 200, item1: 150, gold: 150}, up: [{key: "defHp", val: 240}, {key: "armor", val: 3}], upgradeDelay: 10},
                4: {cost: {item0: 350, item1: 200, gold: 200}, up: [{key: "defHp", val: 270}, {key: "armor", val: 4}], upgradeDelay: 13},
                5: {cost: {item0: 420, item1: 300, gold: 300}, up: [{key: "defHp", val: 310}, {key: "armor", val: 5}], upgradeDelay: 17}
            },
            4: { to: "gameO", type: 9, desc: this.TXT_9,
                2: {cost: {item0: 100, item1: 50, gold: 50}, up: [{key: "defHp", val: 150}, {key: "armor", val: 3}], upgradeDelay: 7},
                3: {cost: {item0: 200, item1: 150, gold: 150}, up: [{key: "defHp", val: 200}, {key: "armor", val: 3}, {key: "healVal", val: 2}], upgradeDelay: 10},
                4: {cost: {item0: 350, item1: 200, gold: 200}, up: [{key: "defHp", val: 270}, {key: "armor", val: 4}, {key: "healVal", val: 2}], upgradeDelay: 13},
                5: {cost: {item0: 420, item1: 300, gold: 300}, up: [{key: "defHp", val: 310}, {key: "armor", val: 5}, {key: "healVal", val: 3}], upgradeDelay: 17}
            },
        }

        /**
         * 750 x 750
         */

        this.gameObjects = [
            {dX: 50, dY: 50, type: 7},
            {dX: 150, dY: 50, type: 7},
            {dX: 250, dY: 50, type: 7},
            {dX: 350, dY: 50, type: 7},
            {dX: 450, dY: 50, type: 7},

            {dX: 50, dY: 150, type: 7},
            {dX: 150, dY: 150, type: 7},
            {dX: 250, dY: 150, type: 7},
            {dX: 350, dY: 150, type: 7},
            {dX: 450, dY: 150, type: 7},

            {dX: 50, dY: 250, type: 7},
            {dX: 150, dY: 250, type: 7},
            {dX: 250, dY: 250, type: 7},
            {dX: 350, dY: 250, type: 7},
            {dX: 450, dY: 250, type: 7},

            {dX: 50, dY: 350, type: 7},
            {dX: 150, dY: 350, type: 7},
            {dX: 250, dY: 350, type: 7},
            {dX: 350, dY: 350, type: 7},
            {dX: 450, dY: 350, type: 7},

            {dX: 50, dY: 450, type: 7},
            {dX: 150, dY: 450, type: 7},
            {dX: 250, dY: 450, type: 7},
            {dX: 350, dY: 450, type: 7},
            {dX: 450, dY: 450, type: 7},
        ]

        this.mineableCount = 100; // 100

        this.importList = [
            {name: "tx", dir: "obr/textureX.png"},

            {name: "ic1", dir: "obr/newIcons/icon1.png"},
            {name: "ic2", dir: "obr/newIcons/icon2.png"},
            {name: "ic3", dir: "obr/newIcons/icon3.png"},
            {name: "ic4", dir: "obr/newIcons/icon4.png"},
            {name: "ic5", dir: "obr/newIcons/icon5.png"},
            {name: "ic6", dir: "obr/newIcons/icon6.png"},
            {name: "ic7", dir: "obr/newIcons/icon7.png"},
            {name: "ic8", dir: "obr/newIcons/icon8.png"},
            {name: "ic9", dir: "obr/newIcons/icon9.png"},
            {name: "ic10", dir: "obr/newIcons/icon10.png"},
            {name: "ic11", dir: "obr/newIcons/icon11.png"},
            {name: "ic12", dir: "obr/newIcons/icon12.png"},
            {name: "ic13", dir: "obr/newIcons/icon13.png"},
            {name: "ic14", dir: "obr/newIcons/icon14.png"},
            {name: "ic14a", dir: "obr/newIcons/icon14a.png"},
            {name: "ic15", dir: "obr/newIcons/icon15.png"},
            {name: "ic16", dir: "obr/newIcons/icon16.png"},
            {name: "ic17", dir: "obr/newIcons/icon17.png"},
            {name: "ic18", dir: "obr/newIcons/icon18.png"},
            {name: "ic19", dir: "obr/newIcons/icon19.png"},
            {name: "ic20", dir: "obr/newIcons/icon20.png"},
            // {name: "ic21", dir: "obr/newIcons/icon21.png"}, // zelená
            // {name: "ic22", dir: "obr/newIcons/icon22.png"}, // žlutá
            // {name: "ic23", dir: "obr/newIcons/icon23.png"}, // fialová
            {name: "ic21", dir: "obr/newIcons/iconGrapes.png"}, // zelená
            {name: "ic22", dir: "obr/newIcons/iconStarfruit.png"}, // žlutá
            {name: "ic23", dir: "obr/newIcons/iconBlueberry.png"}, // fialová
            {name: "ic24", dir: "obr/newIcons/icon24.png"},
            {name: "ic25", dir: "obr/newIcons/icon25.png"},
            {name: "ic26", dir: "obr/newIcons/icon26.png"},
            {name: "ic27", dir: "obr/newIcons/icon27.png"},
            {name: "ic29", dir: "obr/newIcons/icon29.png"},
            {name: "ic30", dir: "obr/newIcons/icon30.png"},

            // {name: "lp1", dir: "obr/lp1.png"},  // zelená
            // {name: "lp2", dir: "obr/lp2a.png"}, // žlutá
            // {name: "lp3", dir: "obr/lp3.png"},  // fialová
            {name: "lp1", dir: "obr/grapes.png"},  // zelená
            {name: "lp2", dir: "obr/starfruit.png"}, // žlutá
            {name: "lp3", dir: "obr/blueberry.png"},  // fialová

            {name: "prt1", dir: "obr/prt1.png"},
            {name: "prt2", dir: "obr/prt2.png"},
            {name: "prt3", dir: "obr/prt3.png"}
        ]

        this.redT = {
            a: "t14a",
            b: "t14"
        }
        this.blueT = {
            a: "t17a",
            b: "t17"
        }
        this.defT = {
            a: "t12a",
            b: "t12"
        }

        this.servers = [
            {name: "Main", loc: "/s1"},
            {name: "Test", loc: "/s2"}
        ]

        this.opts = {
            fontSize: 14,
            fontWeight: "400",
            fill: this.FONT_COLOR,
            fontFamily: "\"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif"
        }

        this.motd = "Check out the Anthill.io Discord channel!";
    }

    /**
     * gameW / gridRess
     */
    get resW(){
        return this.gameW / this.gridRess;
    }
    /**
     * gameBorder / gridRess
     */
    get resGcA(){
        return this.gameBorder / this.gridRess;
    }
    /**
     * (gameW - gameBorder) / gridRess
     */
    get resGcW(){
        // return ((this.gameW - this.gameBorder) / this.gridRess) + 1;
        return ((this.gameW - this.gameBorder) / this.gridRess)
    }
    get gameContain(){
        return {
            x: this.gameBorder, 
            y: this.gameBorder, 
            width: this.gameW - 2*this.gameBorder, 
            height: this.gameW - 2*this.gameBorder
        }
    }
    get fpsToMs(){
        return 1000 / this.fps;
    }

    // getBaseLevels(){
    //     const obj = {};
        
    //     for(const ant in this.ant)
    //         obj[ant] = this.ant[ant].lvl;
                
    //     for(const gameO in this.gameO)
    //         obj[gameO] = this.gameO[gameO].lvl;

    //     return obj;
    // }
    delay(time){
        // return 100 / ((time * 1000) / this.fpsToMs);
        return 100 / (time * 12)
    }
}



/**
 * starý
 */

Object.defineProperty(Array.prototype, 'removeByIdS', {
    enumerable: false,
    value: function (removeId) {
        for (let i = 0; i < this.length; i++) {
            if (this[i].id == removeId) {
                return this.splice(i, 1)[0];
                i--;
            }
        }
    }
});

Object.defineProperty(Array.prototype, 'removeByOwnerS', {
    enumerable: false,
    value: function (removeOwner) {
        const pole = [];
        for (let i = 0; i < this.length; i++) {
            if (this[i].owner == removeOwner) {
                const a = this.splice(i, 1);
                //console.log(a);
                pole.push(...a);
                i--;
            }
        }
        return pole;
    }
});

Object.defineProperty(Array.prototype, 'getById', {
    enumerable: false,
    value: function (id) {
        for (let i = 0; i < this.length; i++) {
            if (this[i].id == id) {
                return this[i];
            }
        }
        return false;
    }
});

Object.defineProperty(Array.prototype, 'getByOwner', {
    enumerable: false,
    value: function (owner) {
        const pole = [];
        for (let i = 0; i < this.length; i++) {
            if (this[i].owner == owner) {
                pole.push(this[i]);
            }
        }
        return pole;
    }
});

Object.defineProperty(Array.prototype, 'removeByIdC', {
    enumerable: false,
    value: function (withThis, removeId) {
        for (let i = 0; i < this.length; i++) {
            if (this[i].id == removeId) {
                const to = this.splice(i, 1)[0];
                to.r.destroy();
                return to;
            }
        }
        return false;
    }
});

Object.defineProperty(Array.prototype, 'removeByOwnerC', {
    enumerable: false,
    value: function (withThis, removeOwner) {
        const pole = [];
        for (let i = 0; i < this.length; i++) {
            if (this[i].owner == removeOwner) {
                const to = this.splice(i, 1)[0];
                pole.push(to);
                to.r.destroy();
                i--;
            }
        }
        return pole;
    }
});

Object.defineProperty(Array.prototype, 'propsColl', {
    enumerable: false,
    value: function () {
        const a = {};
        this.forEach(b => {
            if(b.doCollide)
                a[b.id] = b.collProps
        });
        return a;
    }
});

Object.defineProperty(Array.prototype, 'propsCollJava', {
    enumerable: false,
    value: function () {
        const a = [];
        this.forEach(b => {
            if(b.doCollide)
                a.push(b.collProps);
        });
        return a;
    }
});

Object.defineProperty(Array.prototype, 'propsS', {
    enumerable: false,
    value: function(){
        const a = [];
        this.forEach(b => a.push(b.props));
        return a;
    }
});

Object.defineProperty(Array.prototype, 'propsD', {
    enumerable: false,
    value: function(){
        const a = [];
        this.forEach(b => a.push(b.propsD));
        return a;
    }
});

Object.defineProperty(Array.prototype, 'updateProps', {
    enumerable: false,
    value: function () {
        const a = {};
        this.forEach(b => a[b.id] = b.updateProps);
        return a;
    }
});

class SkoroArray{
    constructor(){
        /**
         * Key podle id
         */
        // this.tos = {};
        this.tos = Object.create(null);
    }

    /**
     * Uloží podle jeho id
     * @param {*} to Celý to
     */
    add(to){
        this.tos[to.id] = to;
    }
    /**
     * Vrátí to podle jeho id
     * 
     * Zbytečný ale
     * @param {Number} id to Id
     */
    getById(id){
        return this.tos[id];
    }
    /**
     * Vrátí [] to podle to.owner == socket.id
     * @param {String} owner Socket id
     */
    getByOwner(owner){
        const ret = [];
        for(const id in this.tos){
            if(this.tos[id] && this.tos[id].owner == owner){
                ret.push(this.tos[id]);
            }
        }

        return ret;
    }
    /**
     * Vrátí [] podle to.owner a to.type
     * @param {String} owner Socket id
     * @param {Number} type Typ
     */
    getByOwnerType(owner, type){
        const ret = [];
        for(const id in this.tos){
            if(this.tos[id] && this.tos[id].owner == owner && this.tos[id].type == type)
                ret.push(this.tos[id]);
        }

        return ret;
    }
    /**
     * Nastaví pozici na id = null
     * @param {Number} id to id
     */
    removeById(id){
        this.tos[id] = undefined;
    }
    /**
     * Nastaví id = null podle to.owner == socket.id
     * @param {String} owner Socket id
     */
    removeByOwner(owner){
        for(const id in this.tos){
            if(this.tos[id] && this.tos[id].owner == owner){
                this.tos[id] = undefined;
            }
        }
    }
    /**
     * Data pro kolize, {}
     */
    propsColl(){
        const data = {};
        for(const id in this.tos){
            if(this.tos[id] && this.tos[id].doCollide)
                data[id] = this.tos[id].collProps;
        }

        return data;
    }
    /**
     * Data pro hráče, []
     */
    props(){
        const data = [];
        for(const id in this.tos){
            if(this.tos[id])
                data.push(this.tos[id].props);
        }

        return data;
    }
    /**
     * Data pro update statů, {}
     */
    updateProps(){
        const data = {};
        for(const id in this.tos){
            if(this.tos[id])
                data[id] = this.tos[id].updateProps;
        }

        return data;
    }
    /**
     * Data pro addObject a removeObject, []
     * @param {Array} ext Vrátí data z toho pole
     */
    gridProps(ext){
        const data = [];
        if(ext){
            for(const to of ext){
                data.push(to.gridProps);
            }
        } else {
            for(const id in this.tos){
                if(this.tos[id])
                    data.push(this.tos[id].gridProps);
            }
        }

        return data;
    }
}

module.exports = {
    Settings,
    SkoroArray
}