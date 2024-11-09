<template>
	<div class="cart-product">
			<div class="cart-product__btns">
				<ui-favorites-button :product-id="card.$id"></ui-favorites-button>
				<ui-button :color="'transparent'" :prepend-icon="'trash'" @click="deleteProduct(card.$id)"
					:aria-label="$t('remove')"></ui-button>
			</div>
			<div class="cart-product__content">
				<nuxt-link :to="`/products/${card.$id}`" class="cart-product__link">
					<img :src="image" :alt="`${card.author}/${card.name}`" class="cart-product__image" itemprop="image" />
				</nuxt-link>
				<div class="cart-product__info">
					<p class="cart-product__name" itemprop="name">
						{{ card.author }}
						/ {{ card.name }}
					</p>
					<p class="cart-product__price">
						<span class="text-body-sb cart-product__price--red" itemprop="price">
							{{ price }}</span>
						<del class="text-body-reg-12 cart-product__price--del">{{
							initialPrice
						}}</del>
					</p>
					<ui-count-input :countValue="countValue" :max-value="15" @update:countValue="increaseProduct"
						class="cart-product__counter"></ui-count-input>
				</div>
			</div>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useCartStore } from "~/store/cart";
import { useCurrencyStore } from "~/store/currensy";
import type { ProductItem } from "~/types/products/products.item";
import getPriceFormat from "~/utils/priceFormat";

interface Props {
	card: ProductItem;
}

const props = withDefaults(defineProps<Props>(), {
	card: () => ({} as ProductItem),
});

const currencyStore = useCurrencyStore()
const { currentCurrency } = storeToRefs(currencyStore)

const cartStore = useCartStore();
const { cartProducts } = storeToRefs(cartStore);

const countValue = ref(cartProducts.value[props.card.$id] || 1)

const increaseProduct = (countValue: number) => {
	cartStore.increaseProductInCart(props.card.$id, countValue);
};

const deleteProduct = (id: string) => {
	cartStore.deleteCartProduct(id)
};

const image = computed(() => {
	if (props.card.images && props.card.images.length) {
		return props.card.images[0].src;
	}
	return "";
});

const price = computed(() => {
	return getPriceFormat(currencyStore.recalculatePriceAtCurrentRate(props.card.price * countValue.value), currentCurrency.value)
});

const initialPrice = computed(() => {
	if (props.card.initialPrice) {
		return getPriceFormat(currencyStore.recalculatePriceAtCurrentRate(props.card.initialPrice * countValue.value), currentCurrency.value)
	}
	return "";
});

watch(
	() => cartProducts.value[props.card.$id],
	(newCartProducts) => {
		countValue.value = newCartProducts || 1
	}
)
</script>

<style lang="scss" scoped>
.cart-product {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	color: $text-primary;

	&__content {
		display: flex;
		width: 100%;
	}

	&__name {
		margin: 10px 0;
		@include text-multiline-ellipsis(2);

		@include adaptive(600) {
			font-size: 17px;
		}
	}

	&__link {
		background-color: var(--primary);
		border-radius: 16px;
		aspect-ratio: 0.65;
		margin-right: 20px;
		width: 126px;
		min-width: 126px;
		height: 100%;

		@include adaptive(900) {
			margin-right: 10px;
		}
	}

	&__image {
		object-fit: contain;
		width: 100%;
		object-position: center;
		border-radius: 16px;
		height: 100%;
	}

	&__info {
		width: 100%;
		margin-right: 10px;
		display: flex;
		flex-direction: column;
	}

	&__counter {
		margin-top: auto;
		margin-bottom: 10px;
	}

	&__price {
		margin: 0;
		max-width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;

		&--red {
			color: $accent;
			margin-right: 10px;
			font-size: 18px;
		}

		&--del {
			color: $text-secondary;
			font-size: 16px;
		}
	}

	&__btns {
		display: flex;
		gap: 5px;
		width: 55px;
		min-width: 55px;
	}

	& :deep(.ui-button__icon--right) {
		margin: 0;
		padding: 0;
	}
}
</style>
