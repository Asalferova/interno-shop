export const textTruncate = (text: string, limit = 0) => {
	if (!text) {
		return ''
	}
	if (!limit || limit > text.length) {
		return text
	}

	return `${text.slice(0, limit)}...`
}
