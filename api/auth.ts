import type { LoginDto, LoginResponse } from '~/types/auth'
import type { User } from '~/types/user'

const auth = {
	getCurrentSession: async (): Promise<User> => {
		return await $http.$get('/api/account')
	},
	login: async (body : LoginDto): Promise<LoginResponse> => {
		return await $http.$post('/api/account/sessions/email', { body })
	},
	logout: async () => {
		return await $http.delete('/api/account/sessions/current')
	}
}

export default auth
