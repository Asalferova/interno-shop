import type { Currency, CurrencyName } from '~/types/currency'

export const useCurrencyStore = defineStore('currencyStore', () => {
	const currentCurrency = useCookie<CurrencyName>('currentCurrency')

	if (!currentCurrency.value) {
		currentCurrency.value = 'RUB'
	}

	const currentCurrencySymbol = computed(() => {
		switch (currentCurrency.value) {
		case 'RUB':
			return '₽'
		case 'USD':
			return '$'
		default:
			return '₽'
		}
	})

	const rates: Currency = {
		RUB: {
			USD: 100.00
		},
		USD: {
			RUB: 0.01
		}
	}

	const recalculatePriceAtCurrentRate = (price: number) => {
		switch (currentCurrency.value) {
		case 'RUB':
			return price
		case 'USD':
			return parseFloat((price * rates.USD.RUB).toFixed(2))
		default:
			return price
		}
	}

	const convertUsdToRub = (price: number) => {
		if (currentCurrency.value === 'USD') {
			return price * rates.RUB.USD
		}
		return price
	}

	const setCurrency = (currency: CurrencyName) => {
		currentCurrency.value = currency
	}

	return {
		currentCurrency,
		rates,
		currentCurrencySymbol,
		recalculatePriceAtCurrentRate,
		setCurrency,
		convertUsdToRub
	}
})
