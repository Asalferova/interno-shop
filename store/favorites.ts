import { skipHydrate } from 'pinia'
import api from '~/api'
import type { FilterDefault, Pagination } from '~/types/filter'
import type { ProductItem } from '~/types/products/products.item'

export const useFavoritesStore = defineStore('favorites', () => {
	const route = useRoute()
	const favoritesProducts = useLocalStorage<string[]>('favorites-products', [])
	const favoritesProductsData = ref<ProductItem[]>([])
	const statusfavoritesProducts = ref<'pending' | 'success' | 'error' | null>(null)

	const pagination = ref<Pagination>({
		method: 'limit',
		values: [24]
	})
	const totalItems = ref(0)
	const filters = <FilterDefault>{
		method: 'equal',
		attribute: '$id',
		values: favoritesProducts.value
	}

	const getMyFavorites = async (): Promise<void> => {
		statusfavoritesProducts.value = 'pending'
		try {
			const res = await api.products.getProducts(filters, pagination.value)
			favoritesProductsData.value = res.documents
			totalItems.value = res.total
			statusfavoritesProducts.value = 'success'
		} catch (e) {
			favoritesProductsData.value = []
			statusfavoritesProducts.value = 'error'
			console.warn(e)
		}
	}

	function addFavoriveProduct (productId: string): void {
		if (favoritesProducts.value.length) {
			const productIndex = favoritesProducts.value.indexOf(productId)
			if (productIndex !== -1) {
				favoritesProducts.value.splice(productIndex, 1)
				if (route.name === 'favorites') {
					getMyFavorites()
				}
			} else {
				favoritesProducts.value.push(productId)
			}
		} else {
			favoritesProducts.value.push(productId)
		}
	}

	const loadMore = async () => {
		if (favoritesProductsData.value.length < totalItems.value) {
			const remaining = totalItems.value - favoritesProductsData.value.length
			const limit = Math.min(remaining, 24);
			try {
				const res = await api.products.getProducts(
				...[
				{ method: 'limit', values: [limit] },
				{ method: 'offset', values: [favoritesProductsData.value.length] }],
        filters
			)
			favoritesProductsData.value =  [...favoritesProductsData.value, ...res.documents]
			} catch (e) {
				console.log(e)
				throw e
			}
		}
		return
	}

	return {
		favoritesProducts: skipHydrate(favoritesProducts),
		addFavoriveProduct,
		favoritesProductsData,
		getMyFavorites,
		statusfavoritesProducts,
		pagination,
		loadMore,
		totalItems
	}
})
