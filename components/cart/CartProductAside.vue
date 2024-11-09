<template>
	<aside class="cart-product-aside">
		<client-only>
			<div class="cart-product-aside__inner">
				<form @submit.prevent="applyCode" v-if="!ifPromoCode" class="cart-product-aside__form">
					<div class="cart-product-aside__content">
						<div class="cart-product-aside__info">
							<ui-input :label="$t('havePromoCode')" v-model="promocode" :error="propmocodeErrorMessage"
								:show-error-text="isError" :placeholder="$t('enterPromotionalCode')"
								@input="isError = false"></ui-input>
						</div>
						<ui-button :color="'primary'">{{ $t("apply") }}</ui-button>
					</div>
				</form>
				<div v-else class="cart-product-aside__content">
					<div class="cart-product-aside__info">
						<div>{{ t("promoCodeApplied", { promoCode: promoCode }) }}</div>
					</div>
					<ui-button :color="'primary'" @click="cartStore.deletePromoCode()">{{
						$t("cancel")
						}}</ui-button>
				</div>
				<div class="cart-product-aside__content">
					<div class="cart-product-aside__info">
						<div class="cart-product-aside__info-item">
							{{ $t("quantity") }}:
							<transition name="dropdown" mode="out-in">
								<span class="bold" :key="totalQuantity">{{
									getQuantityLabel(totalQuantity)
									}}</span>
							</transition>
						</div>
						<div class="cart-product-aside__info-item">
							{{ $t("sum") }}:
							<transition name="dropdown" mode="out-in">
								<span class="bold" :key="totalPriceWithDiscount">{{
									getPriceFormat(currencyStore.recalculatePriceAtCurrentRate(totalPriceWithDiscount), currentCurrency)
									}}</span>
							</transition>
						</div>
					</div>
					<ui-button :color="'primary'" :disabled="totalQuantity < 1" @click.prevent="navigateTo({ path: `/order` })">{{
						$t("Place an order")
						}}</ui-button>
				</div>
			</div>
		</client-only>
	</aside>
</template>

<script setup lang="ts">
import { pluralize } from "~/helpers/pluralize";
import { storeToRefs } from "pinia";
import { useCartStore } from "~/store/cart";
import getPriceFormat from "~/utils/priceFormat";
import { computed, ref } from "vue";
import { useI18n } from "#imports";
import { useCurrencyStore } from "~/store/currensy";

const { t } = useI18n();

const currencyStore = useCurrencyStore()
const { currentCurrency } = storeToRefs(currencyStore)

const cartStore = useCartStore();
const { totalPriceWithDiscount, totalQuantity, ifPromoCode, promoCode } =
	storeToRefs(cartStore);

const promocode = ref("");
const isError = ref(false);

const propmocodeErrorMessage = computed(() => {
	if (isError.value) {
		const errorMessage = t("ErrorPromocode");
		return errorMessage;
	}
	return false;
});

const applyCode = () => {
	cartStore.applyPromoCode(promocode.value);
	if (ifPromoCode.value) {
		isError.value = false;
		promocode.value = "";
	} else {
		isError.value = true;
	}
};

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
.cart-product-aside {
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

			@include adaptive(900) {
				display: block;
			}
		}

		@include adaptive(900) {
			row-gap: 2px;
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
			width: 100%;
			height: 42px;
		}
	}

	& :deep(.ui-input__input) {
		border: 2px solid $primary;
		border-radius: 9px;

		@include adaptive(900) {
			font-size: 19px;
			padding: 5px 20px;
			height: 42px;
			min-width: 100%;
		}
	}
}
</style>
