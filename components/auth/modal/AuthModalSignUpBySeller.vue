<template>
	<centered-modal class="auth-modal-seller">
		<template #title>
			<transition name="fade" mode="out-in">
				<span>
					{{ !sellerDB ? $t('EnterStoreName') : $t('You can only register one store') }}
				</span>
			</transition>
		</template>
		<div v-if="error" class="auth-modal-seller__error text-medium-15-19">
			{{ error }}
		</div>
		<form v-if="!sellerDB">
			<ui-input v-model="storeName" required border-radius="big" autocomplete="off" :placeholder="$t('storeName')"
				class="auth-modal-seller__input" />
			<ui-button class="auth-modal-seller__btn" :color="'primary'" @click="signUpBySeller">
				{{ $t(`aditionalMenu.become a seller`) }}
			</ui-button>
		</form>
	</centered-modal>
</template>

<script lang="ts" setup>
import CenteredModal from "~/components/modals/CenteredModal.vue";
import { useUserStore } from "~/store/user";
import { useAuthStore } from "~/store/auth";
import { storeToRefs } from "pinia";

const { t } = useI18n();

const userStore = useUserStore()
const authStore = useAuthStore();
authStore.fetchSeller()

const { user, sellerDB } = storeToRefs(authStore);

const storeName = ref('')
const error = ref('')

const signUpBySeller = async () => {
	if (!user.value) return
	try {
		if (storeName.value) {
			await userStore.createSeller({
				documentId: user.value?.$id,
				data: {
					name: storeName.value
				}
			});
		} else {
			error.value = t('EnterStoreName')
		}
	} catch (e) {
		error.value = error instanceof Error ? error.message : String(error)
		console.warn(e);
	}
};

</script>

<style lang="scss" scoped>
.auth-modal-seller {
	&__title {
		@include adaptive(600) {
			text-align: start !important;
		}
	}

	&__input {
		margin-bottom: 26px;

		& :deep(.ui-input__input) {
			border: 2px solid $primary;
		}
	}

	&__btn {
		min-width: 100%;
		height: 46px;
	}

	&__error {
		padding: 10px;
		margin-bottom: 16px;
		color: $lighterror;
	}
}
</style>
