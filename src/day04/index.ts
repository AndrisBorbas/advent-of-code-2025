import example from "./example.txt";
import input from "./input.txt";

const data = input.trim().split("\n");

const map: boolean[][] = data.map((line) =>
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

function countNeighbors(x: number, y: number) {
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
	const access: boolean[][] = new Array(map.length)
		.fill(false)
		.map(() => new Array(map[0].length).fill(false));
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (!map[y][x]) continue;
			access[y][x] = countNeighbors(x, y);
		}
	}
	// console.log("Access Map: ", access);
	const accessCount = access.reduce((sum, row) => {
		return sum + row.filter((v) => v).length;
	}, 0);
	printMap(map);
	console.log("----");
	printMap(access);
	console.log("Access Count: ", accessCount);
}

export function day04() {
	part1();
}
