<template>
	<div class="products-create-input-checkbox">
		<div class="products-create-input-checkbox__label">
			<span class="products-create-input-checkbox__label-text"
				:class="{ 'products-create-input-checkbox__label-text--required': required }">
				{{ label }}
			</span>
			<ui-checkbox v-for="(option, i) of options" :key="`products-create-input-checkbox-${i}`" v-model="model"
				:value="option.value" multiple class="products-create-input-checkbox__option"
				@change="onCheckboxChange(option.value)">
				{{ option.label }}
			</ui-checkbox>
		</div>
	</div>
</template>

<script setup lang="ts">

import { useVModel } from '@vueuse/core'
import { xor } from 'lodash-es';
import type { CreateProductSelectItems } from '~/types/productsCreate';

const props = withDefaults(defineProps<{
	modelValue?: string[];
	label: string;
	options: CreateProductSelectItems[];
	required?: boolean;
}>(), {
	modelValue: () => [],
	label: '',
	options: () => [],
	required: false
})

const emit = defineEmits<{
	'update:modelValue': [selected: string[]]
}>()

const model = useVModel(props, 'modelValue', emit)

const onCheckboxChange = (value: string) => {
	model.value = xor([...model.value], [value]);
};
</script>

<style lang="scss" scoped>
.products-create-input-checkbox {
	display: flex;
	align-items: center;

	&__label {
		color: $text-primary;
		font-size: 22px;

		&-text {
			display: inline-block;
			margin: 20px 0;
		}
	}

	&__option {
		&:not(:last-child) {
			margin-bottom: 16px;
		}

		:deep(.ui-checkbox__icon-wrapper) {
			width: 25px;
			height: 25px;
		}

		:deep(.ui-checkbox__text) {
			font-size: 19px;
		}
	}
}
</style>
