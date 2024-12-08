<template>
	<div class="order-page container">
		<page-breadcrumbs :crumbs="crumbs" class="order-page__breadcrumbs" />
		<h1 class="order-page__title">
			{{ $t("placing an order") }}
		</h1>
		<template v-if="cartProductsData && cartProductsData.length">
			<main class="order-page__main">
				<div class="order-page__content">
					<ul class="list">
						<li class="order-page__content-item">
							<h3 class="order-page__content-title">
								{{ $t('order') }}
							</h3>
							<ul class="list order-page__content-list">
								<li v-for="(product, i) of cartProductsData" :key="`cart-products-list__item-${i}`" class="j__item">
									<order-product
										:card="product"
										:quantity="cartProducts[product.$id]"
										:sum="Number(cartProducts[product.$id] * product.price)"
									/>
								</li>
							</ul>
						</li>
						<li class="order-page__content-item">
							<h3 class="order-page__content-title">
								{{ $t('delivery') }}
							</h3>
							<order-delivery-comp @complete="handleComplete" />
						</li>
					</ul>
				</div>
				<order-product-aside
					class="order-page__aside"
					:disabled-order-button="isDeliveryComplete"
					@order-placed="createOrder"
				/>
			</main>
		</template>
		<template v-else>
			<div class="order-page__message">
				{{ $t("Nothing found") }}
				<ui-button :color="'primary'" class="order-page__message-link" to="/">
					{{ $t("Return to home") }}
				</ui-button>
			</div>
		</template>
	</div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useModal } from 'vue-final-modal'
import { useCartStore } from '~/store/cart'
import AuthModal from '~/components/auth/modal/AuthModal.vue'
import OrderCreatedMessageModal from '~/components/modals/OrderCreatedMessageModal.vue'
import { useAuthStore } from '~/store/auth'

useHead({
	title: 'placing an order'
})

const authStore = useAuthStore()
const { loggedIn } = storeToRefs(authStore)
const cartStore = useCartStore()
cartStore.getMyCartProducts('order')

const { open: openAuthModal } = useModal({
	component: AuthModal
})

const { open: openOrderCreatedMessageModal } = useModal({
	component: OrderCreatedMessageModal
})

const createOrder = () => {
	if (loggedIn.value) {
		openOrderCreatedMessageModal()
	} else {
		openAuthModal()
	}
}

const { cartProductsData, cartProducts } = storeToRefs(cartStore)

const crumbs = [{ name: 'placing an order', path: null }]

const isDeliveryComplete = ref(false)

const handleComplete = (isComplete: boolean) => {
	isDeliveryComplete.value = isComplete
}
</script>

<style lang="scss" scoped>
.order-page {
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
		margin-top: 26px;

		@include adaptive(900) {
			flex-direction: column;
		}
	}

	&__content {
		width: 64%;

		&-title {
			padding: 10px 24px;
			font-size: 22px;
			line-height: 1;
			height: 42px;
			font-weight: 400;
			background-color: $primary;
			color: $text-light-primary;
			border-radius: 13px;
			margin: 0;
			margin-bottom: 15px;
		}

		&-item {
			margin-bottom: 15px;
		}

		&-list {
			display: flex;
			flex-direction: column;
			gap: 12px;

			&__item:not(:last-child) {
				border-bottom: 1px solid $primary;
				padding-bottom: 5px;
			}
		}

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
