<template>
	<div class="products-create-segment-images">
		<span class="products-create-segment-images__label">{{ $t('Photo') }}</span>
		<ui-image-upload :image-size-limit="10 * 1024 * 1024" :init-file="initFile"
			class="products-create-segment-images__images" @file="handleFileUpload" />
		<div>
			<label class="products-create-segment-images__label">{{ $t('Description') }}
				<textarea v-model="segmentData.description" class="products-create-segment-images__textarea" maxlength="1500"
					:placeholder="$t('ad.descriptionText')" />
			</label>
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

const segmentData = ref<{
	description: string;
	images: string[];
}>({
	description: '',
	images: []
})

const initFile = computed(() => {
	if (editableProduct.value) {
		return editableProduct.value.images[0]
	} else {
		return null
	}
})

const handleFileUpload = (id: string) => {
	segmentData.value.images[0] = id;
};

if (route.query.id && editableProduct.value) {
	segmentData.value = {
		description: editableProduct.value.description || '',
		images: editableProduct.value.images ? [editableProduct.value.images[0].$id] : []
	}

	const isFinished = !!segmentData.value.description && !!segmentData.value.images.length
	model.value = isFinished
}

watch(() => editableProduct.value, () => {
	if (route.query.id && editableProduct.value) {
		segmentData.value = {
			description: editableProduct.value.description || '',
			images: editableProduct.value.images ? [editableProduct.value.images[0].$id] : []
		}

		const isFinished = !!segmentData.value.description && !!segmentData.value.images.length
		model.value = isFinished
	}
})

watch(() => segmentData.value, () => {
	const isFinished = !!segmentData.value.description && !!segmentData.value.images.length
	model.value = isFinished

	productsCreateStore.setPropsToPayload(segmentData.value)
}, { deep: true })

onUnmounted(() => {
	model.value = false
	segmentData.value = {
		description: '',
		images: []
	}
	productsCreateStore.setPropsToPayload(segmentData.value)
})
</script>

<style lang="scss" scoped>
.products-create-segment-images {
	&__label {
		margin: 10px 0;
		color: $text-primary;
		font-size: 22px;
		display: block;
	}

	&__textarea {
		@include text-style(400, 22);
		border-radius: 9px;
		background-color: $input-background;
		display: block;
		box-sizing: border-box;
		width: 100%;
		margin: 0;
		resize: none;
		white-space: pre-wrap;
		border: 2px solid $primary;
		outline: transparent;
		word-wrap: break-word;
		min-height: 140px;
		max-height: 140px;
		overflow: auto;
		padding: 26px;
		margin-top: 10px;

		@include adaptive(600) {
			padding: 8px;
		}
	}

	&__textarea::-webkit-scrollbar {
		display: block !important;
	}

	&__btn {
		width: 100%;
	}

	& :deep(.ui-button) {
		@include adaptive(350) {
			width: 100%;
			max-width: 100%;
		}
	}
}
</style>
