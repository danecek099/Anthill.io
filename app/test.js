const {chunksToLinesAsync} = require('@rauschma/stringio');

const child = require('child_process').spawn(
	'java', ['-jar', 'javatest/uwu.jar', ''], {
		stdio: ["pipe", "pipe", "pipe"]
	}
);

// child.stdout.on('data', (d) => {
// 	const obj = JSON.parse(d);
// 	console.log("stdData:", obj);
// });

child.stderr.on('data', (d) => {
  	console.log("err:", d.toString());
});

child.on('close', (e) => {
  	console.log("close:", e);
});

const gameOs = {
	dX: 4,
	dY: 4,
	dS: 3
}
const point = {
	x: 100,
	y: 100
}
const dS = {
	dS: 3
}

const coll = {
	gameO: [{
		id: 99,
		x: 5452,
		y: 3852,
		r: 40,
		o: 'default',
		dmg: false,
		heal: false
	}],
	antO: []
}

const map = {
	m: {
		1: {oof: "oof"},
		2: {oof: "ufu"}
	}
}

const map2 = {
	oof: "oof"
}

echoReadable(child.stdout);

// child.stdin.write(JSON.stringify(["addObject", gameO]) + "\n");
// child.stdin.write(JSON.stringify(["findPath", 1, {x1: 5, y1: 0, x2: 5, y2: 8, s: 3, attack: true}]) + "\n");
// child.stdin.write(JSON.stringify(["findPointEx", 1, point]) + "\n");
// child.stdin.write(JSON.stringify(["findFreePos", 2, dS]) + "\n");
// child.stdin.write(JSON.stringify(coll) + "\n");
child.stdin.write(JSON.stringify(map) + "\n");

// for (let i = 0; i < 20; i++) {
// 	for (let j = 0; j < 20; j++) {
// 		const ufu = ["addObject", i+j, gameO, gameO1];
// 		child.stdin.write(JSON.stringify(ufu) + "\n");
//     }
// }

async function echoReadable(readable) {
	for await (const line of chunksToLinesAsync(readable)) {
		const data = JSON.parse(line);
		console.log('LINE:', data);
		// console.log('LINE:', line);
	}
}

setTimeout(() => {
	child.kill();
}, 1000);