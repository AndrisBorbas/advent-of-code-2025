import input from "./input.txt";
import example from "./example.txt";

const data = input.trim().split("\n");

const freshRanges: Array<{ start: number; end: number }> = [];
const ingredients: Array<number> = [];

function processData() {
	let inventory = false;
	data.forEach((line) => {
		if (line.trim() === "") {
			inventory = !inventory;
		}
		if (!inventory) {
			const match = line
				.trim()
				.split("-")
				.map((v) => parseInt(v, 10));
			freshRanges.push({ start: match[0], end: match[1] });
		} else {
			ingredients.push(parseInt(line.trim(), 10));
		}
	});
}

function part1() {
	let count = 0;
	for (const ingredient of ingredients) {
		let isFresh = false;
		for (const range of freshRanges) {
			if (ingredient >= range.start && ingredient <= range.end) {
				isFresh = true;
				break;
			}
		}
		if (isFresh) {
			count++;
		}
	}
	console.log("Fresh Ingredients: ", count);
}

export function day05() {
	processData();
	part1();
}
