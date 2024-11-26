<template>
	<div class="container profile">
		<page-breadcrumbs :crumbs="crumbs" class="profile__breadcrumbs" />
		<div :style="'display: flex;justify-content: flex-end;'">
			<ui-button :color="'transparent'" :prepend-icon="'logout'" :aria-label="$t('Logout')" @click="logout" />
		</div>
		<main v-if="sellerDB && userDB" class="profile__main">
			<ui-tabs v-model:active-tab="activeTab" :tabs="tabs" :uppercase="true" class="profile__tabs" />
			<profile-avatar :src="avatar" class="profile__avatar" @upload-file="onAvatarChange" />
			<component :is="currentProfileComponent" @save="onSaveHandler" />
		</main>
		<main v-if="userDB && !sellerDB" class="profile__main">
			<profile-avatar :src="avatar" class="profile__avatar" @upload-file="onAvatarChange" />
			<profile-user @save="onSaveHandler" />
		</main>
	</div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'
import ProfileUser from '~/components/profile/ProfileUser.vue'
import ProfileSeller from '~/components/profile/ProfileSeller.vue'
import { UserRoles, type UserProfileUpdatePayload } from '~/types/user'
import { useUserStore } from '~/store/user'
import { v4 as uuid } from "uuid";
import api from '~/api'

definePageMeta({
	middleware: 'auth',
	requiresAuth: true
})

useHead({
	title: 'profile.profile'
})

const authStore = useAuthStore()
authStore.fetchSeller()
authStore.fetchUser()
const { user, sellerDB, userDB, avatar } = storeToRefs(authStore)

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

const userStore = useUserStore()

const onSaveHandler = async (payload: UserProfileUpdatePayload) => {
	if (user.value) {
		return await userStore.updateUserProfile(user.value.$id, { ...formProfileUpdate.value, ...payload })
	}
	return
}

const formProfileUpdate = ref<{
	avatar?: string
}>({})

const onAvatarChange = async (file: File) => {
	const reader = new FileReader()
	const formData = new FormData()
	const fileId = uuid();
	const permissions = ["read(\"any\")"]

	reader.onload = (e) => {
		avatar.value = e.target?.result as string
	}
	reader.readAsDataURL(file)

	formData.append('fileId', fileId);
	formData.append('file', file)
	permissions.forEach(permission => {
		formData.append('permissions[]', permission);
	});
	
	const { $id } = await api.upload.uploadFile(formData)
	if ($id) {
		const avatar_url = `https://cloud.appwrite.io/v1/storage/buckets/storage/files/${$id}/view?project=interno-shop&project=interno-shop`
		formProfileUpdate.value.avatar = avatar_url
	}
}

const logout = () => {
	authStore.logout()
}
</script>

<style lang="scss" scoped>
.profile {
	&__main {
		margin-bottom: 26px;
	}

	&__avatar {
		margin-top: 26px;
	}
}
</style>
