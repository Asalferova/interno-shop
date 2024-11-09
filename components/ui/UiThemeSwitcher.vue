<template>
	<div class="ui-theme-switcher">
			<span class="ui-theme-switcher__text">{{ $t("theme") }}</span>
			<div class="ui-theme-switcher__btns">
				<ui-button v-for="theme in themeNames" :key="theme" @click="switchTheme(theme)"
					:class="{ active: colorMode.preference === theme }" :color="'transparent'">{{ $t(theme) }}</ui-button>
			</div>
	</div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
const emit = defineEmits(["themeChanged"]);

const themeNames = ["light", "dark"] as const;
type Theme = (typeof themeNames)[number];

const switchTheme = (newTheme: Theme) => {
	colorMode.preference = newTheme;
	emit("themeChanged", newTheme);
};
</script>

<style lang="scss" scoped>
.ui-theme-switcher {
	padding: 10px;

	&__text {
		display: inline-block;
		font-weight: 600;
		color: $text-primary;
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
