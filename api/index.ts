import products from '~/api/products'
import sellers from '~/api/sellers'
import comments from '~/api/comments'
import help from '~/api/help'
import ads from '~/api/ads'
import user from '~/api/user'
import auth from '~/api/auth'
import search from '~/api/search'
import upload from '~/api/upload'

export const getApiUrl = (databaseId: string, collectionId: string): string => {
	const config = useRuntimeConfig()
	const apiUrl = `${config.public.apiPrefix}databases/${databaseId}/collections/${collectionId}/documents`
	return apiUrl
}

const api = {
	products,
	ads,
	user,
	sellers,
	comments,
	auth,
	help,
	search,
	upload
}

export default api
