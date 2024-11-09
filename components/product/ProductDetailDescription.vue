<template>
	<div itemprop="description" class="product-detail-description">
		<ui-collapsed-text>
			<template #content>
				{{ description }}
			</template>
		</ui-collapsed-text>
	</div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
	description: string;
}>(), {
	description: ''
})
</script>
