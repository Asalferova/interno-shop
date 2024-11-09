import { useI18n, type Locale } from 'vue-i18n'
import type { FilterDefault } from '~/types/filter'

export const useLocaleStore = defineStore('locale-store', () => {
	const { locale } = useI18n()
	const currentLocale = useCookie<Locale>('currentLocales')

	if (!currentLocale.value) {
		currentLocale.value = 'ru'
	}

	locale.value = currentLocale.value

	const currentLocaleFilter = computed<FilterDefault>(() => ({
		method: 'equal',
		attribute: 'locale',
		values: [locale.value]
	}))

	const setLocale = (newLocale: Locale) => {
		locale.value = newLocale
		currentLocale.value = newLocale
	}

	return {
		currentLocaleFilter,
		setLocale,
		currentLocale
	}
})
