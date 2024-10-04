<template>
	<label class="ui-input">
		<div v-if="props.label" class="ui-input__label label">
			{{ props.label }}
		</div>
		<span class="ui-input__wrapper" :class="wrapperClasses()">
			<span v-if="
				props.error && props.showErrorText && typeof props.error !== 'boolean'
			" class="ui-input__error">{{ props.error }}
			</span>
			<span class="ui-input__wrapper--icon">
				<input :type="props.type" v-model="model" v-bind="$attrs" :required="props.required" :disabled="props.disabled"
					:autocomplete="props.autocomplete" :placeholder="props.placeholder" v-maska
					:data-maska="props.maska ? props.maska : ''" @blur="emit('blur', $event)" @focus="emit('focus')"
					@change="emit('change', model)" @keyup.enter="emit('on-enter')" :class="inputClasses()"
					@keypress="numbersOnly" />
				<ui-svg v-if="props.iconName" :class="iconClasses()" :name="props.iconName" @click="iconClick()" />
			</span>

			<span v-if="props.addText" class="ui-input__wrapper-add-text">
				{{ props.addText }}
			</span>
		</span>
	</label>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import type { PropType } from "vue";

const emit = defineEmits([
	"update:modelValue",
	"blur",
	"focus",
	"change",
	"on-enter",
	"icon-click",
]);

const props = defineProps({
	type: {
		type: String,
		default: "text",
	},
	label: {
		type: String,
		default: "",
	},
	modelValue: {
		type: String,
		default: "",
	},
	required: {
		type: Boolean,
		default: false,
	},
	placeholder: {
		type: String,
		default: "",
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	error: {
		type: [Boolean, String],
		default: false,
	},
	showErrorText: {
		type: Boolean,
		default: false,
	},
	maska: {
		type: String,
		default: "",
	},
	autocomplete: {
		type: String as PropType<"off" | "on" | "new-password">,
		default: "off",
	},
	onlyNumber: {
		type: Boolean,
		default: false,
	},
	iconName: {
		type: String,
		default: "",
	},
	addText: {
		type: String,
		default: "",
	},
	iconPosition: {
		type: String as PropType<"right" | "left">,
		default: "right",
	},
	bgColor: {
		type: String as PropType<"default">,
		default: "default",
	},
	size: {
		type: String as PropType<"big" | "normal" | "medium" | "small" | "xsmall">,
		default: "big",
	},
	success: {
		type: Boolean,
		default: false,
	},
	borderRadius: {
		type: String as PropType<"off" | "big" | "small">,
		default: "off",
	},
});

const model = useVModel(props, "modelValue", emit);

const iconClasses = () => {
	const iconPosClass = `ui-input__icon--${props.iconPosition}`;
	const classes: Record<string, boolean> = {
		"ui-input__icon": true,
		"ui-input__icon--error": !!props.error,
	};
	classes[iconPosClass] = true;

	return classes;
};

const wrapperClasses = () => {
	const sizeClas = `ui-input__wrapper--size-${props.size}`;
	const classes: Record<string, boolean> = {
		"ui-input__wrapper--with-error":
			!!props.error && props.showErrorText && typeof props.error !== "boolean",
	};
	classes[sizeClas] = true;
	return classes;
};

const inputClasses = () => {
	const iconPosClass = `ui-input__input--icon-${props.iconPosition}`;
	const bgColorClass = `ui-input__input--bg-${props.bgColor}`;
	const classes: Record<string, boolean> = {
		"ui-input__input": true,
		"ui-input__input--error": !!props.error,
		"ui-input__input--disabled": !!props.disabled,
		"ui-input__input--success": props.success,
		"ui-input__input--add-text": !!props.addText,
	};
	classes[bgColorClass] = true;
	if (props.iconName) {
		classes[iconPosClass] = true;
	}
	if (props.borderRadius) {
		const borderRadiusClass = `ui-input__input--radius-${props.borderRadius}`;
		classes[borderRadiusClass] = true;
	}
	return classes;
};

const numbersOnly = (event: KeyboardEvent) => {
	if (props.onlyNumber) {
		const charCode = Number(event.key);
		if (isNaN(charCode) || charCode > 9) {
			event.preventDefault();
		}
		return true;
	}
};

const iconClick = () => {
	emit("icon-click");
};
</script>

<style lang="scss" scoped>
.ui-input {
	width: 100%;
	@include wrapperWithError();

	&__wrapper {
		&--icon {
			position: relative;
		}
	}

	&__label {
		margin-bottom: 5px;
		color: $text-primary;
	}

	&__input {
		@include inputStyle();

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}

		@each $classBtn, $bgColor in (default, $input-background), (white, $background) {
			&#{"--bg-" + $classBtn} {
				background-color: $bgColor;
			}
		}

		&--icon-left {
			padding-left: 60px;
		}

		&--icon-right {
			padding-right: 60px;
		}

		&--add-text {
			padding-right: 60px;
		}

		&--radius-small {
			border-radius: 8px;
		}

		&--radius-big {
			border-radius: 9px;
		}
	}

	&__icon {
		max-height: 80%;
		max-width: 18px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		user-select: none;

		&--left {
			left: 20px;
		}

		&--right {
			right: 20px;
		}
	}
}
</style>
