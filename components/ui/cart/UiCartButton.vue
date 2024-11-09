<template>
	<client-only>
		<ui-button v-if="!inCart" type="button" class="ui-cart-button" :class="`ui-cart-button--${props.size}`"
			@click.stop="toggleCart" :color="'primary'" :append-icon="'cart'">
			{{ $t("add to cart") }}
		</ui-button>
		<ui-button v-else type="button" class="ui-cart-button" :class="`ui-cart-button--${props.size}`" :color="'primary'"
			@click.stop="toggleCart">
			{{ $t("in cart") }}
		</ui-button>
	</client-only>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useCartStore } from "~/store/cart";

const props = withDefaults(
	defineProps<{
		productId: string;
		size?: "big" | "small";
	}>(),
	{
		productId: "",
		size: "big",
	}
);

const cartStore = useCartStore();
const { cartProducts } = storeToRefs(cartStore);

const inCart = computed(() => !!cartProducts.value[props.productId]);

const toggleCart = () => {
	cartStore.addProductToCart(props.productId);
};
</script>

<style lang="scss" scoped>
.ui-cart-button {
	&--small {
		max-width: none;
		width: 100%;
		font-size: 16px;

		& :deep(.ui-button__icon) {
			height: 16px;
			width: 16px;
		}

		@include adaptive(776) {
			font-size: 15px;

			& :deep(.ui-button__icon--right) {
				margin-left: 10px;
			}
		}
	}
}
</style>
