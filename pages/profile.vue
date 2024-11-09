<template>
	<div class="container profile">
		<page-breadcrumbs :crumbs="crumbs" class="profile__breadcrumbs" />
		<div :style="'display: flex;justify-content: flex-end;'">
			<ui-button
				:color="'transparent'"
				:prepend-icon="'logout'"
				:aria-label="$t('Logout')"
				@click="logout"
			/>
		</div>
		<main v-if="seller">
			<ui-tabs v-model:active-tab="activeTab" :tabs="tabs" :uppercase="true" class="profile__tabs" />
			<component :is="currentProfileComponent" />
		</main>
		<main v-else>
			<profile-user />
		</main>
	</div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'
import ProfileUser from '~/components/profile/ProfileUser.vue'
import ProfileSeller from '~/components/profile/ProfileSeller.vue'
import { UserRoles } from '~/types/user'
import { useSellerStore } from '~/store/seller'

definePageMeta({
	middleware: 'auth',
	requiresAuth: true
})

useHead({
	title: 'profile.profile'
})

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const sellerStore = useSellerStore()
if (user.value) {
	sellerStore.getSeller(user.value.$id)
}
const { seller } = storeToRefs(sellerStore)

const tabs = [
	{
		key: 'BUYER',
		label: 'buyer'
	},
	{
		key: 'SELLER',
		label: 'seller'
	}
]

const activeTab = ref(tabs[0].key)

const crumbs = [{ name: 'profile.profile', path: null }]

const currentProfileComponent = computed(() => {
	if (activeTab.value === UserRoles.BUYER) {
		return ProfileUser
	} else if (activeTab.value === UserRoles.SELLER) {
		return ProfileSeller
	}
	return ProfileUser
})

const logout = () => {
	authStore.logout()
	sellerStore.clearSeller()
}
</script>
