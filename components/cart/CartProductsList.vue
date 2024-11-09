<template>
	<div class="cart-products-list">
		<client-only>
			<div class="cart-products-list__select-all">
				<ui-checkbox :model-value="allSelected" @update:modelValue="onSelectAllChange">
					<span class="cart-products-list__select-all__label">{{
						$t("selectAll")
						}}</span>
				</ui-checkbox>
				<span class="cart-products-list__select-all__label--aditional">{{
					checkboxLabel(allSelected, totalQuantity)
					}}</span>
			</div>
			<ul class="list cart-products-list__items">
				<li v-for="(product, i) of products" :key="`cart-products-list__item-${i}`" class="cart-products-list__item">
					<ui-checkbox v-model="selectedProducts" :value="product.$id" multiple @change="onCheckboxChange">
					</ui-checkbox>
					<cart-product :card="product"></cart-product>
				</li>
			</ul>
		</client-only>
	</div>
</template>
<script lang="ts" setup>
import { computed, useI18n } from "#imports";
import { xor } from "lodash-es";
import { storeToRefs } from "pinia";
import { pluralize } from "~/helpers/pluralize";
import { useCartStore } from "~/store/cart";
import type { ProductItem } from "~/types/products/products.item";

const props = withDefaults(
	defineProps<{
		products?: ProductItem[] | null;
	}>(),
	{
		products: () => [],
	}
);

const { t } = useI18n();

const cartStore = useCartStore();
const { selectedProducts, totalQuantity } = storeToRefs(cartStore);

const allSelected = computed(() => {
	return props.products?.length === selectedProducts.value.length;
});

const onCheckboxChange = (value: string) => {
	cartStore.setSelectedProducts(xor([...selectedProducts.value], [value]));
};

const onSelectAllChange = () => {
	if (props.products && props.products.length > 0) {
		if (selectedProducts.value.length === props.products.length) {
      cartStore.setSelectedProducts([])
		} else {
			cartStore.setSelectedProducts(props.products.map((product) => product.$id))
		}
	}
};

const checkboxLabel = (allSelected: boolean, quantity: number): string => {
	if (allSelected) {
		return t("allProductsSelected");
	}

	const count = quantity;
	const quantityText = pluralize(
		count,
		t("quanityPluralize.piece"),
		t("quanityPluralize.pieces"),
		t("quanityPluralize.piece_s")
	);

	const selectedText = pluralize(
		count,
		t("selectedPluralize.selected"),
		t("selectedPluralize.selecteds"),
		t("selectedPluralize.selected_s")
	);

	return `${selectedText.substring(2)} ${quantityText}`;
};
</script>

<style lang="scss" scoped>
.cart-products-list {
	&__items {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	&__item:not(:last-child) {
		border-bottom: 1px solid $primary;
		padding-bottom: 5px;
	}

	& :deep(.ui-checkbox__icon-wrapper) {
		position: absolute;
		top: 0;
	}

	& :deep(.ui-checkbox__text) {
		width: 100%;
		font-size: 22px;
		line-height: 1.5;
		margin: 0;

		@include adaptive(600) {
			font-size: 17px;
		}
	}

	&__select-all {
		display: flex;
		margin-bottom: 12px;

		&__label {
			font-size: 22px;
			margin-right: 15px;

			@include adaptive(600) {
				font-size: 17px;
			}

			&--aditional {
				font-size: 18px;
				color: $text-secondary;

				@include adaptive(600) {
					font-size: 15px;
				}
			}
		}

		& :deep(.ui-checkbox__icon-wrapper) {
			position: static;
		}
	}
}
</style>
