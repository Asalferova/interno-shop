export const isNotEmptyString = (value: unknown): value is string =>
	typeof value === 'string' && value.trim() !== ''

export const isArrayNotEmptyStrings = (value: unknown): value is string[] =>
	Array.isArray(value) && value.every(elem => isNotEmptyString(elem))
