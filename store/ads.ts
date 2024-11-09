import api from '~/api'
import { useLocaleStore } from '~/store/locale.js'
import type { Banner } from '~/types/ads'

export const useMainPageAdsStore = defineStore('main-page-ads-store', () => {
	const localeStore = useLocaleStore()
	const {
		currentLocaleFilter
	} = storeToRefs(localeStore)

	const { data: banners, status } = useLazyAsyncData<Banner[]>('main-page-banners', async () => {
		try {
			const res = await api.ads.getBanners(currentLocaleFilter.value)
			return res.documents
		} catch (e) {
			console.warn(e)
			return []
		}
	}, {
		watch: [currentLocaleFilter],
		default () {
			return [] as Banner[]
		}
	})

	return {
		banners,
		status
	}
})
