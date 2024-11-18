<template>
	<div v-if="!cookiesEnabled && showCookieConsent" class="cookie-consent container">
		<div class="cookie-consent__close" @click="hide"><ui-svg :name="'close'"
				class="cookie-consent__close-icon"></ui-svg></div>
		<p class="cookie-consent__message">{{ $t('cookieMessage') }}</p>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useCookieStore } from '~/store/cookieStore';

const cookieStore = useCookieStore();
const { cookiesEnabled } = storeToRefs(cookieStore);

const showCookieConsent = ref(true);

const hide = () => { showCookieConsent.value = false; };
</script>

<style lang="scss" scoped>
.cookie-consent {
	position: fixed;
	bottom: 20px;
	left: 52px;
	right: 52px;
	background-color: $background;
	padding: 0 20px 20px 20px;
	text-align: center;
	z-index: 1000;
	border: 2px solid $primary;
	width: calc(100% - 104px);
	border-radius: 16px;
	color: $accent;

	@include adaptive(1024) {
		border: 1px solid $primary;
		bottom: 95px;
		font-size: 17px;
	}

	@include adaptive(600) {
		left: 12px;
		right: 12px;
		width: calc(100% - 24px);
		font-size: 14px;
	}

	&__message {
		margin: 10px;
	}

	&__close {
		position: relative;
		opacity: 1;
		padding: 20px;
		height: fit-content;
		width: 100%;

		&-icon {
			position: absolute;
			right: 0;
			width: 24px;
			height: 24px;
			cursor: pointer;
			color: $accent;
		}
	}
}
</style>
