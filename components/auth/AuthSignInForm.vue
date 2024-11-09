<template>
	<div class="auth-sign-in-form">
		<form class="auth-sign-in-form__form">
			<div class="auth-sign-in-form__group">
				<ui-input v-model="user.email" type="email" required :error="emailErrorMessage"
					:show-error-text="v$.email.$invalid" border-radius="big" placeholder="Email"
					class="auth-sign-in-form__input auth-sign-in-form__input--email" @input="v$.email.$reset"
					:aria-label="'Email'" />
				<form-input-password v-model="user.password" required :error="passwordErrorMessage"
					:show-error-text="v$.password.$invalid" :placeholder="$t('auth.password')"
					class="auth-sign-in-form__input auth-sign-in-form__input--email" @input="v$.password.$reset"
					:aria-label="$t('auth.password')" />
			</div>
			<ui-button color="primary" class="auth-sign-in-form__btn" @click.prevent="signIn">
				{{ $t("button.signIn") }}
			</ui-button>
		</form>
		<div class="auth-sign-in-form__caption text-regular-19-19">
			{{ $t("auth.noAccount") }}
			<button class="link auth-sign-in-form__caption-btn" @click="emit('change-auth-state', AuthState.SIGN_UP)">
				{{ $t("Join") }}
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { get } from "lodash-es";
import { email, required, minLength, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { computed, reactive, useI18n } from "#imports";
import { AuthState } from "~/types/auth";
import { useAuthStore } from "~/store/auth";
const authStore = useAuthStore();

const { t } = useI18n();

const user = reactive({ email: "", password: "" });

const rules = computed(() => ({
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
		minLength: helpers.withMessage(
			t("error.lengthPasswordMessage"),
			minLength(8)
		),
	},
}));

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

const v$ = useVuelidate(rules, user);

const emit = defineEmits<{
	"error-message": [error: string];
	"change-auth-state": [state: AuthState.SIGN_UP];
	"close-modal": [];
	"on-auth": [];
}>();

async function signIn() {
	emit("error-message", "");
	const result = await v$.value.$validate();
	if (!result) {
		return;
	}
	try {
		await authStore.login(user);
		emit("on-auth");
		emit("close-modal");
	} catch (error) {
		if (error instanceof Error) {
			emit("error-message", error.message);
		} else {
			emit("error-message", String(error));
		}
	}
}
</script>

<style lang="scss" scoped>
.auth-sign-in-form {
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
