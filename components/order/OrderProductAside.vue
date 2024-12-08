<template>
	<aside class="order-product-aside">
		<div class="order-product-aside__inner">
			<div class="order-product-aside__content">
				<div class="order-product-aside__info">
					<div class="order-product-aside__info-item">
						{{ $t("quantity") }}:
						<transition name="dropdown" mode="out-in">
							<span class="bold" :key="totalQuantity">{{
								getQuantityLabel(totalQuantity)
							}}</span>
						</transition>
					</div>
					<div class="order-product-aside__info-item">
						{{ $t("sum") }}:
						<transition name="dropdown" mode="out-in">
							<span class="bold" :key="totalPriceWithDiscount">{{
								getPriceFormat(currencyStore.recalculatePriceAtCurrentRate(totalPriceWithDiscount), currentCurrency)
							}}</span>
						</transition>
					</div>
					<div class="order-product-aside__info-item">
						{{ $t('delivery') }}:
						<span class="bold">{{ $t('courier') }}</span>
					</div>
					<div class="order-product-aside__info-item">
						{{ $t('payment') }}:
						<span class="bold">{{ $t('uponReceipt') }}</span>
					</div>
				</div>
				<ui-button :color="'primary'" :disabled="!disabledOrderButton" @click="emit('orderPlaced', true)">{{
					$t("Place an order")
				}}</ui-button>
			</div>
		</div>
	</aside>
</template>

<script setup lang="ts">
import { pluralize } from "~/helpers/pluralize";
import { storeToRefs } from "pinia";
import { useCartStore } from "~/store/cart";
import getPriceFormat from "~/utils/priceFormat";
import { useI18n } from "#imports";
import { useCurrencyStore } from "~/store/currensy";


defineProps<{ disabledOrderButton: boolean }>()

const emit = defineEmits<{
	(event: 'orderPlaced', value: boolean): void;
}>();

const { t } = useI18n();

const cartStore = useCartStore();
const { totalPriceWithDiscount, totalQuantity } =
	storeToRefs(cartStore);

const currencyStore = useCurrencyStore()
const { currentCurrency } = storeToRefs(currencyStore)

const getQuantityLabel = (count: number): string => {
	return pluralize(
		count,
		t("quanityPluralize.piece"),
		t("quanityPluralize.pieces"),
		t("quanityPluralize.piece_s")
	);
};
</script>

<style lang="scss" scoped>
.order-product-aside {
	&__inner {
		position: sticky;
		top: 143px;
		display: flex;
		flex-direction: column;
		gap: 15px;

		@include adaptive(900) {
			z-index: 99;
			position: fixed;
			bottom: 0;
			left: 0;
			margin-bottom: 82px;
			width: 100%;
			padding: 0 52px;
			top: auto;
			gap: 0;
		}

		@include adaptive(600) {
			padding: 0 12px;
		}
	}

	&__info {
		display: flex;
		flex-direction: column;
		row-gap: 5px;

		&-item {
			display: flex;
			justify-content: space-between;
			@include text-ellipsis();
		}

		@include adaptive(900) {
			row-gap: 2px;
			width: 100%;
		}
	}

	&__content {
		display: flex;
		flex-direction: column;
		row-gap: 12px;
		background-color: $background;
		border: 2px solid $primary;
		border-radius: 13px;
		padding: 23px;
		color: $text-primary;

		@include adaptive(900) {
			border: none;
			border-radius: 0%;
			font-size: 15px;
			line-height: normal;
			justify-content: space-between;
			align-items: flex-end;
			height: fit-content;
			padding: 3px;
			box-shadow: $shadow-top;
			gap: 5px;
		}

		@include adaptive(400) {
			font-size: 13px;
		}
	}

	& :deep(.ui-button) {
		width: 100%;
		max-width: 100%;

		@include adaptive(900) {
			font-size: 19px;
			padding: 5px 20px;
			height: 42px;
			min-width: 100%;
		}
	}
}
</style>
