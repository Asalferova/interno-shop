<template>
	<div class="promo-codes">
		<div class="promo-codes__item" v-for="code in promocodes" :key="code.code">
			<span class="promo-codes__item-name">{{ code.name }}</span>
			<ui-button v-clipboard:copy="code.code" :color="'transparent'" :prependIcon="'copy'"
				class="promo-codes__item-copy"><span :style="'max-width: 77%; overflow-wrap: break-word;'">{{ code.code
					}}</span>
			</ui-button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { PromoCode } from "~/helpers/promotionalCodes";

withDefaults(
	defineProps<{
		promocodes: PromoCode[];
	}>(),
	{
		promocodes: () => ([] as PromoCode[]),
	}
);

</script>

<style lang="scss" scoped>
.promo-codes {
	display: flex;
	flex-direction: column;
	gap: 10px;

	&__item {
		background-color: $primary;
		border-radius: 13px;
		padding: 10px;

		&-copy {
			background-color: $background;
			width: 100%;
			max-width: none;
			border-radius: 8px;
			display: flex;
			flex-direction: row-reverse;
			justify-content: space-between;
			padding: 8px 24px;
		}

		&-name {
			font-size: 17px;
			margin-bottom: 5px;
			display: block;
		}
	}
}
</style>
