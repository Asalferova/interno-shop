import api from '~/api'
import type { SellerItem } from '~/types/sellers/sellers.item'
export const useSellersStore = defineStore('sellers', () => {
	const {
		data: sellers
	} = useLazyAsyncData('sellers:list', async () => {
		try {
			const res = await api.sellers.getSellers()
			return res.documents
		} catch (e) {
			console.warn(e)
			return []
		}
	}, {
		default () {
			return [] as SellerItem[]
		}
	})

	const uniqueSellersNames: ComputedRef<string[]> = computed(() => {
		if (sellers.value) {
			const sellersNames = sellers.value.map((seller: SellerItem) => seller.name)
			return Array.from(new Set(sellersNames))
		}
		return []
	})

	return {
		sellers,
		uniqueSellersNames
	}
})
