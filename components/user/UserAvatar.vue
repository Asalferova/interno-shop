<template>
	<div class="user-avatar" :class="`user-avatar--${size}`">
		<div class="user-avatar__image-wrap">
			<ui-circle-image :src="src" class="user-avatar__image" />
		</div>
	</div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
	src?: string;
	size?: 'small' | 'medium' | 'large';
}>(), {
	size: 'medium'
})
</script>

<style lang="scss" scoped>
.user-avatar {
	$block: &;

	position: relative;

	&__image-wrap {
		overflow: hidden;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	&--small {
		width: 32px;
		height: 32px;
	}

	&--medium {
		width: 40px;
		height: 40px;
	}

	&--large {
		width: 92px;
		height: 92px;
	}

	&__image {
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
}
</style>
