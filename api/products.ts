import { getApiUrl } from '.'
import type { ProductItem } from '~/types/products/products.item'
import type { ProductsApi } from '~/types/products/products.api'
import type { CreateProductDto } from '~/types/productsCreate'

const products = {
	getProducts: async (...queries: ProductsApi.ProductsList.RequestDTO): Promise<ProductsApi.ProductsList.ResponseDTO> => {
		const params = { queries }
		return await $http.$get(getApiUrl('internoBD', 'products'), { params })
	},
	getProductById: async (id: string) : Promise<ProductItem> => {
		return await $http.$get(`${getApiUrl('internoBD', 'products')}/${id}`)
	},
	createNewProduct: async (id: string, payload: Partial<CreateProductDto>) => {
		const params = {
			documentId: id,
			data: payload
		}
		return await $http.$post(getApiUrl('internoBD', 'products'), {
			body: params
		})
	},
	editProduct: async (id: string, payload: Partial<CreateProductDto>) => {
		const params = {
			data: payload,
			permissions: ['read("any")']
		}
		return await $http.$patch(`${getApiUrl('internoBD', 'products')}/${id}`, {
			body: params
		})
	},
	deleteProduct: async (id: string) => {
		return await $http.delete(`${getApiUrl('internoBD', 'products')}/${id}`)
	}
}

export default products
