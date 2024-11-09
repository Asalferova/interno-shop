<template>
	<div class="ui-circle-image">
		<img :src="checkedSrc" class="ui-circle-image__image" alt="">
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
	src: {
		type: String,
		default: '/images/default-avatar.webp'
	},
})

const checkedSrc = computed(() => {
	if (!props.src) {
		return '/images/default-avatar.webp'
	} else {
		return props.src
	}
})
</script>

<style lang="scss" scoped>
@import "/assets/scss/core";

.ui-circle-image {
	@include in-center;
	position: relative;

	&__image {
		border-radius: 50%;
		object-fit: cover;
		object-position: center;
		height: 100%;
		width: 100%;
		user-select: none;
	}
}
</style>
