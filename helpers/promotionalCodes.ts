import type { Locale } from '~/types/languages'

export interface PromoCode {
	locale: Locale,
	code: string,
	discount: number,
	name: string,
}

export const promotionalCodes: PromoCode[] = [
	{
		locale: 'ru',
		code: 'TOP_INTERNO',
		discount: 0.1,
		name: 'Скидка 10% на весь ассортимент'
	},
	{
		locale: 'en',
		code: 'TOP_INTERNO',
		discount: 0.1,
		name: '10% discount on the entire range'
	}
]
