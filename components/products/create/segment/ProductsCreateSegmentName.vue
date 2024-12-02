<template>
	<div class="products-create-segment-name">
		<div v-show="!isFinished">
			<products-create-input v-model="segmentData.name" mode="input" :required="true"
				class="products-create-segment-name__title" @blur="setTitle" />
			<ui-button :color="'primary'" class="products-create-segment-name__btn" :disabled="!filled" @click="handleSave">
				{{ $t('Save') }}
			</ui-button>
		</div>
		<div v-show="isFinished">
			<div @click="isFinished = false">
				<ui-input :model-value="segmentData.name" disabled class="products-create-segment-name__title"></ui-input>
				<ui-button :color="'primary'" class="products-create-segment-name__btn">
					{{ $t('Change') }}
				</ui-button>
			</div>
		</div>
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
	name: ''
})

const isFinished = ref(false)

if (route.query.id && editableProduct.value) {
	segmentData.value = {
		name: editableProduct.value.name || ''
	}

	isFinished.value = !!segmentData.value.name
	model.value = isFinished.value

	productsCreateStore.setPropsToPayload(segmentData.value)
}

const setTitle = (value: string) => {
	segmentData.value.name = value
}

const filled = computed(() => {
	return !!segmentData.value.name
})

function handleSave() {
	isFinished.value = filled.value
	model.value = isFinished.value
	productsCreateStore.setPropsToPayload(segmentData.value)
}

watch(() => editableProduct.value, () => {
	if (editableProduct.value) {
		segmentData.value = {
			name: editableProduct.value.name || ''
		}

		isFinished.value = !!segmentData.value.name
		model.value = isFinished.value

		productsCreateStore.setPropsToPayload(segmentData.value)
	}
})

onUnmounted(() => {
	model.value = false
	segmentData.value = {
		name: ''
	}
	productsCreateStore.setPropsToPayload(segmentData.value)
})
</script>

<style lang="scss" scoped>
.products-create-segment-name {
	&__title {
		margin-bottom: 15px;
	}

	&__btn {
		margin-left: auto;
	}

	& :deep(.ui-input__input) {
		border: 2px solid $primary;
		border-radius: 8px;
		height: 42px;
	}
}
</style>
