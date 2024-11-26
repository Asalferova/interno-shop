<template>
	<div class="ads-card" @click.prevent="navigateTo(routeTo)">
		<div class="ads-card__more">
			<profile-ads-context-menu @action="itemAction" />
		</div>
		<div class="ads-card__content">
			<nuxt-link :to="`/products/${card.$id}`" class="ads-card__link">
				<img :src="image" :alt="`${card.author}/${card.name}`" class="ads-card__image" itemprop="image" />
			</nuxt-link>
			<div class="ads-card__info">
				<p class="ads-card__name" itemprop="name">
					{{ card.author }}
					/ {{ card.name }}
				</p>
				<p class="ads-card__price">
					<span itemprop="price">
						{{ price }}</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import api from "~/api";
import { useCurrencyStore } from "~/store/currensy";
import { MenuAction } from "~/types/ads";
import type { ProductItem } from "~/types/products/products.item";
import getPriceFormat from "~/utils/priceFormat";

interface Props {
	card: ProductItem;
}

const props = withDefaults(defineProps<Props>(), {
	card: () => ({} as ProductItem),
});

const router = useRouter()

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

const emit = defineEmits(['refresh'])

const routeTo = computed(() => {
	return { name: 'products', params: { id: props.card.$id } }
})

const itemAction = async (action: MenuAction) => {
	if (action === MenuAction.Edit) {
		router.push({
			name: 'products-create',
			query: { id: props.card.$id }
		})
	}
	if (action === MenuAction.Delete) {
		await api.products.deleteProduct(props.card.$id)
		emit('refresh')
	}
}
</script>

<style lang="scss" scoped>
.ads-card {
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
	}

	&__price {
		margin: 0;
		max-width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
}
</style>
