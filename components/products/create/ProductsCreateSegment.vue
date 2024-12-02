<template>
	<div class="products-create-segment">
		<h4 class="products-create-segment__title">
			{{ title }}
		</h4>

		<div class="products-create-segment__content">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
	title: string;
}>(), {
	title: ''
})
</script>

<style lang="scss" scoped>
.products-create-segment {
	&__title {
		margin: 0 0 20px;
		color: $text-primary;
	}
}
</style>
