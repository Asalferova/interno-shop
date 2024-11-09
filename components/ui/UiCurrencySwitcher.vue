<template>
	<div class="ui-currency-switcher">
		<span class="ui-currency-switcher__text">{{ $t('currency') }}</span>
			<div class="ui-currency-switcher__btns">
				<ui-button v-for="currency in currencies" :key="currency.value" :color="'transparent'"
					@click="switchCurrency(currency.value)" :class="{ active: currentCurrency === currency.value }">{{
						currency.label }}
				</ui-button>
			</div>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useCurrencyStore } from "~/store/currensy";
import type { CurrencyName } from "~/types/currency";

const currencyStore = useCurrencyStore()
const { currentCurrency } = storeToRefs(currencyStore)

const currencies: { label: string; value: CurrencyName }[] = [
	{ label: 'RUB ₽', value: 'RUB' },
	{ label: 'USD $', value: 'USD' }
];

const switchCurrency = (newCurrency: CurrencyName) => {
	currencyStore.setCurrency(newCurrency)
};
</script>

<style lang="scss">
.ui-currency-switcher {
	padding: 10px;

	&__text {
		display: inline-block;
		color: $text-primary;
		font-weight: 600;
		margin-bottom: 10px;
	}

	&__btns {
		display: flex;
		gap: 30px;
	}

	.active {
		color: $primary-hover-text;
		pointer-events: none;
	}
}
</style>
