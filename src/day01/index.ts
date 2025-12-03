import rotations from "./input.txt";
import example from "./example.txt";

const data = rotations
	.trim()
	.split("\n")
	.map((v) => {
		const dir = v.slice(0, 1);
		const num = parseInt(v.slice(1), 10);
		return num * (dir === "R" ? 1 : -1);
	});

function getPassword2() {
	let count = 0;
	let dial = 50;
	for (const num of data) {
		for (let i = 0; i < Math.abs(num); i++) {
			dial += num > 0 ? 1 : -1;
			if (dial % 100 === 0) {
				count++;
			}
		}
	}
	console.log("Password2: ", count);
}

function getPassword() {
	let dial = 50;
	let count = 0;
	for (const num of data) {
		const lastDial = dial;
		dial += num;

		// Calculate how many multiples of 100 we cross
		const min = Math.min(lastDial, dial);
		const max = Math.max(lastDial, dial);

		// Find first multiple of 100 at or after min
		const firstMultiple = Math.ceil(min / 100) * 100;
		// Find last multiple of 100 at or before max
		const lastMultiple = Math.floor(max / 100) * 100;

		// Count multiples in range, excluding the starting position
		if (firstMultiple <= lastMultiple) {
			const crossings = (lastMultiple - firstMultiple) / 100 + 1;
			count += crossings;
			// Don't count if we started exactly on a multiple
			if (lastDial % 100 === 0) {
				count--;
			}
		}
	}
	console.log("Password: ", count);
}

export function day01() {
	getPassword();
	getPassword2();
}
