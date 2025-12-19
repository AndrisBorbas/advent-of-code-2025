import example from "./example.txt";
import input from "./input.txt";

const data = input.trim().split("\n");

const initialMap: boolean[][] = data.map((line) =>
	line.split("").map((char) => char === "@"),
);

const max = 4;

function printMap(inputMap: boolean[][]) {
	for (let y = 0; y < inputMap.length; y++) {
		let line = "";
		for (let x = 0; x < inputMap[y].length; x++) {
			line += inputMap[y][x] ? "@" : ".";
		}
		console.log(line);
	}
}

function countNeighbors(x: number, y: number, map: boolean[][] = initialMap) {
	let count = 0;
	for (let dy = -1; dy <= 1; dy++) {
		for (let dx = -1; dx <= 1; dx++) {
			if (dx === 0 && dy === 0) continue;
			const nx = x + dx;
			const ny = y + dy;
			if (nx >= 0 && ny >= 0 && ny < map.length && nx < map[ny].length) {
				if (map[ny][nx]) {
					count++;
				}
			}
		}
	}
	return count < max;
}

function part1() {
	const access: boolean[][] = new Array(initialMap.length)
		.fill(false)
		.map(() => new Array(initialMap[0].length).fill(false));
	for (let y = 0; y < initialMap.length; y++) {
		for (let x = 0; x < initialMap[y].length; x++) {
			if (!initialMap[y][x]) continue;
			access[y][x] = countNeighbors(x, y);
		}
	}
	// console.log("Access Map: ", access);
	const accessCount = access.reduce((sum, row) => {
		return sum + row.filter((v) => v).length;
	}, 0);
	printMap(initialMap);
	console.log("----");
	printMap(access);
	console.log("Access Count: ", accessCount);
}

function part2() {
	let accessCount = 0;
	let total = 0;
	let debugStep = 0;
	let access: boolean[][];
	const currentMap: boolean[][] = initialMap.map((row) => row.slice());
	printMap(currentMap);
	do {
		// reset access map
		access = new Array(initialMap.length)
			.fill(false)
			.map(() => new Array(initialMap[0].length).fill(false));
		for (let y = 0; y < currentMap.length; y++) {
			for (let x = 0; x < currentMap[y].length; x++) {
				if (!currentMap[y][x]) continue;
				access[y][x] = countNeighbors(x, y, currentMap);
			}
		}
		// Update current map
		for (let y = 0; y < currentMap.length; y++) {
			for (let x = 0; x < currentMap[y].length; x++) {
				if (!currentMap[y][x]) continue;
				currentMap[y][x] = !access[y][x];
			}
		}
		// console.log("Access Map: ");
		// printMap(access);
		// console.log("Current Map: ");
		// printMap(currentMap);
		accessCount = access.reduce((sum, row) => {
			return sum + row.filter((v) => v).length;
		}, 0);
		total += accessCount;
		// console.log("Step Access Count: ", accessCount);
		// console.log("----");
	} while (accessCount !== 0 && ++debugStep /* <= 11 */);
	console.log("Access Count: ", total, debugStep);
}

export function day04() {
	// part1();
	part2();
}
