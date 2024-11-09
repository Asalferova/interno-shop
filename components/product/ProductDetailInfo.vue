<template>
	<div class="product-detail-info">
		<div class="product-detail-info__header">
			<h1 class="product-detail-info__header-name" itemprop="name">
				{{ product.author }}
				/ {{ product.name }}
			</h1>
			<div>
				<p class="product-detail-info__header-rating" itemprop="aggregateRating" itemscope
					itemtype="https://schema.org/AggregateRating">
					<ui-svg :name="'rating'" class="star"></ui-svg>
					<span itemprop="ratingValue"> {{ productRating }}</span>

				</p>
				<p class="product-detail-info__header-seller">
					{{ $t("seller") }}: {{ product.seller }}
				</p>
			</div>
				<p class="product-detail-info__header-price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
				<span class="text-body-sb product-detail-info__header-price--red" itemprop="price">{{ price }}</span><del
					class="text-body-reg-12 product-detail-info__header-price--del">{{
						initialPrice
					}}</del>
			</p>
		</div>
		<div class="product-detail-info__wrap">
			<product-detail-description :description="product.description"></product-detail-description>
		</div>

		<div class="product-detail-info__btns">
			<ui-cart-button :product-id="product.$id"></ui-cart-button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, useI18n } from "#imports";
import { storeToRefs } from "pinia";
import { useCurrencyStore } from "~/store/currensy";
import type { ProductItem } from "~/types/products/products.item";
import getPriceFormat from "~/utils/priceFormat";

const props = withDefaults(
	defineProps<{
		product: ProductItem;
	}>(),
	{
		product: () => ({} as ProductItem),
	}
);

const { t } = useI18n();

const currencyStore = useCurrencyStore()
const { currentCurrency } = storeToRefs(currencyStore)

const price = computed(() => {
	return getPriceFormat(currencyStore.recalculatePriceAtCurrentRate(props.product.price), currentCurrency.value)
});

const initialPrice = computed(() => {
	if (props.product.initialPrice) {
		return getPriceFormat(currencyStore.recalculatePriceAtCurrentRate(props.product.initialPrice), currentCurrency.value)
	}
	return "";
});

const productRating = computed(() => {
	if (props.product.comments.length) {
		const totalRating = props.product.comments.reduce((sum, comment) => {
			return sum + parseFloat(comment.rating);
		}, 0);
		return (totalRating / props.product.comments.length).toFixed(1);
	}
	return t("no ratings");
});
</script>

<style lang="scss" scoped>
.product-detail-info {
	&__header {
		color: $text-primary;

		&-name {
			@include text-multiline-ellipsis(2);
			font-weight: bold;
			font-size: 35px;
			padding: 11px 0;
			margin: 0;
			margin-bottom: 16px;

			@include adaptive(767) {
				font-size: 22px;
				padding: 6px 0;
				line-height: 1;
			}
		}

		&-price {
			margin: 10px 0;

			&--red {
				color: $accent;
				font-size: 28px;
				margin-right: 10px;

				@include adaptive(767) {
					font-size: 18px;
				}
			}

			&--del {
				color: $text-secondary;
				font-size: 22px;

				@include adaptive(767) {
					font-size: 12px;
				}
			}
		}

		&-rating,
		&-seller {
			display: flex;
			align-items: center;
			gap: 5px;
			line-height: 1;
			font-size: 15px;
			padding: 0;

			@include adaptive(767) {
				font-size: 13px;
			}
		}
	}

	&__btns {
		margin-top: 16px;
		display: flex;
		align-items: center;
		gap: 26px;

		& :deep(.ui-button) {
			@include adaptive(767) {
				font-size: 16px;
				padding: 5px 20px;
			}
		}

		& :deep(.ui-button__icon) {
			@include adaptive(767) {
				width: 16px;
				height: 16px;
			}
		}
	}
}

.star {
	width: 34px;
	height: 34px;
	color: rgb(250, 215, 14);
}
</style>
