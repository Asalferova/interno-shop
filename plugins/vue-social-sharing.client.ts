import VueSocialSharing from 'vue-social-sharing'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(VueSocialSharing)
})
