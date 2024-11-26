<template>
	<div class="ui-dropdown" :class="{ 'ui-dropdown--open': isShowMenu }">
		<div v-click-outside="close" class="ui-dropdown__header"
			:class="{ 'ui-dropdown__header_selected': selectItem, 'ui-dropdown__header_active': isShowMenu }"
			@click="isShowMenu = !isShowMenu">
			<span>{{ selectItem || placeholder }}</span>
			<ui-svg class="ui-dropdown__img" name="arrow" />
		</div>
		<div v-if="isShowMenu" class="ui-dropdown__menu">
			<div v-for="item in items" :key="`${placeholder}-${item}`" class="ui-dropdown__menu-item"
				:class="{ 'ui-dropdown__menu-item_active': item === selectItem }" @click="setSelectItem(item)">
				{{ item }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
	placeholder?: string;
	selectItem: string;
	items: string[];
}>(), {
	placeholder: '',
	selectItem: '',
	items: () => []
})

const emit = defineEmits<{
	(e: 'update:selectItem', activeItem: string): void
}>()

const isShowMenu = ref(false)

const setSelectItem = (item: string) => {
	isShowMenu.value = false
	emit('update:selectItem', item)
}

const close = () => {
	if (isShowMenu.value) {
		isShowMenu.value = false
	}
}
</script>

<style lang="scss" scoped>
.ui-dropdown {
	$block: &;
	position: relative;
	cursor: pointer;
	height: 42px;
	@include text-style(400, 19);
	@include wrapperWithError;

	&--open {
		#{$block}__header {
			border: 2px solid $primary;
		}
	}

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		width: 100%;
		padding: 0 20px;
		border-radius: 8px;
		border: .4px solid transparent;
		user-select: none;
		border: 2px solid $primary;
		background-color: $input-background;

		&_selected {
			background-color: #f3f3f3;
		}
	}

	&__img {
		width: 16px;
		height: 16px;
		margin-left: 10px;
		transform: rotate(90deg);
	}

	&__menu {
		position: absolute;
		width: 100%;
		top: calc(100% + 8px);
		max-height: 220px;
		overflow-y: scroll;
		border-radius: 8px;
		border: 2px solid $primary;
		z-index: 100;
		user-select: none;

		&::-webkit-scrollbar-track {
			background-color: $input-background;
		}

		&-item {
			display: flex;
			align-items: center;
			padding: 8px 24px;
			background-color: $input-background;

			&:hover {
				background-color: #f3f3f3;
			}

			&_active {
				background-color: #f3f3f3;
			}
		}
	}
}
</style>
