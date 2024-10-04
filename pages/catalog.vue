<template>
	<div class="catalog-page container">
		<page-breadcrumbs
			:crumbs="crumbs"
			class="catalog-page__breadcrumbs"
		/>
		<div class="catalog-page__head">
			<products-filters class="catalog-page__filters" />
			<ui-display-model-switcher
				:cards-size="cardsSize"
				@change-display-mode="setCardsSize"
			/>
		</div>
		<template v-if="products && products.length">
			<products-list
				:products="products"
				:cards-size="cardsSize"
			/>
		</template>
		<template v-else>
			<div class="catalog-page__message">
				{{ $t("Nothing found") }}
				<nuxt-link to="/" class="catalog-page__message-link">
					{{ $t("Return to home") }}
				</nuxt-link>
			</div>
		</template>
	</div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useProductsStore } from '~/store/products'
import { useCardListSettingsStore } from '~/store/cardListSettings'

const { t } = useI18n()
useHead({
	title: t('catalog')
})

const productsStore = useProductsStore()
const { products } = storeToRefs(productsStore)

const cardSettings = useCardListSettingsStore()
const { cardsSize } = storeToRefs(cardSettings)

const setCardsSize = (size: 'small' | 'medium') => {
	cardSettings.changeCardsSize(size)
}

const crumbs = [{ name: 'catalog', path: null }]
</script>

<style lang="scss" scopes>
.catalog-page {
  &__head {
    display: flex;
    justify-content: space-between;
  }
  &__breadcrumbs {
    margin-bottom: 10px;
  }
  &__filters {
    margin-bottom: 20px;
    @include adaptive(1024) {
      margin-bottom: 0;
    }
  }
  &__message {
    margin-top: 20px;
    &-link {
      text-decoration: none;
      color: $primary;
      &:hover {
        color: $primary-hover-text;
      }
    }
  }
}
</style>
