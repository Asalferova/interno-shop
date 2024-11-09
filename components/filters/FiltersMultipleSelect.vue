<template>
	<div ref="filter" class="filters-multiple-select" :class="`filters-multiple-select--${isOpen ? 'opened' : 'closed'}`"
		:tabindex="tabindex" itemprop="additionalType">
		<div class="filters-multiple-select__selected" @click="toggleFilter">
			<div class="filters-multiple-select__label">
				<span class="filters-multiple-select__label-default">{{
					$t(props.defaultLabel)
				}}</span>
			</div>
			<ui-svg v-if="props.selectedOptions.length === 0" name="arrow" class="filters-multiple-select__icon" />
			<ui-svg v-if="props.selectedOptions.length != 0" name="cross" class="filters-multiple-select__icon--close"
				@click.stop="emit('close')" />
		</div>
		<transition name="dropdown">
			<div v-if="isOpen" class="filters-multiple-select__options">
				<ui-checkbox v-for="(option, i) of options" :key="`filters-multiple-select-option-${i}`" v-model="model"
					:value="option" multiple class="filters-multiple-select__option" @change="onCheckboxChange">
					{{ option }}
				</ui-checkbox>
			</div>
		</transition>
		<div v-if="!props.hasInteractiveLabel && props.selectedOptions.length != 0"
			class="filters-multiple-select__marker" />
	</div>
</template>

<script lang="ts" setup>
import { xor } from "lodash-es";
import { useVModel, onClickOutside } from "@vueuse/core";
import { ref } from "vue";

const props = withDefaults(
	defineProps<{
		selectedOptions: string[];
		options: string[];
		defaultLabel: string;
		tabindex: number;
		hasInteractiveLabel?: boolean;
	}>(),
	{
		selectedOptions: () => [],
		options: () => [],
		defaultLabel: "",
		tabindex: 0,
		hasInteractiveLabel: true,
	}
);

const emit = defineEmits<{
	"update:selectedOptions": [selectedOptions: string[]];
	close: [];
}>();

const model = useVModel(props, "selectedOptions", emit);

const isOpen = ref(false);
const filter = ref(null);

onClickOutside(filter, () => {
	closeFilter();
});

const closeFilter = () => {
	isOpen.value = false;
};

const toggleFilter = () => {
	isOpen.value = !isOpen.value;
};

const onCheckboxChange = (value: string) => {
	model.value = xor([...model.value], [value]);
};
</script>

<style lang="scss" scoped>
.filters-multiple-select {
	$filter: &;
	position: relative;
	user-select: none;
	font-size: 17px;

	&--opened {
		& #{$filter}__icon {
			transform: rotate(270deg);
		}
	}

	&__selected {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 24px;
		border-radius: 13px;
		line-height: 22px;
		letter-spacing: 0.24px;
		cursor: pointer;
		transition: background 0.2s ease;
		white-space: nowrap;
		color: $white;
		background: $primary;

		&:hover {
			background: $primary-hover;
		}
	}

	&__icon {
		width: 18px;
		height: 18px;
		margin-left: 20px;
		transform: rotate(90deg);
		transition: transform 0.2s ease;

		&--close {
			width: 18px;
			height: 18px;
			margin-left: 20px;
		}
	}

	&__options {
		overflow: hidden;
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		padding: 8px 24px;
		border-radius: 13px;
		background: $background;
		border: 2px solid $primary;
		box-shadow: $shadow;
		z-index: 10;

		@include adaptive(1024) {
			position: static;
			margin-top: 15px;
		}
	}

	&__option {
		margin-bottom: 12px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	&__marker {
		position: absolute;
		top: -2px;
		right: -1px;
		border-radius: 50%;
		width: 12px;
		height: 12px;
		border: 2px solid $background;
		background-color: $primary;
	}
}
</style>
