import { defineStore } from 'pinia'
import { ref } from '#imports'
import api from '~/api'
import type { FilterDefault, Pagination } from '~/types/filter'
import type { ProductItem } from '~/types/products/products.item'

export const useSellerProductsStore = (name: string) => defineStore(`sellerProductsStore${name}`, () => {
	const sellerProductsData = ref<ProductItem[]>([])
	const totalItems = ref(0)
	const pagination = ref<Pagination>({
		method: 'limit',
		values: [24]
	})

	const filters = ref<FilterDefault>({
		method: 'equal',
		attribute: 'seller',
		values: [name]
	})

	const fetchRequests = async () => {
		try {
			const res = await api.products.getProducts(pagination.value, filters.value)
			sellerProductsData.value = res.documents
			totalItems.value = res.total
		} catch (e) {
			console.log(e)
			throw e
		}
	}

	const loadMore = async () => {
		if (sellerProductsData.value.length < totalItems.value) {
			const remaining = totalItems.value - sellerProductsData.value.length
			const limit = Math.min(remaining, 24)
			try {
				const res = await api.products.getProducts(
					...[
						{ method: 'limit', values: [limit] },
						{ method: 'offset', values: [sellerProductsData.value.length] }],
					filters.value
				)
				sellerProductsData.value = [...sellerProductsData.value, ...res.documents]
			} catch (e) {
				console.log(e)
				throw e
			}
		}
	}

	return {
		sellerProductsData,
		totalItems,
		fetchRequests,
		loadMore
	}
})()
