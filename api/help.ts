import { getApiUrl } from '~/api/index'

type CreateReport = {
	documentId: string;
	data: {
		email: string,
		message: string
	}
}

const help = {
	createHelpMessage: async (body: CreateReport) => {
		try {
			return await $http.$post(getApiUrl('internoBD', 'support'), { body })
		} catch (e) {
			return null
		}
	}
}

export default help
