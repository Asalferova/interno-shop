<template>
	<client-only>
		<button type="button" class="ui-like-button" :class="[{ 'ui-like-button--bg': props.background }]"
			:aria-label="`${$t('favorites')}`" @click.stop="toggleFavorite">
			<ui-svg v-if="isLiked" :name="'like2'" class="ui-like-button__icon liked" />
			<ui-svg v-else :name="'like'" class="ui-like-button__icon" />
		</button>
	</client-only>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFavoritesStore } from '~/store/favorites';

const props = withDefaults(
	defineProps<{
		productId: string;
		background?: 'white'
	}>(),
	{
		productId: '',
	}
);

const favoritesStore = useFavoritesStore();

const isLiked = computed(() => {
	return favoritesStore.favoritesProducts.includes(props.productId);
});

const toggleFavorite = () => {
	favoritesStore.addFavoriveProduct(props.productId);
};
</script>

<style lang="scss" scoped>
.ui-like-button {
	$block: &;
	background: none;
	border: none;
	cursor: pointer;
	max-height: 25px;
	padding: 0;
	margin: 0;

	&:hover {
		color: $primary-hover-text;
	}

	&:disabled {
		pointer-events: none;
		border-color: transparent;
	}

	&__icon {
		width: 100%;
		height: 100%;
		max-width: 24px;
		max-height: 24px;
		color: $text-primary;
		transition: all .3s ease-in-out;

		&:hover {
			color: $primary-hover-text;
		}
	}

	&--bg {
		background-color: $lightprimary;
		opacity: 0.9;
		border-radius: 9px;
	}
}

.liked {
	color: $primary-hover-text;
}
</style>
