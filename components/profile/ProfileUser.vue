<template>
	<div class="profile-form" v-if="userDB && Object.keys(userDB).length">
		<div class="profile-form__wrapper">
			<ui-input :model-value="userDB.name" class="profile-form__input" :label="$t('name')" :placeholder="$t('name')"
				size="medium" border-radius="small" disabled></ui-input>

			<ui-input v-model="userDB.surname" class="profile-form__input" :label="$t('surname')" :placeholder="$t('surname')"
				size="medium" border-radius="small" maxlength="35"></ui-input>

			<ui-input :model-value="userDB.email" class="profile-form__input" label="Email" placeholder="Email" size="medium"
				disabled border-radius="small"></ui-input>

			<ui-input v-model="userDB.cardNumber" class="profile-form__input" :maska="'#### #### #### ####'"
				:placeholder="'0000 0000 0000 0000'" :label="$t('cardNumber')" size="medium" border-radius="small">
			</ui-input>

			<ui-date-picker v-model:date-value="userDB.dateOfBirth"></ui-date-picker>

			<ui-telnum-input v-model.trim="userDB.phone">
			</ui-telnum-input>
		</div>
		<ui-button class="profile-form__btn" color="primary" @click="onSave">
			{{ $t("Save") }}
		</ui-button>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import type { UserProfileUpdatePayload } from '~/types/user';

const authStore = useAuthStore()
const { userDB } = storeToRefs(authStore)

const currentState = reactive({
	surname: userDB.value?.surname ?? '',
	dateOfBirth: userDB.value?.dateOfBirth ?? '',
	phone: userDB.value?.phone ?? '',
	cardNumber: userDB.value?.cardNumber ?? '',
})

const emit = defineEmits<{
	save: [data: UserProfileUpdatePayload]
}>()

watch(userDB, () => {
	currentState.surname = userDB.value?.surname ?? ''
	currentState.dateOfBirth = userDB.value?.dateOfBirth ?? ''
	currentState.phone = userDB.value?.phone ?? ''
	currentState.cardNumber = userDB.value?.cardNumber ?? ''
}, { deep: true })

const onSave = () => {
	emit('save', currentState)
}

</script>

<style lang="scss" scoped>
.profile-form {
	$profile: &;

	&__wrapper {
		padding-top: 26px;
		display: flex;
		flex-wrap: wrap;
		max-width: 998px;
		gap: 24px;
		margin-bottom: 26px;

		#{$profile}__input {
			max-width: 316px;
		}
	}

	&__btn {
		padding: 0 110px;
		height: 42px;
	}

	& :deep(.ui-input__input) {
		border: 2px solid $primary;
		height: 42px;
	}

	& :deep(.ui-input__wrapper) {
		height: 56px;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-end;
	}
}
</style>
