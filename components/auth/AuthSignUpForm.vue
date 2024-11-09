<template>
	<div class="auth-sign-up-form">
		<form class="auth-sign-up-form__form">
			<div class="auth-sign-up-form__group">
				<ui-input v-model="authData.name" required border-radius="big" :error="nameErrorMessage"
					:show-error-text="v$.name.$invalid" autocomplete="off" :placeholder="$t('auth.firstName')"
					class="auth-sign-up-form__input" @input="v$.name.$reset" :aria-label="$t('auth.firstName')" maxlength="35" />

				<ui-input v-model="authData.email" type="email" :error="emailErrorMessage" :show-error-text="v$.email.$invalid"
					required border-radius="big" autocomplete="off" placeholder="Email" class="auth-sign-up-form__input"
					@input="v$.email.$reset" aria-label="Email" />

				<form-input-password v-model="authData.password" required :error="passwordErrorMessage"
					:show-error-text="v$.password.$invalid" :placeholder="$t('auth.password')" class="auth-sign-up-form__input"
					@input="v$.password.$reset" :aria-label="$t('auth.password')" />

				<form-input-password v-model="authData.repassword" required :error="repasswordErrorMessage"
					:show-error-text="v$.repassword.$invalid" :placeholder="$t('auth.confirmPassword')"
					class="auth-sign-up-form__input" @input="v$.repassword.$reset" :aria-label="$t('auth.confirmPassword')" />
			</div>

			<ui-button class="auth-sign-up-form__btn" @click.prevent="signUp" :color="'primary'">
				{{ $t("Join") }}
			</ui-button>
		</form>
		<div class="auth-sign-up-form__caption text-regular-19-19">
			{{ $t("AlreadyHaveAnAccount") }}
			<button class="link auth-sign-up-form__caption-btn" @click="emit('change-auth-state', AuthState.SIGN_IN)">
				{{ $t("LogIn") }}
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { get } from "lodash-es";
import {
	required,
	email,
	minLength,
	sameAs,
	helpers,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { v4 as uuid } from "uuid";
import { computed, reactive, useI18n } from "#imports";
import { AuthState } from "~/types/auth";
import { useUserStore } from "~/store/user";
import { useAuthStore } from "~/store/auth";

const { t } = useI18n();

const authStore = useAuthStore();
const userStore = useUserStore();

const authData = reactive<{
	email: string;
	password: string;
	repassword: string;
	name: string;
	surname: string;
	code?: string;
}>({
	email: "",
	password: "",
	repassword: "",
	name: "",
	surname: "",
});

const rules = computed(() => ({
	name: {
		required: helpers.withMessage(
			t("error.emptyMessage", { field: t("auth.firstName") }),
			required
		),
	},
	email: {
		required: helpers.withMessage(
			t("error.emptyMessage", { field: "Email" }),
			required
		),
		email: helpers.withMessage(t("error.emailMessage"), email),
	},
	password: {
		required: helpers.withMessage(
			t("error.emptyMessage", { field: t("auth.password") }),
			required
		),
		sameAs: helpers.withMessage(
			t("error.confirmPasswordMessage"),
			sameAs(authData.repassword)
		),
		minLength: helpers.withMessage(
			t("error.lengthPasswordMessage"),
			minLength(8)
		),
	},
	repassword: {
		required: helpers.withMessage(
			t("error.emptyMessage", { field: t("auth.password") }),
			required
		),
		sameAs: helpers.withMessage(
			t("error.confirmPasswordMessage"),
			sameAs(authData.password)
		),
		minLength: helpers.withMessage(
			t("error.lengthPasswordMessage"),
			minLength(8)
		),
	},
}));

const nameErrorMessage = computed(() => {
	if (v$.value.name.$error) {
		const errorMessage = get(v$.value.name.$errors, "0.$message");
		return typeof errorMessage === "string" ? errorMessage : "error";
	}
	return false;
});

const emailErrorMessage = computed(() => {
	if (v$.value.email.$error) {
		const errorMessage = get(v$.value.email.$errors, "0.$message");
		return typeof errorMessage === "string" ? errorMessage : "error";
	}
	return false;
});

const passwordErrorMessage = computed(() => {
	if (v$.value.password.$error) {
		const errorMessage = get(v$.value.password.$errors, "0.$message");
		return typeof errorMessage === "string" ? errorMessage : "error";
	}
	return false;
});

const repasswordErrorMessage = computed(() => {
	if (v$.value.repassword.$error) {
		const errorMessage = get(v$.value.repassword.$errors, "0.$message");
		return typeof errorMessage === "string" ? errorMessage : "error";
	}
	return false;
});

const v$ = useVuelidate(rules, authData);

const emit = defineEmits<{
	"error-message": [error: string];
	"change-auth-state": [state: AuthState.SIGN_IN];
	"close-modal": [];
	"on-auth": [];
}>();

const signUp = async () => {
	emit("error-message", "");
	const result = await v$.value.$validate();
	if (!result) {
		return;
	}
	try {
		await userStore.userRegister({
			userId: uuid(),
			email: authData.email,
			password: authData.password,
			name: authData.name,
		});
		await authStore.login({ email: authData.email, password: authData.password });
		emit("on-auth");
		emit("close-modal");
	} catch (e) {
		emit("error-message", (e as { message: string }).message);
		console.warn(e);
	}
};
</script>

<style lang="scss" scoped>
.auth-sign-up-form {
	width: 100%;

	&__form {
		margin-bottom: 26px;
	}

	&__group {
		margin-bottom: 26px;
	}

	&__input {
		margin-bottom: 26px;
		width: 100%;
		border-radius: 9px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	&__btn {
		min-width: 100%;
		height: 46px;
	}

	&__caption {
		text-align: center;
		color: $text-primary;

		&-btn {
			padding: 0;
			margin: 0;
			background: transparent;
			border: 0;
			cursor: pointer;
		}
	}

	& :deep(.ui-input__input) {
		border: 2px solid $primary;
	}
}
</style>
