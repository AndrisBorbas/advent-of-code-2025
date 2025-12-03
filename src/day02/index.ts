import ids from "./input.txt";

function findAllInvalidInRange(start: number, end: number) {
	const invalids = [];
	for (let i = start; i <= end; i++) {
		const str = i.toString();
	}
}

export function day02() {
	const ranges = ids
		.trim()
		.split(",")
		.map((v) => {
			const ranges = v.trim().split("-");
			return { start: parseInt(ranges[0], 10), end: parseInt(ranges[1], 10) };
		});

	ranges;
}
