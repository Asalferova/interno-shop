<template>
	<div class="products-create-segment-specs">
		<div class="products-create-segment-specs__item">
			<products-create-input v-model="segmentData.author" mode="input" :label="$t('ad.author')"
				class="products-create-segment-name__title" @blur="setTitle" />
			<products-create-input-checkbox v-model:model-value="segmentData.category" :options="formattedCategories"
				:label="$t('ad.categories')"></products-create-input-checkbox>
			<products-create-input-checkbox v-if="segmentData.category?.length" v-model:model-value="segmentData.subcategory"
				:options="filteredSubcategories" :label="$t('ad.subcategories')"></products-create-input-checkbox>
			<products-create-input-select v-model="segmentData.locale" :options="['ru', 'en']" :label="$t('Language')" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useProductsCreateStore } from '~/store/productsCreate'
import type { CreateProductDto } from '~/types/productsCreate'
import { categoryOptions } from "~/helpers/filterOptions";

const { t } = useI18n();
const route = useRoute()
type SegmentData = Pick<CreateProductDto, 'author' | 'category' | 'subcategory' | 'locale'>;

const segmentData = ref({} as SegmentData);
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

const formattedCategories = computed(() => {
	return categoryOptions.map(category => ({
		label: t(`categories.${category.label}`),
		value: category.label
	}));
});

const filteredSubcategories = computed(() => {
	return categoryOptions
		.filter(category => segmentData.value.category.includes(category.label))
		.flatMap(category => category.subcategories.map(subcategory => ({
			label: t(`subCategories.${subcategory.label}`),
			value: subcategory.label
		})));
});

const isFinished = ref(false)

if (route.query.id && editableProduct.value) {
	segmentData.value = {
		author: editableProduct.value.author || '',
		category: editableProduct.value.category || [],
		subcategory: editableProduct.value.subcategory || [],
		locale: editableProduct.value.locale || 'ru'
	}

	isFinished.value =
	  !!segmentData.value.author &&
	  !!segmentData.value.category &&
	  !!segmentData.value.subcategory &&
	  !!segmentData.value.locale

	model.value = isFinished.value

	productsCreateStore.setPropsToPayload(segmentData.value)
}

const setTitle = (value: string) => {
	segmentData.value.author = value
}

const filled = computed(() => {
	return !!segmentData.value.author &&
	  !!segmentData.value.category &&
	  !!segmentData.value.subcategory &&
	  !!segmentData.value.locale
})


watch(() => segmentData.value, () => {
	isFinished.value = filled.value
	model.value = isFinished.value
	productsCreateStore.setPropsToPayload(segmentData.value)
}, { deep: true })

watch(() => editableProduct.value, () => {
	if (editableProduct.value) {
		segmentData.value = {
			author: editableProduct.value.author || '',
			category: editableProduct.value.category || [],
			subcategory: editableProduct.value.subcategory || [],
			locale: editableProduct.value.locale || 'ru'
		}

		isFinished.value = !!segmentData.value.author &&
	  !!segmentData.value.category &&
	  !!segmentData.value.subcategory &&
	  !!segmentData.value.locale
		model.value = isFinished.value

		productsCreateStore.setPropsToPayload(segmentData.value)
	}
})

onUnmounted(() => {
	model.value = false
	segmentData.value = {
		author: '',
		category: [],
		subcategory: [],
		locale: 'ru',
	}
	productsCreateStore.setPropsToPayload(segmentData.value)
})

</script>
