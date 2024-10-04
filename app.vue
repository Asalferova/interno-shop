<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ref, useHead, watch } from '#imports'
import 'virtual:svg-icons-register'

const { t, locale } = useI18n()

const updateTitle = (title?: string) => {
	return (title?.length && title !== `${t('siteTitle')}`)
		? `${title} | ${t('siteTitle')} - ${t('siteDescription')}`
		: `${t('siteTitle')} - ${t('siteDescription')}`
}

const titleTemplate = ref(updateTitle)

watch(locale, () => {
	titleTemplate.value = updateTitle
	useHead({
		titleTemplate: titleTemplate.value
	})
})

useHead({
	titleTemplate: titleTemplate.value
})
</script>
