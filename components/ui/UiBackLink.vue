<template>
	<div class="ui-back-link" @click="$router.back()">
		<ui-svg class="ui-back-link__icon" name="navigate" />
		<div v-if="text" class="ui-back-link__text">
			{{ text }}
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	text?: string
}>()
</script>

<style lang="scss" scoped>
.ui-back-link {
	display: flex;
	align-items: center;
	height: 24px;
	cursor: pointer;

	$back-link: &;

	&:hover {
		#{$back-link}__icon {
			color: $primary-hover-text
		}

		#{$back-link}__text {
			color: $primary-hover-text
		}
	}

	&__icon {
		width: 24px;
		height: inherit;
		color: $text-primary;
		transform: rotate(180deg)
	}

	&__text {
		@include text-style(400, 19);
		margin-left: 10px;
		line-height: 1;
	}
}
</style>
