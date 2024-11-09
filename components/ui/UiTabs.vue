<template>
	<div class="ui-tabs">
		<template v-for="(tab, i) in props.tabs">
			<nuxt-link
				v-if="tab.to"
				:key="`wrapper-tab-${tab.key}_${i}`"
				class="ui-tabs__item"
				exact-active-class="ui-tabs__item--active"
				:to="tab.to"
			>
				<ui-svg
					v-if="tab.icon"
					:name="tab.icon"
					class="ui-tabs__icon"
				/>{{ $t(tab.label) }}
			</nuxt-link>
			<div
				v-else
				:key="`wrapper-tab-${tab.key}`"
				class="ui-tabs__item"
				:class="[{'ui-tabs__item--active': props.activeTab === tab.key}, {'ui-tabs__item--uppercase': props.uppercase}]"
				@click="emit('update:activeTab', tab.key)"
			>
				<ui-svg
					v-if="tab.icon"
					:name="tab.icon"
					class="ui-tabs__icon"
				/>{{ $t(tab.label) }}
			</div>
		</template>
	</div>
</template>

<script lang="ts" setup>

interface UiTab {
	label: string,
	key: string,
	icon?: string;
	count?: number,
	to?: {
		name: string
		params?: {[key:string]: string}
	}
}

const emit = defineEmits(['update:activeTab'])
const props = defineProps({
	tabs: {
		type: Array as PropType<UiTab[]>,
		default: () => []
	},
	activeTab: {
		type: String,
		default: ''
	},
	uppercase: {
		type: Boolean,
		default: false
	}
})
</script>

<style lang="scss" scoped>

.ui-tabs {
	display: flex;
	align-items: center;
	gap: 10px;
	min-width: max-content;
	font-weight: 500;
	font-size: 17px;
	line-height: 1;

	&__icon {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		fill: gray;
		width: 22px;
		height: 22px;
		margin-right: 15px;
		transition: fill .2s linear;
	}

	&__item {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: $primary;
		color: $white;
		text-decoration: none;
		text-transform: capitalize;
		padding: 12px 32px 8px;
		position: relative;
		cursor: pointer;
		user-select: none;
		border-radius: 8px;
		transition: all .2s linear;

		@include adaptive(480) {
			padding: 8px 12px 4px 12px;
			line-height: 100%;
			font-size: 16px;
		}

		&:hover {
			background-color: $primary-hover;
		}

		&--active {
			background-color: $primary-hover;
			pointer-events: none;
		}

		&--uppercase {
			text-transform: uppercase;
		}
	}
}

</style>
