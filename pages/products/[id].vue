<template>
	<div class="container products-detail-page">
		<page-breadcrumbs :crumbs="crumbs" class="products-detail-page__breadcrumbs" />
		<template v-if="product && Object.keys(product).length">
			<main class="products-detail-page__main" itemscope itemtype="https://schema.org/Product">
				<product-detail-top class="products-detail-page__top" />
				<product-detail-article :product="product" class="products-detail-page__content" />
				<comments-block :comments="comments" class="products-detail-page__comments" />
				<ui-button
					v-if="comments.length >= 5"
					color="primary"
					class="products-detail-page__btn"
					:disabled="comments.length === product.comments.length"
					@click="showMoreComments"
				>
					{{ $t('Show more') }}
				</ui-button>
			</main>
		</template>
		<template v-else>
			<div class="products-detail-page__message">
				{{ $t("Nothing found") }}
				<ui-button :color="'primary'" class="products-detail-page__message-link" to="/">
					{{ $t("Return to home") }}
				</ui-button>
			</div>
		</template>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import type { Comment } from '~/types/comments'
import { useProductsStore } from '~/store/products'

const route = useRoute()

const productsStore = useProductsStore()
productsStore.getProduct(route.params.id as string)
const { product } = storeToRefs(productsStore)

const crumbs = computed(() => [
	{ name: 'catalog', path: '/catalog' },
	{ name: product.value.name, path: null, withoutTranslation: true }
])

const visibleCount = ref(5)
const comments = ref<Comment[]>([])

watch(product, (newProduct) => {
	if (newProduct && newProduct.comments) {
		comments.value = newProduct.comments.slice(-visibleCount.value).reverse()
	}
})

const showMoreComments = () => {
	if (product.value && product.value.comments) {
		visibleCount.value += 5
		comments.value = product.value.comments.slice(-visibleCount.value).reverse()
	}
}
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

	&__btn {
		margin-bottom: 26px;
		margin: 0 auto;
		@include adaptive(767) {
			font-size: 16px;
			padding: 5px 20px;
		}
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
