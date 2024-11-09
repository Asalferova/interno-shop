<template>
	<div class="container products-detail-page">
		<template v-if="statusProduct === 'pending'">
       <ui-loader></ui-loader>
		</template>
		<page-breadcrumbs :crumbs="crumbs" class="products-detail-page__breadcrumbs" />
		<template v-if="product && Object.keys(product).length">
			<main class="products-detail-page__main" itemscope itemtype="https://schema.org/Product">
				<product-detail-top class="products-detail-page__top" />
				<product-detail-article :product="product" class="products-detail-page__content" />
				<comments-block
					:comments="product.comments.slice().reverse()"
					class="products-detail-page__comments"
				/>
			</main>
		</template>

		<template v-else>
			<div class="products-detail-page__message">
				{{ $t("Nothing found") }}
				<ui-button
					:color="'primary'"
					class="products-detail-page__message-link"
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
import { computed } from 'vue'
import { useProductsStore } from '~/store/products'

const route = useRoute()

const productsStore = useProductsStore()
productsStore.getProduct(route.params.id as string)
const { product, statusProduct } = storeToRefs(productsStore)

const crumbs = computed(() => [
	{ name: 'catalog', path: '/catalog' },
	{ name: product.value.name, path: null, withoutTranslation: true }
])

</script>

<style lang="scss" scoped>
.products-detail-page {
	&__top {
		margin-bottom: 15px;
	}

	&__content {
		margin-bottom: 26px;
	}

	&__comments {
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
}
</style>
