const users = {
	register: async (payload) => {
		const response = await $http.$post('/api/account', {
			body: payload,
			credentials: 'include'
		})

		return response
	}
}

export default users
