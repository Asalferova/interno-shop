<template>
	<div v-click-outside="close" class="ads-context">
		<ui-svg class="ads-context__icon" name="more" @click.prevent.stop="isShowMenu = !isShowMenu" />
		<div v-if="isShowMenu" class="ads-context__menu">
			<div v-for="item in items" :key="item.actionName" class="ads-context__menu-item"
				@click.stop.prevent="setAction(item.actionName)">
				{{ $t(item.name.toLocaleLowerCase()) }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { MenuAction, type MenuItemInterface } from '~/types/ads'

const emit = defineEmits<{
	(e: 'action', action: MenuAction): void
}>()

const items: MenuItemInterface[] = [
	{
		name: 'Edit',
		actionName: MenuAction.Edit
	}, {
		name: 'Delete',
		actionName: MenuAction.Delete
	}
]

const isShowMenu = ref(false)

function close() {
	if (!isShowMenu.value) { return }
	isShowMenu.value = false
}

function setAction(selectedAction: MenuAction) {
	emit('action', selectedAction)
	close()
}
</script>

<style lang="scss" scoped>
.ads-context {
	position: relative;

	&__icon {
		height: 26px;
		width: 26px;
		color: $text-primary;
		cursor: pointer;

		&:hover {
			color: $primary-hover-text;
		}
	}

	&__menu {
		z-index: 1;
		position: absolute;
		top: 0;
		right: 35px;
		border-radius: 12px;
		cursor: pointer;
		background: $background;
		border: .4px solid $primary;

		&-item {
			display: flex;
			height: 50px;
			padding: 10px 24px;
			white-space: nowrap;
			color: $text-primary;

			@include text-style(500, 19);

			&:hover {
				color: $primary-hover-text;

			}
		}
	}
}
</style>
