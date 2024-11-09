export interface Currency {
	USD: {
		RUB: number
	},
	RUB: {
		USD: number
	}
}

export type CurrencyName = 'USD' | 'RUB'
