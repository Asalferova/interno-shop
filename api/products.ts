import { getApiUrl } from '.'
import type { ProductsApi } from '~/types/products/products.api'

const products = {
	getProducts: async (...queries: ProductsApi.ProductsList.RequestDTO) : Promise<ProductsApi.ProductsList.ResponseDTO> => {
		const params = { queries }
		return await $http.$get(getApiUrl('internoBD', 'products'), { params })
	}
}

export default products
