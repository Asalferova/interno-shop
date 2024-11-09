import { getApiUrl } from '.'
import type { UserDbDTO, UserDbResponse, UserRegistrationDto, UserRegistrationResponse } from '~/types/user'

const users = {
	register: async (payload: UserRegistrationDto): Promise<UserRegistrationResponse> => {
		const response = await $http.$post('/api/account', {
			body: payload,
			credentials: 'include'
		})
		return response
	},
	addUserToDatabase: async (body: UserDbDTO): Promise<UserDbResponse> => {
		return await $http.$post(getApiUrl('internoBD', 'users'), { body })
	}
}

export default users
