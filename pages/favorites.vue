<template>
	<div class="favorites-page container">
		<page-breadcrumbs :crumbs="crumbs" class="favorites-page__breadcrumbs" />
		<h1 class="favorites-page__title">
			{{ $t('favorites') }}
		</h1>
		<template v-if="statusfavoritesProducts === 'pending'">
			<ui-loader />
		</template>
		<template v-else-if="favoritesProductsData && favoritesProductsData.length">
			<main class="favorites-page__main">
				<products-list class="favorites-page__products" :products="favoritesProductsData" />
			</main>
		</template>
		<template v-else>
			<div class="favorites-page__message">
				{{ $t("Nothing found") }}
				<ui-button :color="'primary'" class="favorites-page__message-link" to="/">
					{{ $t("Return to home") }}
				</ui-button>
			</div>
		</template>
	</div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useFavoritesStore } from '~/store/favorites'

useHead({
	title: 'favorites'
})

const favoritesStore = useFavoritesStore()
favoritesStore.getMyFavorites()
const { favoritesProductsData, statusfavoritesProducts } = storeToRefs(favoritesStore)

const crumbs = [{ name: 'favorites', path: null }]

const el = ref<Document | null>(null)

onMounted(() => {
	el.value = document
	useInfiniteScroll(el, favoritesStore.loadMore, { distance: 100 })
})

</script>

<style lang="scss" scoped>
.favorites-page {
	&__title {
		@include text-style(600, 35);
		margin-bottom: 26px;
		color: $text-primary;

		@include adaptive(600) {
			@include text-style(600, 25);
			margin-bottom: 15px;
		}
	}

	&__breadcrumbs {
		margin-bottom: 10px;
	}

	&__message {
		color: $text-primary;
		display: flex;
		align-items: center;
		gap: 26px;

		@include adaptive(767) {
			font-size: 16px;
		}

		&-link {
			@include adaptive(767) {
				font-size: 16px;
			}
		}
	}
}
</style>
