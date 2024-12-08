import { getApiUrl } from '.'
import type { User, UserDbDTO, UserDbResponse, UserProfileUpdatePayload, UserRegistrationDto } from '~/types/user'

const users = {
	register: async (payload: UserRegistrationDto): Promise<User> => {
		const response = await $http.$post('/api/account', {
			body: payload,
			credentials: 'include'
		})
		return response
	},
	addUserToDatabase: async (body: UserDbDTO): Promise<UserDbResponse> => {
		return await $http.$post(getApiUrl('internoBD', 'users'), { body })
	},
	getUserById: async (userId: string): Promise<UserDbResponse> => {
		const response = await $http.$get(`${getApiUrl('internoBD', 'users')}/${userId}`)

		return response
	},
	updateUser: async (userId: string, payload: UserProfileUpdatePayload): Promise<UserDbResponse> => {
		const params = {
			data: payload,
			permissions: ['read("any")']
		}
		const response = await $http.$patch(`${getApiUrl('internoBD', 'users')}/${userId}`, {
			body: params
		}
		)
		return response
	}
}

export default users
