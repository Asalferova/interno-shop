<template>
	<centered-modal class="product-detail-modal" itemprop="itemListElement" itemscope itemtype="http://schema.org/Product"
		@update:model-value="(val) => emit('update:modelValue', val)">
		<div class="product-detail-modal__wrapper">
			<div class="product-detail-modal__left">
				<img v-if="mainImage" :src="mainImage.src" alt="" class="product-detail-modal__image" />
			</div>
			<div class="product-detail-modal__right">
				<div class="product-detail-modal__header">
					<p class="product-detail-modal__header-name" itemprop="name"
						@click.prevent="navigateTo({ path: `/products/${product.$id}` })">
						{{ product.author }}
						/ {{ product.name }}
					</p>
					<div class="product-detail-modal__rating" itemprop="aggregateRating" itemscope
						itemtype="https://schema.org/AggregateRating"><ui-svg :name="'rating'" class="star"></ui-svg>
						<span itemprop="ratingValue">{{ productRating }}</span>
					</div>
						<p class="product-detail-modal__header-price" itemprop="offers" itemscope
							itemtype="https://schema.org/Offer">
							<span class="text-body-sb product-detail-modal__header-price--red" itemprop="price">{{ price }}</span><del
								class="text-body-reg-12 product-detail-modal__header-price--del">{{ initialPrice }}</del>
						</p>
				</div>
				<div class="product-detail-modal__info">
					<p class="product-detail-modal__info-seller">
						{{ $t('seller') }}: {{ product.seller }}
					</p>
					<p class="product-detail-modal__info-desc">
						{{ product.description }}
					</p>
				</div>
				<div class="product-detail-modal__btns">
					<ui-cart-button :product-id="product.$id"></ui-cart-button>
					<ui-favorites-button :product-id="product.$id"></ui-favorites-button>
				</div>
			</div>
		</div>
	</centered-modal>
</template>
<script lang="ts" setup>
import { computed, useI18n } from "#imports";
import { get } from "lodash-es";
import { storeToRefs } from "pinia";
import CenteredModal from "~/components/modals/CenteredModal.vue";
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

const mainImage = computed((): MediaImage => {
	return get(props.product.images, "0");
});

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
	return t('no ratings');;
});

const emit = defineEmits<{
	(e: "update:modelValue", modelValue: boolean): void;
}>();
</script>
<style lang="scss" scoped>
.product-detail-modal {
	&__wrapper {
		display: flex;
		gap: 26px;
		max-width: 800px;
		max-height: 556px;
		overflow: hidden;
		color: $text-primary;
	}

	&__left,
	&__right {
		width: 50%;
	}

	&__right {
		display: flex;
		flex-direction: column;
	}

	&__image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		border-radius: 16px;
	}

	&__header {
		&-name {
			cursor: pointer;
			@include text-ellipsis();

			&:hover {
				color: $primary-hover-text;
			}
		}

		&-price {
			color: $text-primary;
			@include text-ellipsis();

			&--red {
				color: $accent;
				margin-right: 10px;
				font-size: 22px;
			}

			&--del {
				color: $text-secondary;
			}
		}
	}

	&__info {
		flex-grow: 1;
		overflow: auto;
		max-height: 320px;
		font-size: 16px;
		margin-bottom: 40px;
		padding-right: 15px;
		line-height: 1.7;

		&-seller {
			margin-top: 0;
		}
	}

	&__rating {
		display: flex;
		align-items: center;
		gap: 5px;
		line-height: 1;
		font-size: 15px;
		padding: 0;
	}

	&__btns {
		display: flex;
		align-items: center;
		gap: 26px;
	}
}

.star {
	width: 34px;
	height: 34px;
	color: rgb(250, 215, 14);
}
</style>
