<template>
	<share-network ref="shareNetworkRef" :title="props.title" :url="productLink" :network="props.network"
		@open="runWorkaround">
		<slot />
	</share-network>
</template>

<script lang="ts" setup>
import { computed, ref, useRuntimeConfig } from '#imports';
import { useRoute } from 'vue-router'

const props = withDefaults(defineProps<{
	title: string,
	network: string
}>(), {
	title: '',
	network: ''
})

const config = useRuntimeConfig()
const route = useRoute()
const shareNetworkRef = ref(null)

const runWorkaround = (): void => {
	if (shareNetworkRef.value === null) return

	//@ts-ignore
	clearInterval(shareNetworkRef.value.popupInterval)
	//@ts-ignore
	shareNetworkRef.value.popupWindow = undefined
}

const productLink = computed(() => {
	if ((config.public.baseUrl as string).endsWith('/') && route.path.startsWith('/')) {
		return `${config.public.baseUrl + route.path.substring(1)}`
	} else {
		return `${config.public.baseUrl + route.path}`
	}
})
</script>
