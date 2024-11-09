<template>
	<div class="ui-collapsed-text">
		<div class="ui-collapsed-text__content" :style="`max-height: ${currentContentHeight}px`">
			<div ref="content" class="ui-collapsed-text__content-text">
				<slot name="content" />
			</div>
		</div>
		<ui-button v-if="fullContentHeight > startContentHeightValue" :color="'secondary'"
			class="ui-collapsed-text__collapse-button" @click="toggleCollapsedState">
			{{ isCollapsed ? $t("Show more") : $t("ShowLess") }}
		</ui-button>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';


const startContentHeightValue = 83;
const isCollapsed = ref(true);
const fullContentHeight = ref(0);
const currentContentHeight = ref(startContentHeightValue);

const content = ref<HTMLElement | null>(null);

const toggleCollapsedState = () => {
	if (!isCollapsed.value) {
		currentContentHeight.value = startContentHeightValue;
		isCollapsed.value = true;
		return;
	}

	currentContentHeight.value = fullContentHeight.value;
	isCollapsed.value = false;
};

onMounted(() => {
	if (content.value?.clientHeight) {
		fullContentHeight.value = content.value?.clientHeight;
	}
});
</script>

<style lang="scss" scoped>
.ui-collapsed-text {
	&__content {
		overflow: hidden;
		color: $text-primary;
		line-height: 1.3;
		font-size: 22px;
		font-weight: 400;
		letter-spacing: 0.22px;
		transition: max-height 0.2s ease-in-out;
		margin-bottom: 5px;

		@include adaptive(1124) {
			@include text-style(400, 16);
			margin-bottom: 5px;
		}

		@include adaptive(767) {
			@include text-style(400, 13);
			margin-bottom: 5px;
		}

		&--shown {
			max-height: none;
		}
	}

	&__collapse-button {
		padding: 5px;
		font-size: 16px;

		@include adaptive(767) {
			@include text-style(400, 11);
		}
	}
}
</style>
