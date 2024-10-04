import { defineStore } from 'pinia'
import api from '~/api'

export const useUserStore = defineStore('user', () => {
	function userRegister (payload) {
		if (!payload) {
			throw new Error('Incorrect payload')
		}
		return api.user.register(payload)
	}
	return {
		userRegister
	}
})
