<template>
	<div class="upload-avatar-wrapper" @click="onChoiceFile">
		<div class="upload-avatar">
			<user-avatar :src="src" size="large" />
			<input ref="uploadAvatarInput" class="upload-avatar__input" type="file" @change="onUploadFile">
		</div>
	</div>
</template>

<script setup lang="ts">
import UserAvatar from '~/components/user/UserAvatar.vue'

interface ProfileAvatarProps {
	src?: string;
}

defineProps<ProfileAvatarProps>()
const emit = defineEmits<{
	(e: 'upload-file', file: File): void
}>()

const uploadAvatarInput = ref<HTMLInputElement | null>(null)

const onChoiceFile = () => {
	uploadAvatarInput.value?.click()
}

const onUploadFile = (event: Event) => {
	const target = event.target as HTMLInputElement
	const file = target.files?.[0]
	if (!file) { return }
	emit('upload-file', file)
}

</script>

<style lang="scss" scoped>
.upload-avatar-wrapper {
	width: 92px;
	height: 92px;
	border-radius: 50%;
	overflow: hidden;
	cursor: pointer;
	position: relative;
	opacity: 1;

	.user-avatar {
		height: 100%;
		border-radius: 50%;
	}

	.upload-avatar {
		height: 100%;
		width: 100%;
		background-color: $primary;

		&__icon {
			position: absolute;
			width: 24px;
			height: 24px;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 10;

			&_hide {
				display: none;
			}
		}

		&__input {
			display: none;
		}
	}

	&:hover {
		.user-avatar {
			filter: brightness(0.5);
		}

		.upload-avatar__icon {
			display: block;
		}
	}
}
</style>
