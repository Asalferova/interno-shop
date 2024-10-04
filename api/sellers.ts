import { getApiUrl } from '.'
import type { SellersFetchResponse } from '~/types/sellers/sellers.item'

const sellers = {
	getSellers: async (): Promise<SellersFetchResponse> => {
		return await $http.$get(getApiUrl('internoBD', 'sellers'))
	}
}

export default sellers
