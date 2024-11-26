import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '~/api'
import type { CurrentSession, LoginDto, LoginResponse } from '~/types/auth'
import type { User, UserDbResponse } from '~/types/user'
import type { SellerItem } from '~/types/sellers/sellers.item'

export const useAuthStore = defineStore('auth', () => {
	const router = useRouter()

	const user = ref<User | null>(null)
	const loggedIn = computed(() => !!user.value)
	const userDB = ref<UserDbResponse | null>(null)
	const sellerDB = ref<SellerItem | null>(null)
	const avatar = ref<string>()

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
			userDB.value = null;
			sellerDB.value = null;
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	refresh()

	async function fetchUser() {
		try {
			if (user.value) {
				const res = await api.user.getUserById(user.value.$id);
				userDB.value = res;
				return res;
			}
			return
		} catch (e) {
			userDB.value = null;
			throw e;
		}
	}

	async function fetchSeller() {
		try {
			if (user.value) {
				const res = await api.sellers.getSellerById(user.value.$id);
				sellerDB.value = res;
				return res;
			}
			return
		} catch (e) {
			sellerDB.value = null;
			throw e;
		}
	}

	watch(loggedIn, (newLoggedIn) => {
		if (!newLoggedIn) {
			router.push('/')
		}
	})
	watchEffect(() => {
		avatar.value = userDB.value?.avatar
	})

	return {
		user,
		loggedIn,
		login,
		logout,
		refresh,
		fetchUser,
		fetchSeller,
		userDB,
		sellerDB,
		avatar
	}
}, {
	persist: true
})
