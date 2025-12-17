import example from "./example.txt";
import input from "./input.txt";

const data = input.trim().split("\n");

function part1() {
	let sum = 0;
	for (const line of data) {
		let high1 = 0;
		let high2 = 0;
		for (let i = 0; i < line.length; i++) {
			const curr = Number(line[i]);
			if (curr > high1 && i !== line.length - 1) {
				if (curr > high2) {
					high2 = high1;
				}
				high1 = curr;
				high2 = 0;
			} else if (curr > high2) {
				high2 = curr;
			}
		}
		// console.log(high1, high2);
		sum += high1 * 10 + high2;
	}
	return sum;
}

function part2() {
	let sum = 0;
	let lineNum = 1;
	for (const line of data) {
		let highs = [];
		for (let i = 0; i < line.length; i++) {
			const curr = Number(line[i]);
			highs.push(curr);
			if (highs.length > 12) {
				let index = highs.findIndex((v, j) => {
					if (j === highs.length - 1) return false;
					return v < highs[j + 1];
				});
				if (index === -1) {
					index = highs.length - 1;
				}
				highs.splice(index, 1);
			}
		}
		const joltage = highs.reduce((a, b) => {
			return a * 10 + b;
		}, 0);
		console.log(lineNum, "Joltage: ", joltage, highs, highs.length);
		sum += joltage;
		lineNum++;
	}
	return sum;
}

export function day03() {
	// console.log("Joltage: ", part1());
	console.log("Joltage: ", part2());
}
