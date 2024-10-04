import api from '~/api'
import { useLocaleStore } from '~/store/locale.js'
import type { Banner } from '~/types/ads'

export const useMainPageAdsStore = defineStore('main-page-ads-store', () => {
	const localeStore = useLocaleStore()
	const {
		currentLocale
	} = storeToRefs(localeStore)

	const { data: banners } = useLazyAsyncData('main-page-banners', async () => {
		try {
			const res = await api.ads.getBanners(currentLocale.value)
			return res.documents
		} catch (e) {
			console.log(e)
			return []
		}
	}, {
		watch: [currentLocale],
		default () {
			return [] as Banner[]
		}
	})

	return {
		banners
	}
})
