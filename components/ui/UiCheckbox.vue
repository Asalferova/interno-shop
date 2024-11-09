<template>
	<label class="ui-checkbox" :class="{
		'ui-checkbox--disabled': props.disabled,
	}" @click="emit('handleClick')">
		<input type="checkbox" class="ui-checkbox__input" :class="{ 'ui-checkbox__input--disabled': props.disabled }"
			:disabled="props.disabled" @change="handleChange" />
		<span class="ui-checkbox__icon-wrapper" :class="classIconWrapper(modelValue)">
			<ui-svg name="check" class="ui-checkbox__icon" />
		</span>
		<span v-if="!!props.label" class="ui-checkbox__text">
			{{ props.label }}
		</span>
		<span v-else class="ui-checkbox__text">
			<slot />
		</span>
	</label>
</template>

<script lang="ts" setup>

const emit = defineEmits(["update:modelValue", "change", "handleClick"]);

const props = withDefaults(
	defineProps<{
		modelValue: boolean | string[];
		value?: string;
		multiple?: boolean;
		color?: string;
		label?: string;
		disabled?: boolean;
	}>(),
	{
		modelValue: false,
		value: "",
		multiple: false,
		color: "primary",
		label: "",
		disabled: false,
	}
);

const handleChange = (event: Event) => {
	const isChecked = (event.target as HTMLInputElement).checked;

	if (props.multiple) {
		emit("change", props.value);
	} else {
		emit("update:modelValue", isChecked);
	}
};

const classIconWrapper = (model: boolean | string[]) => {
	if (props.multiple) {
		if (model && Array.isArray(model) && model.includes(props.value)) {
			return [`ui-checkbox__icon-wrapper--${props.color}`];
		}
	} else if (model) {
		return [`ui-checkbox__icon-wrapper--${props.color}`];
	}
};

</script>

<style lang="scss" scoped>
.ui-checkbox {
	position: relative;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	cursor: pointer;
	user-select: none;
	-moz-outline-style: none;
	-webkit-tap-highlight-color: transparent;
	-webkit-focus-ring-color: transparent;
	outline: none;

	&__icon {
		width: 15px;
		height: 15px;
		color: transparent;

		&-wrapper {
			flex-shrink: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 20px;
			height: 20px;
			margin-right: 12px;
			background-color: $background;
			border: 2px solid $primary;
			border-radius: 4px;
		}
	}

	&--disabled {
		cursor: default;
	}

	&__text {
		margin-left: 5px;
		font-weight: 400;
		font-size: 17px;
		line-height: 18px;
		color: $text-primary;

		&:hover {
			color: $primary-hover-text;
		}
	}

	&__input {
		position: absolute;
		top: 0;
		left: 0;
		width: 1px;
		height: 1px;
		opacity: 0;

		&--disabled+.ui-checkbox__icon-wrapper {
			opacity: 0.5;

			&+.ui-checkbox__text {
				opacity: 0.5;
			}
		}
	}

	@each $classCheckbox, $color, $colorIcon in (primary, $primary, $white),
	(gray, $secondary, $white) {

		&__input:checked+.#{"ui-checkbox__icon-wrapper--" + $classCheckbox},
		&#{"__icon-wrapper--" + $classCheckbox} {
			background: $color !important;

			.ui-checkbox__icon {
				color: $colorIcon !important;
			}
		}
	}
}
</style>
