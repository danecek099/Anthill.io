const {chunksToLinesAsync} = require('@rauschma/stringio');

const child = require('child_process').spawn(
	'java', ['-jar', 'javatest/oof.jar', ''], {
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

const gameO = {
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

echoReadable(child.stdout);

// child.stdin.write(JSON.stringify(["addObject", gameO]) + "\n");
// child.stdin.write(JSON.stringify(["findPath", 1, {x1: 5, y1: 0, x2: 5, y2: 8, s: 3, attack: true}]) + "\n");
child.stdin.write(JSON.stringify(["findPointEx", 1, point]) + "\n");
child.stdin.write(JSON.stringify(["findFreePos", 2, dS]) + "\n");

// for (let i = 0; i < 20; i++) {
// 	for (let j = 0; j < 20; j++) {
// 		const ufu = ["addObject", i+j, gameO, gameO1];
// 		child.stdin.write(JSON.stringify(ufu) + "\n");
//     }
// }

async function echoReadable(readable) {
	for await (const line of chunksToLinesAsync(readable)) {
		console.log('LINE:', JSON.parse(line))
	}
}

setTimeout(() => {
	child.kill();
}, 1000);