import { useI18n } from 'vue-i18n'
import type { FilterDefault } from '~/types/filter'

export const useLocaleStore = defineStore('locale-store', () => {
	const { locale } = useI18n()

	const currentLocale = computed<FilterDefault>(() => ({
		method: 'equal',
		attribute: 'locale',
		values: [locale.value]
	}))

	return {
		currentLocale
	}
})
