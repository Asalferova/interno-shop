import { getApiUrl } from '.'
import type { ProductItem } from '~/types/products/products.item'
import type { ProductsApi } from '~/types/products/products.api'

const products = {
	getProducts: async (...queries: ProductsApi.ProductsList.RequestDTO): Promise<ProductsApi.ProductsList.ResponseDTO> => {
		const params = { queries }
		return await $http.$get(getApiUrl('internoBD', 'products'), { params })
	},
	getProductById: async (id: string) : Promise<ProductItem> => {
		return await $http.$get(`${getApiUrl('internoBD', 'products')}/${id}`)
	},
	deleteProduct: async (id: string) => {
		return await $http.delete(`${getApiUrl('internoBD', 'products')}/${id}`)
	}
}

export default products
