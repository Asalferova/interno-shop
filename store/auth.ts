import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '~/api'
import type { CurrentSession, LoginDto, LoginResponse } from '~/types/auth'
import type { User } from '~/types/user'

export const useAuthStore = defineStore('auth', () => {
	const router = useRouter()

	const user = ref<User | null>(null)
	const loggedIn = computed(() => !!user.value)

	const {
		refresh
	} = useLazyAsyncData<CurrentSession>('checkAuth', async () => {
		try {
			const res = await api.auth.getCurrentSession()
			user.value = res
			return res
		} catch (e) {
			user.value = null
			throw e
		}
	}, {
		watch: [],
		default: () => null
	})

	const login = async (payload: LoginDto): Promise<LoginResponse> => {
		try {
			const res = await api.auth.login(payload)
			await refresh()
			return res
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	const logout = async () => {
		try {
			await api.auth.logout()
			user.value = null
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	refresh()

	watch(loggedIn, (newLoggedIn) => {
		if (!newLoggedIn) {
			router.push('/')
		}
	})

	return {
		user,
		loggedIn,
		login,
		logout,
		refresh
	}
}, {
	persist: true
})
