<template>
	<div class="ui-telnum-input">
		<div class="ui-telnum-input__label">
			{{ $t('Phone') }}
		</div>
		<client-only>
			<span class="ui-telnum-input__wrapper">
				<vue-tel-input v-model="model" :style-classes="[
					'wrapper',
					{ 'wrapper--full': props.fullWidth }
				]" :input-options="{
					styleClasses: 'custom-input',
					placeholder: '(900) 000 00 00'
				}" :country="country" mode="international" autoFormat>
					<template #arrow-icon>
						<ui-svg name="arrow" class="arrow-icon" />
					</template>
				</vue-tel-input>
			</span>
		</client-only>
	</div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps({
	modelValue: {
		type: String,
		default: "",
	},
	country: {
		type: Number,
		default: 643,
	},
	fullWidth: {
		type: Boolean,
		default: false,
	},

});

const emit = defineEmits<{
	'update:modelValue': []
}>()

const model = useVModel(props, 'modelValue', emit)

</script>

<style lang="scss">
.ui-telnum-input {
	&__label {
		font-size: 22px;
		margin-bottom: 5px;
		color: $text-primary;
	}

	&__wrapper {
		position: relative;
		height: 56px;
		display: flex;
		align-items: flex-end;
	}

	.arrow-icon {
		height: 16px;
		width: 16px;
		margin-left: 10px;
		transform: rotate(90deg)
	}

	.wrapper {
		width: 316px;
		height: 42px;
		border-radius: 8px;
		border: none;
		background-color: $input-background;
		border: 2px solid $primary;

		&--full {
			width: 100%;
		}
	}

	.custom-input {
		background-color: $input-background;
		border-radius: 8px;
		border: none;
	}

	.vti__dropdown {
		border-radius: 8px;
	}

	.vue-tel-input:focus-within {
		box-shadow: none;
	}

	.vti__dropdown-list {
		width: 316px;
		border: none;
		border-radius: 8px;
		background-color: $input-background;
		left: 0px;
		border: 2px solid $primary;

		&.below {
			top: 45px;
		}
	}

	.vti__dropdown-item {
		.vti__flag {
			margin-right: 16px;
		}

		strong {
			font-weight: normal
		}
	}
}
</style>
