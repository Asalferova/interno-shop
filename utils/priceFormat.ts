export default function getPriceFormat (price: number, currency: string): string {
	if (typeof price !== 'number') {
		return 'No price'
	}
	const locale = currency === 'RUB' ? 'ru-RU' : 'us-US'
	return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price)
}
