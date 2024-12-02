<template>
	<div class="products-create-input">
		<div class="products-create-input__label" v-if="label">
			<span class="products-create-input__label-text"
				:class="{ 'products-create-input__label-text--required': required }">
				{{ label }}
			</span>
		</div>
		<div class="products-create-input__wrapper">
			<ui-input v-model="model" :only-number="props.mode === 'input-price'" class="products-create-input__input" :class="{
				'products-create-input__input--full': mode === 'input',
				'products-create-input__input--price products-create-input__input--medium': props.mode === 'input-price',
			}" @blur="(e) => emit('blur', e.target.value)" />
			<span v-if="props.mode === 'input-price'" class="products-create-input__currency">₽</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = withDefaults(defineProps<{
	modelValue?: string;
	label?: string;
	mode?: 'input' | 'input-price';
	required?: boolean;
}>(), {
	modelValue: '',
	label: '',
	mode: 'input',
	required: false
})

const emit = defineEmits<{
	'update:modelValue': [val: string],
	'blur': [val: string]
}>()

const model = useVModel(props, 'modelValue', emit)

</script>

<style lang="scss" scoped>
.products-create-input {
	$block: &;

	@include adaptive(600) {
		flex-direction: column;
		align-items: flex-start;
	}

	&__label {
		color: $text-primary;
		font-size: 22px;
		margin-right: 20px;
		margin: 10px 0;

		&-text {
			position: relative;

			&--required {
				&::after {
					content: '';
					position: absolute;
					top: 0;
					right: -10px;
					display: block;
					width: 6px;
					height: 6px;
					border-radius: 50%;
					background: $accent;
				}
			}
		}
	}

	&__wrapper {
		display: flex;
		align-items: center;
	}

	&__input {
		position: relative;

		& :deep(.ui-input__wrapper) {
			height: 100%;
		}

		& :deep(.ui-input__input) {
			border: 2px solid $primary;
			border-radius: 8px;
			height: 42px;
		}

		&--full {
			max-width: 100%;

			& :deep(.ui-input__input) {
				text-align: start;
				padding: 0 24px;
			}
		}

		&--price {
			width: 150px;
		}
	}

	&__currency {
		color: $text-primary;
		margin-left: 12px;
	}
}
</style>
