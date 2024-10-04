import products from '~/api/products'
import sellers from '~/api/sellers'
import ads from '~/api/ads'
import user from '~/api/user'

export const getApiUrl = (databaseId: string, collectionId: string): string => {
	const config = useRuntimeConfig()
	const apiUrl = `${config.public.apiPrefix}databases/${databaseId}/collections/${collectionId}/documents`
	return apiUrl
}

const api = {
	products,
	ads,
	user,
	sellers
}

export default api
