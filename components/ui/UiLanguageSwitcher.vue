<template>
	<div class="ui-language-switcher">
		<span class="ui-language-switcher__text">{{ $t("Language") }}</span>
		<div class="ui-language-switcher__btns">
			<ui-button v-for="lang in languageNames" :key="lang" @click="switchLocale(lang)" :color="'transparent'"
				:class="{ active: currentLocale === lang }">{{ $t(lang) }}
			</ui-button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useLocaleStore } from "~/store/locale";
import type { Locale } from "~/types/languages";

const localeStore = useLocaleStore()
const { currentLocale } = storeToRefs(localeStore)

const languageNames: Locale[] = ["ru", "en"]

const switchLocale = (newLocale: Locale) => {
	localeStore.setLocale(newLocale)
};
</script>

<style lang="scss">
.ui-language-switcher {
	padding: 10px;

	&__text {
		display: inline-block;
		color: $text-primary;
		font-weight: 600;
		margin-bottom: 10px;
	}

	&__btns {
		display: flex;
		gap: 30px;
	}

	.active {
		color: $primary-hover-text;
		pointer-events: none;
	}
}
</style>
