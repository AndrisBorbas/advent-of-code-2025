import ids from "./input.txt";
import example from "./example.txt";

function stringMultiply(str: string, times: number) {
	let result = "";
	for (let i = 0; i < times; i++) {
		result += str;
	}
	return result;
}

function findAllInvalidInRange(start: number, end: number) {
	const invalids: number[] = [];
	for (let i = start; i <= end; i++) {
		const str = i.toString();
		for (let j = 1; j <= str.length / 2 + 1; j++) {
			const repeat = str.slice(0, j);
			const check = str.slice(j, j + j);
			for (let k = 1; k < str.length; k++) {
				const sCheck = stringMultiply(check, k);
				// console.log(str, repeat, check, sCheck);
				if (repeat === check && repeat + sCheck === str) {
					invalids.push(i);
					console.log("Invalid ID found: ", i);
					break;
				}
			}
			if (invalids.includes(i)) {
				break;
			}
		}
	}
	return invalids;
}

export function day02() {
	const ranges = ids
		.trim()
		.split(",")
		.map((v) => {
			const ranges = v.trim().split("-");
			return { start: parseInt(ranges[0], 10), end: parseInt(ranges[1], 10) };
		});

	let invalids = 0;

	for (const range of ranges) {
		invalids += findAllInvalidInRange(range.start, range.end).reduce(
			(acc, curr) => acc + curr,
			0,
		);
	}
	console.log("Total sum of invalid IDs: ", invalids);
}
