<template>
	<div class="products-create-segment-price">
		<products-create-input v-model="segmentData.price" :label="$t('Price')" mode="input-price" required
			class="products-create-segment-price__input--price" />
		<products-create-input v-model="segmentData.initialPrice" :label="$t('PriceWithoutDiscounts')" mode="input-price"
			class="products-create-segment-price__input--price" />
	</div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useProductsCreateStore } from '~/store/productsCreate'

const route = useRoute()

const productsCreateStore = useProductsCreateStore(route.query.id as string || '')
const { editableProduct } = storeToRefs(productsCreateStore)

const props = withDefaults(defineProps<{
	complete: boolean;
}>(), {
	complete: false
})

const emit = defineEmits<{
	'update:complete': [state: boolean]
}>()

const model = useVModel(props, 'complete', emit)

const segmentData = ref({
	price: '',
	initialPrice: '',
	isDiscounted: false
})

if (editableProduct.value && route.query.id) {
	segmentData.value = {
		price: editableProduct.value.price ? editableProduct.value.price.toString() : '',
		initialPrice: editableProduct.value.initialPrice ? editableProduct.value.initialPrice.toString() : '',
		isDiscounted: editableProduct.value.isDiscounted || false
	}
}

watchEffect(() => {
	const isFinished = !!segmentData.value.price;
	model.value = isFinished;
	const priceValue = parseFloat(segmentData.value.price) || 0;
	const initialPriceValue = parseFloat(segmentData.value.initialPrice) || 0;

	segmentData.value.isDiscounted = !!initialPriceValue;

	const price = {
		price: priceValue,
		initialPrice: initialPriceValue,
		isDiscounted: segmentData.value.isDiscounted
	};

	productsCreateStore.setPropsToPayload(price);
});

onUnmounted(() => {
	model.value = false
	segmentData.value = {
		price: '',
		initialPrice: '',
		isDiscounted: false
	}

	const priceValue = 0;
	const initialPriceValue = 0;

	const price = {
		price: priceValue,
		initialPrice: initialPriceValue,
		isDiscounted: false
	};

	productsCreateStore.setPropsToPayload(price)
})
</script>
