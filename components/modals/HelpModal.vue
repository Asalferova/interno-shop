<template>
	<centered-modal class="help-modal" @update:model-value="(val) => emit('update:modelValue', val)">
		<div class="help-modal__wrapper" v-if="!success">
			<div class="help-modal__email">
				<span class="help-modal__label">Email</span>
				<ui-input v-model="email" type="email" required border-radius="big" autocomplete="off" placeholder="Email"
					class="help-modal__input" aria-label="Email" @input="oninput" />
			</div>
			<div class="help-modal__comment">
				<label><span class="help-modal__label">{{ $t('help.report a problem') }}</span>
					<textarea v-model="description" class="help-modal__comment-textarea" maxlength="1500"
						:placeholder="$t('help.write your question')" @input="oninput" />
				</label>
			</div>
			<div v-if="error" class="help-modal__error">{{ error }}</div>
			<ui-button :color="'primary'" @click="submit" class="help-modal__btn">{{ $t('send') }}</ui-button>
		</div>
		<div v-else class="help-modal__success">{{ success }}</div>
	</centered-modal>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { v4 as uuid } from "uuid";
import api from "~/api";
import CenteredModal from "~/components/modals/CenteredModal.vue";
import { useAuthStore } from "~/store/auth";
import { useI18n } from "#imports";

const emit = defineEmits<{
	(e: "update:modelValue", modelValue: boolean): void;
}>();

const { t } = useI18n();

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const email = ref<string>(user.value?.email || '')
const description = ref('')

const error = ref('')
const success = ref('')

const createMessage = async () => {
	const form = {
		documentId: uuid(),
		data: {
			email: email.value,
			message: description.value
		},
	};
	const result = await api.help.createHelpMessage(form)
	if (result) {
		success.value = t("help.success")
	} else {
		error.value = t('inputError')
	}
}

const submit = async () => {
	if (email.value && description.value) {
		await createMessage();
	} else {
		error.value = t('fieldsError');
	}
}

const oninput = () => {
	error.value = '';
};
</script>
<style lang="scss" scoped>
.help-modal {
	&__wrapper {
		width: 100%;
		overflow: hidden;
		margin: 26px 0;
	}

	&__label {
		display: block;
		margin-bottom: 5px;
		color: $text-primary;
	}

	&__email {
		margin-bottom: 26px;
	}

	&__comment {
		margin-bottom: 26px;

		&-textarea {
			@include text-style(400, 22);
			line-height: 1;
			letter-spacing: 0.16px;
			border-radius: 9px;
			background-color: $white;
			display: block;
			box-sizing: border-box;
			width: 100%;
			margin: 0;
			resize: none;
			white-space: pre-wrap;
			border: 2px solid $primary;
			outline: transparent;
			word-wrap: break-word;
			min-height: 140px;
			max-height: 140px;
			overflow: auto;
			padding: 26px;
		}
	}

	&__btn {
		width: 100%;
		max-width: none;
	}

	&__input {
		width: 100%;
		border-radius: 9px;

		& :deep(.ui-input__input) {
			border: 2px solid $primary;
		}
	}

	&__error {
		color: $lighterror;
		padding-bottom: 26px;
		@include adaptive(600) {
			font-size: 13px;
		}
	}

	&__success {
		color: $success;
		padding: 26px 0;
		@include adaptive(600) {
			font-size: 13px;
		}
	}
}
</style>
