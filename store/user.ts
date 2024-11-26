import { defineStore } from 'pinia'
import api from '~/api'
import type { UserDbDTO, UserProfileUpdatePayload, UserRegistrationDto, UserRegistrationResponse } from '~/types/user'

export const useUserStore = defineStore('user', () => {

	const userRegister = async (payload: UserRegistrationDto): Promise<UserRegistrationResponse> => {
		if (!payload) {
			throw new Error('Incorrect payload')
		}
		const res = await api.user.register(payload)
		await api.user.addUserToDatabase({
			documentId: res.$id,
			data: {
				name: res.name,
				email: res.email
			}
		})
		return res
	}

	const createSeller = async (payload: UserDbDTO) => {
		await api.sellers.createSeller(payload)
	}

	const updateUserProfile = async (id: string, payload: UserProfileUpdatePayload)  => {
		if (!payload) {
			return null
		}
		try {
			const res = await api.user.updateUser(id, payload)
			return res
		} catch (_e) {
			return null
		}
	}
	return {
		userRegister,
		createSeller,
		updateUserProfile
	}
})
