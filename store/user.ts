import { defineStore } from 'pinia'
import api from '~/api'
import type { UserDbDTO, UserRegistrationDto, UserRegistrationResponse } from '~/types/user'

export const useUserStore = defineStore('user', () => {
	const userRegister = async (payload: UserRegistrationDto): Promise<UserRegistrationResponse> => {
		if (!payload) {
			throw new Error('Incorrect payload')
		}
		const res = await api.user.register(payload)
		await api.user.addUserToDatabase({
			documentId: res.$id,
			data: {
				name: res.name
			}
		})
		return res
	}

	const createSeller = async (payload: UserDbDTO) => {
		await api.sellers.createSeller(payload)
	}
	return {
		userRegister,
		createSeller
	}
})
