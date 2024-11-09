import { getApiUrl } from '.'
import type { UserDbDTO, UserDbResponse } from '~/types/user'
import type { SellerItem, SellersFetchResponse } from '~/types/sellers/sellers.item'

const sellers = {
	getSellers: async (): Promise<SellersFetchResponse> => {
		return await $http.$get(getApiUrl('internoBD', 'sellers'))
	},
	createSeller: async (body: UserDbDTO): Promise<UserDbResponse> => {
		return await $http.$post(getApiUrl('internoBD', 'sellers'), { body })
	},
	getSellerById: async (id: string) : Promise<SellerItem> => {
		return await $http.$get(`${getApiUrl('internoBD', 'sellers')}/${id}`)
	}
}

export default sellers
