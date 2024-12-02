<template>
	<div class="ui-image-upload ui-image-upload__wrapper">
		<img v-if="uploadedFile && uploadedFile.src" :src="uploadedFile.src"
			class="ui-image-upload__image" />
		<div class="ui-image-upload__btn">
			<ui-button :color="'primary'" @click="onChoiceFile">
				{{ uploadedFile?.src ? $t('Change') : $t('download') }}
			</ui-button>
			<input ref="uploadFileInput" class="ui-image-upload__input" type="file" @change="addNewImage">
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import api from '~/api';
import type { MediaImage } from '~/types/media';
import { v4 as uuid } from "uuid";

const props = withDefaults(defineProps<{
	imageSizeLimit: number | null;
	initFile?: MediaImage | null
}>(), {
	imageSizeLimit: null,
	initFile: null
})

const emit = defineEmits<{
	file: [id: string],
	image: [image: MediaImage]
}>();

const uploadedFile = ref<MediaImage | null>(null);
const uploadFileInput = ref<HTMLInputElement | null>(null)

const onChoiceFile = () => {
	uploadFileInput.value?.click()
}

const addNewImage = (event: Event) => {
	const file = (event.target as HTMLInputElement).files?.[0];
	if (file) {
		handleFileUpload(file);
	}
}

const handleFileUpload = async (file: File) => {
	if (props.imageSizeLimit && file.size > props.imageSizeLimit) {
		alert('File is too large');
		return;
	}
	await uploadFile(file);
}

const uploadFile = async (file: File) => {
	const formData = new FormData();
	const fileId = uuid();
	const permissions = ["read(\"any\")"]
	formData.append('fileId', fileId);
	formData.append('file', file)
	permissions.forEach(permission => {
		formData.append('permissions[]', permission);
	});
	const { $id, name } = await api.upload.uploadFile(formData)
	if ($id && name) {
		const avatar_url = `https://cloud.appwrite.io/v1/storage/buckets/storage/files/${$id}/view?project=interno-shop&project=interno-shop`
		const res = await api.upload.createFile({
			documentId: $id, data: {
				name: name, src: avatar_url
			}
		})

		uploadedFile.value = res;
		emit('file', res.$id);
	}
}

watch(() => props.initFile, (newFile) => {
	uploadedFile.value = newFile;
}, { immediate: true });
</script>

<style lang="scss" scoped>
.ui-image-upload {
	&__wrapper {
		display: flex;
		align-items: flex-end;
		gap: 12px;

		@include adaptive(350) {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	&__input {
		display: none;
	}

	&__image {
		width: 126px;
		min-width: 126px;
		height: 100%;
		background-color: var(--primary);
		border-radius: 16px;
		aspect-ratio: 0.65;
		object-fit: contain;
		object-position: center;

		@include adaptive(350) {
			width: 100%
		}
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
