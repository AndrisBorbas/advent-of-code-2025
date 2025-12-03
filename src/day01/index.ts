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
	let lastOOM = 0;
	let dial = 50;
	let lastDial = 50;
	let count = 0;
	let lastCount = 0;
	let oomChanged = false;
	let zerod = false;
	for (const num of data) {
		dial += num;
		const newOOM = Math.floor(dial / 100);
		if (newOOM != lastOOM) {
			const change = Math.abs(newOOM - lastOOM);
			count += change;
			oomChanged = true;
			if (lastDial % 100 === 0 && dial % 100 !== 0) {
				console.log("Adjusting for crossing zero");
				count--;
			}
		} else if (dial % 100 === 0) {
			count++;
			zerod = true;
		}
		if (lastCount !== count || true) {
			console.log(
				`${dial} = ${lastDial} + (${num})`,
				count,
				"newOOM:",
				newOOM,
				"lastOOM:",
				lastOOM,
				"oomChanged:",
				oomChanged,
				"zerod:",
				zerod,
			);
		}
		lastOOM = newOOM;
		oomChanged = false;
		zerod = false;
		lastDial = dial;
		lastCount = count;
	}
	console.log("Password: ", count);
}

export function day01() {
	// getPassword();
	getPassword2();
}
