import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to, _from) => {
	const authStore = useAuthStore()
	if (!authStore.loggedIn && to.meta.requiresAuth) {
		return navigateTo('/')
	}
})
