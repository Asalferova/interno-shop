<template>
	<client-only>
		<div class="cart-product">
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
						<span class="text-body-m cart-product__price" itemprop="price">
							{{ price }}</span>
					</p>
					<p class="cart-product__summary">{{ $t("quantity") }}: <span class="bold">{{ quantity }}</span></p>
					<p class="cart-product__summary">{{ $t("sum") }}: <span class="bold">{{
						getPriceFormat(currencyStore.recalculatePriceAtCurrentRate(sum), currentCurrency)
							}}</span></p>
				</div>
			</div>
		</div>
	</client-only>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useCurrencyStore } from "~/store/currensy";
import type { ProductItem } from "~/types/products/products.item";
import getPriceFormat from "~/utils/priceFormat";

interface Props {
	card: ProductItem;
	quantity: number,
	sum: number,
}

const props = withDefaults(defineProps<Props>(), {
	card: () => ({} as ProductItem),
	quantity: 1,
	sum: 0
});

const currencyStore = useCurrencyStore()
const { currentCurrency } = storeToRefs(currencyStore)

const image = computed(() => {
	if (props.card.images && props.card.images.length) {
		return props.card.images[0].src;
	}
	return "";
});

const price = computed(() => {
	return getPriceFormat(currencyStore.recalculatePriceAtCurrentRate(props.card.price), currentCurrency.value)
});
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
			line-height: 1.2;
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
		max-width: 50%;
	}

	&__price {
		margin: 0;
		max-width: 100%;

	}

	&__summary {
		margin: 5px 0;
		font-size: 19px;
		line-height: 1;
		overflow-wrap: break-word;
		white-space: normal;
		max-width: 75%;
		@include text-multiline-ellipsis(2);

		@include adaptive(600) {
			font-size: 17px;
		}
	}
}
</style>
