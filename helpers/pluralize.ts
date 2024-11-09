export const pluralize = (value: number, ...args: string[]) => {
	return `${value} ${args[
		value % 10 === 1 &&
		value % 100 !== 11
			? 0
			: value %
			10 >= 2 &&
			value %
			10 <= 4 &&
			(value % 100 < 10 || value % 100 >= 20)
				? 1
				: 2
	]}`
}
