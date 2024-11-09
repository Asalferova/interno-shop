<template>
	<div class="cart-page container">
		<template v-if="statusCartProducts === 'pending'">
       <ui-loader></ui-loader>
		</template>
		<page-breadcrumbs :crumbs="crumbs" class="cart-page__breadcrumbs" />
		<h1 class="cart-page__title">
			{{ $t('cart') }}
		</h1>
		<template v-if="cartProductsData && cartProductsData.length">
			<main class="cart-page__main">
				<cart-products-list :products="cartProductsData" class="cart-page__content" />
				<cart-product-aside class="cart-page__aside" />
			</main>
		</template>
		<template v-else>
			<div class="cart-page__message">
				{{ $t("Nothing found") }}
				<ui-button
					:color="'primary'"
					class="cart-page__message-link"
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
import { useCartStore } from '~/store/cart'

useHead({
	title: 'cart'
})

const cartStore = useCartStore()
cartStore.getMyCartProducts('cart')
const { cartProductsData, statusCartProducts } = storeToRefs(cartStore)

const crumbs = [{ name: 'cart', path: null }]

</script>

<style lang="scss" scoped>
.cart-page {
	&__title {
		@include text-style(600, 35);
		color: $text-primary;
		margin-bottom: 26px;

		@include adaptive(600) {
			@include text-style(600, 25);
			margin-bottom: 26px;
		}
	}

	&__breadcrumbs {
		margin-bottom: 10px;
	}

	&__main {
		display: flex;
		gap: 40px;
		margin: 26px 0;

		@include adaptive(900) {
			flex-direction: column;
		}
	}

	&__content {
		width: 64%;

		@include adaptive(900) {
			width: 100%;
		}
	}

	&__aside {
		width: 36%;

		@include adaptive(900) {
			width: 100%;
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
