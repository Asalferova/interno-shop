<template>
	<div :class="['products-list', `products-list__items--grid_${cardsSize}`]">
		<products-card v-for="product in products" :key="product.$id" :card="product" />
	</div>
</template>
<script lang="ts" setup>
const props = withDefaults(
	defineProps<{
		products?: any[] | null;
		cardsSize?: "medium" | "small";
	}>(),
	{
		products: () => [],
		cardsSize: "small",
	}
);
</script>

<style lang="scss" scoped>
.products-list {
	&__items--grid_small {
		display: grid;
		gap: 24px;
		grid-template-columns: repeat(6, calc(100% / 6 - 24px / 6 * (6 - 1)));
		grid-row-gap: 34px;

		@include adaptive(1280) {
			grid-template-columns: repeat(4, calc(100% / 4 - 24px / 4 * (4 - 1)));
		}

		@include adaptive(767) {
			grid-template-columns: repeat(2, calc(100% / 2 - 24px / 2 * (2 - 1)));
		}
	}

	&__items--grid_medium {
		display: grid;
		gap: 24px;
		grid-template-columns: repeat(5, calc(100% / 5 - 24px / 5 * (5 - 1)));
		grid-row-gap: 34px;

		@include adaptive(1280) {
			grid-template-columns: repeat(3, calc(100% / 3 - 24px / 3 * (3 - 1)));
		}

		@include adaptive(767) {
			grid-template-columns: repeat(1, calc(100% / 1 - 24px / 1 * (1 - 1)));
		}
	}
}
</style>
