<template>
	<div class="ui-count ui-count-wrap">
		<button @click="decrement" class="ui-count__btn" :disabled="Number(countValue) <= minValue"
			:aria-label="$t('reduceQuantity')">
			&minus;
		</button>
		<input type="number" v-model="countModel" class="ui-count__input" :min="minValue" :max="maxValue"
			@input="validateInput" />
		<button @click="increment" class="ui-count__btn" :disabled="Number(countValue) >= maxValue"
			:aria-label="$t('increaseQuantity')">
			&plus;
		</button>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const props = withDefaults(
	defineProps<{
		countValue: number;
		minValue?: number;
		maxValue?: number;
	}>(),
	{ countValue: 1, minValue: 1, maxValue: 99 }
);

const emit = defineEmits(["update:countValue"]);

const countModel = ref(props.countValue);

const increment = () => {
	if (countModel.value < props.maxValue) {
		countModel.value++;
		emit("update:countValue", countModel.value);
	}
};

const decrement = () => {
	if (countModel.value > 1) {
		countModel.value--;
		emit("update:countValue", countModel.value);
	}
};

const validateInput = () => {
	if (countModel.value < props.minValue) {
		countModel.value = props.minValue;
	} else if (countModel.value > props.maxValue) {
		countModel.value = props.maxValue;
	}
	emit("update:countValue", countModel.value);
};

watch(
	() => props.countValue,
	(newValue) => {
		countModel.value = newValue;
	}
);
</script>

<style lang="scss" scoped>
.ui-count {
	&-wrap {
		display: flex;
		height: 32px;
		color: $text-primary;
	}

	&__input {
		cursor: auto;
		text-align: center;
		border: none;
		font-size: 17px;
		height: 32px;
		width: 52px;
		background-color: transparent;
		color: $text-primary;

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	}

	&__btn {
		width: 32px;
		height: 32px;
		background-color: $primary;
		border: none;
		border-radius: 9px;
		color: $white;
		cursor: pointer;

		&:hover {
			background-color: $primary-hover;
		}

		&:disabled {
			opacity: 0.4;
			cursor: not-allowed;
			pointer-events: none;
			color: white;
		}
	}
}
</style>
