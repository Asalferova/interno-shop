import { skipHydrate } from 'pinia'
import api from '~/api'
import type { FilterDefault } from '~/types/filter'
import type { ProductItem } from '~/types/products/products.item'

export const useFavoritesStore = defineStore('favorites', () => {
	const favoritesProducts = useLocalStorage<string[]>('favorites-products', [])
	const favoritesProductsData = ref<ProductItem[]>([])
	const statusfavoritesProducts = ref<'pending' | 'success' | 'error' | null>(null)

	const getMyFavorites = async (): Promise<void> => {
		const filters = <FilterDefault>{
			method: 'equal',
			attribute: '$id',
			values: favoritesProducts.value
		}
		statusfavoritesProducts.value = 'pending'
		try {
			const res = await api.products.getProducts(filters)
			favoritesProductsData.value = res.documents
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
			} else {
				favoritesProducts.value.push(productId)
			}
		} else {
			favoritesProducts.value.push(productId)
		}
		getMyFavorites()
	}

	return {
		favoritesProducts: skipHydrate(favoritesProducts),
		addFavoriveProduct,
		favoritesProductsData,
		getMyFavorites,
		statusfavoritesProducts
	}
})
