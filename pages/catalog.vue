<template>
	<div class="catalog-page container">
		<template v-if="productsStatus === 'pending'">
       <ui-loader></ui-loader>
		</template>
		<page-breadcrumbs :crumbs="crumbs" class="catalog-page__breadcrumbs" />
		<div class="catalog-page__head">
			<products-filters class="catalog-page__filters" />
			<ui-display-model-switcher :cards-size="cardsSize" @change-display-mode="setCardsSize" />
		</div>
		<main v-if="products && products.length">
			<products-list class="catalog-page__products" :products="products" :cards-size="cardsSize" />
		</main>
		<template v-else>
			<div class="catalog-page__message">
				{{ $t("Nothing found") }}
				<ui-button
					:color="'primary'"
					class="catalog-page__message-link"
					to="/"
				>
					{{ $t("Return to home") }}
				</ui-button>
			</div>
		</template>
	</div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useProductsStore } from '~/store/products'
import { useCardListSettingsStore } from '~/store/cardListSettings'

useHead({
	title: 'catalog'
})

const productsStore = useProductsStore()
const { products, productsStatus } = storeToRefs(productsStore)

const cardSettings = useCardListSettingsStore()
const { cardsSize } = storeToRefs(cardSettings)

const setCardsSize = (size: 'small' | 'medium') => {
	cardSettings.changeCardsSize(size)
}

const crumbs = [{ name: 'catalog', path: null }]

const el = ref<Document | null>(null);

onMounted(() => {
	el.value = document;
	useInfiniteScroll(el, productsStore.loadMore, { distance: 100 });
});
</script>

<style lang="scss" scoped>
.catalog-page {
	&__head {
		display: flex;
		justify-content: space-between;
		margin-bottom: 26px;
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

	&__products {
		margin: 26px 0;
	}
}
</style>
