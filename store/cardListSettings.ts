export const useCardListSettingsStore = defineStore('card-list-setting', () => {
	const cardsSize = ref<'small' | 'medium'>('small')

	const changeCardsSize = (mode: 'small' | 'medium') => {
		cardsSize.value = mode
	}

	return {
		cardsSize,
		changeCardsSize
	}
})
