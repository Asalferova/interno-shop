import type { CurrentSession, LoginDto, LoginResponse } from '~/types/auth'

const auth = {
	getCurrentSession: async (): Promise<CurrentSession> => {
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
