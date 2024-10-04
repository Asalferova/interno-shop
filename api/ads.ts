import { getApiUrl } from '.'
import type { AdsApi } from '~/types/ads'

const ads = {
	getBanners: async (...queries : AdsApi.BannersList.RequestDTO) : Promise<AdsApi.BannersList.ResponseDTO> => {
		const params = { queries }
		return await $http.$get(getApiUrl('internoBD', 'ads'), { params })
	}
}

export default ads
