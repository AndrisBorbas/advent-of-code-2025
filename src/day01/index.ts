import rotations from "./input.txt";

export function day01() {
	const data = rotations
		.trim()
		.split("\n")
		.map((v) => {
			v.trim();
			const dir = v.slice(0, 1);
			const num = parseInt(v.slice(1), 10);
			return num * (dir === "R" ? 1 : -1);
		});
	let dial = 50;
	let count = 0;
	for (const num of data) {
		dial += num;
		if (dial % 100 === 0) {
			count++;
		}
	}
	console.log(count);
}
