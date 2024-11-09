<template>
	<article class="products-card" @click.prevent="navigateTo({ path: `/products/${card.$id}` })"
		itemprop="itemListElement" itemscope itemtype="http://schema.org/Product" role="button">
		<div class="products-card__image-wrapper">
			<img :src="image" :alt="`${card.author}/${card.name}`" class="products-card__image" itemprop="image" />
			<div class="products-card__tips text-body-reg" v-if="card.isBestseller || card.isNew || card.isDiscounted">
				<p v-if="card.isNew" class="products-card__tip products-card__tip--new">
					{{ $t("new") }}
				</p>
				<p v-if="card.isBestseller" class="products-card__tip products-card__tip--bestseller">
					{{ $t("bestseller") }}
				</p>
				<p v-if="card.isDiscounted" class="products-card__tip products-card__tip--discounted">
					{{ $t("sale") }}
				</p>
			</div>
			<div class="products-card__heart">
				<ui-favorites-button :background="'white'" :product-id="card.$id"></ui-favorites-button>
			</div>
			<ui-button class="products-card__fast-view" @click.stop="onOFastViewClick">{{ $t("fast-view") }}</ui-button>
		</div>

		<div class="products-card__info text-body-reg">
				<p class="products-card__price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
				<span class="text-body-sb products-card__price--red" itemprop="price">{{
					price
				}}</span><del class="text-body-reg-12 products-card__price--del">{{
						initialPrice
					}}</del>
			</p>
			<p class="products-card__name" itemprop="name">
				{{ card.author }}
				/ {{ card.name }}
			</p>
		</div>
		<ui-cart-button :product-id="card.$id" :size="'small'"></ui-cart-button>
	</article>
</template>

<script lang="ts" setup>
import { useModal } from "vue-final-modal";
import ProductDetailModal from "~/components/modals/ProductDetailModal.vue";
import { computed } from "vue";
import type { ProductItem } from "~/types/products/products.item";
import getPriceFormat from "~/utils/priceFormat";
import { useCurrencyStore } from "~/store/currensy";
import { storeToRefs } from "pinia";

interface Props {
	card: ProductItem;
}

const props = withDefaults(defineProps<Props>(), {
	card: () => ({} as ProductItem),
});

const currencyStore = useCurrencyStore()
const { currentCurrency } = storeToRefs(currencyStore)

const { open: openProductDetailModal, patchOptions } = useModal({
	component: ProductDetailModal,
});

const onOFastViewClick = () => {
	const card = props.card;

	if (card) {
		patchOptions({
			attrs: {
				product: card,
			},
		});

		openProductDetailModal();
	}
};

const image = computed(() => {
	if (props.card.images && props.card.images.length) {
		return props.card.images[0].src;
	}
	return "";
});

const price = computed(() => {
	return getPriceFormat(currencyStore.recalculatePriceAtCurrentRate(props.card.price), currentCurrency.value)
});

const initialPrice = computed(() => {
	if (props.card.initialPrice) {
		return getPriceFormat(currencyStore.recalculatePriceAtCurrentRate(props.card.initialPrice), currentCurrency.value)
	}
	return "";
});
</script>

<style lang="scss" scoped>
.products-card {
	$block: &;

	max-width: 100%;
	text-decoration: none;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	&:hover {

		#{$block}__tip--new,
		#{$block}__tip--bestseller,
		#{$block}__tip--discounted {
			display: none;
		}

		#{$block}__fast-view {
			opacity: 0.9;
		}
	}

	&__link,
	&__image-wrapper,
	&__image {
		height: 100%;
	}

	&__image-wrapper {
		position: relative;
		background-color: $primary;
		border-radius: 12px;
		width: 100%;
	}

	&__image {
		object-fit: cover;
		object-position: center;
		border-radius: 16px;
		width: 100%;
	}

	&__tips {
		display: flex;
		flex-direction: column;
		gap: 5px;
		position: absolute;
		bottom: 0;
		left: 10px;
		padding: 15px 0;
	}

	&__tip {
		border-radius: 6px;
		padding: 2px 7px;
		margin: 0;
		color: $white;
		text-align: center;

		&--new {
			background-color: $accent;
		}

		&--bestseller {
			background-color: $success;
		}

		&--discounted {
			background-color: rgb(133, 70, 133);
		}
	}

	&__heart,
	&__fast-view {
		position: absolute;
	}

	&__heart {
		top: 0;
		right: 10px;
		margin-top: 10px;
		padding: 1px;
	}

	&__fast-view {
		bottom: 8px;
		left: 8px;
		opacity: 0;
		width: calc(100% - 16px);
		transition: all 0.3s;
		border-radius: 9px;
		max-width: none;
		font-size: 16px;
		background-color: $lightprimary;

		@include adaptive(1024) {
			display: none;
		}
	}

	&__info {
		margin: 10px 0;
		width: 100%;
	}

	&__price,
	&__name {
		margin: 0;
		color: $text-primary;
		@include text-ellipsis();

		&--red {
			color: $accent;
			margin-right: 10px;
		}

		&--del {
			color: $text-secondary;
		}
	}

	&__price {
		margin-bottom: 5px;
	}
}
</style>
