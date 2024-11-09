import { defineStore } from 'pinia'
import api from '~/api'
import type { SellerItem } from '~/types/sellers/sellers.item'

export const useSellerStore = defineStore('seller', () => {
	const seller = ref<SellerItem | null>(null)

	const getSeller = async (id: string) => {
		try {
			const res = await api.sellers.getSellerById(id)
			seller.value = res
		} catch (e) {
			seller.value = null
			throw e
		}
	}

	const clearSeller = () => {
		seller.value = null
	}

	return {
		seller,
		clearSeller,
		getSeller
	}
})
