<template>
	<div class="products-create-input-select">
		<div class="products-create-input-select__label">
			<span class="products-create-input-select__label-text"
				:class="{ 'products-create-input-select__label-text--required': required }">
				{{ label }}
			</span>
		</div>
		<div class="products-create-input-select__group">
			<div class="products-create-input-select__options">
				<ui-button v-for="(option, i) in options" :key="`products-create-input-select-${option}-${i}`"
					class="products-create-input-select__option" :class="{
						'products-create-input-select__option--active':
							modelValue === option
					}" :color="'primary'" @click="selectOption(option, i)">
					{{ $t(option) }}
				</ui-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { useVModel } from '@vueuse/core'

const props = withDefaults(defineProps<{
	modelValue?: string;
	label: string;
	options: string[];
	required?: boolean;
}>(), {
	modelValue: '',
	label: '',
	options: () => [],
	required: false
})

const emit = defineEmits<{
	'update:modelValue': [selected: string]
}>()

const model = useVModel(props, 'modelValue', emit)
const activeOptions = ref<number | null>(null)

const selectOption = (opt: string, index: number) => {
	model.value = opt
	activeOptions.value = index
}

if (props.modelValue) {
	props.options.forEach((item, i) => {
		if (item === props.modelValue) {
			activeOptions.value = i
		}
	})
}
</script>

<style lang="scss" scoped>
.products-create-input-select {
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	&__label {
		color: $text-primary;
		font-size: 22px;

		&-text {
			display: inline-block;
			margin: 20px 0;
		}
	}

	&__options {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;
	}

	&__option {
		&--active {
			background: $primary-hover;
			color: $white;
		}
	}
}
</style>
