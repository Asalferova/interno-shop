export default function getPriceFormat (price: number, locale: string, currency: string): string {
	if (typeof price !== 'number') {
		return 'No price'
	}
	return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price)
}
