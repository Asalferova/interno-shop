export const textTruncate = (text: string, limit = 0) => {
	if (!text) {
		return ''
	}
	if (!limit || limit > text.length) {
		return text
	}

	return `${text.slice(0, limit)}...`
}

export function truncateNumber (num: number) {
	if (!num) {
		return ''
	}
	if (num > 9) {
		return '9+'
	}
	return String(num)
}
