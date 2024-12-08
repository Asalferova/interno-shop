<template>
	<centered-modal class="order-created-message-modal">
		<h3 class="order-created-message-modal__title">{{ $t('orderSuccessMessage') }}</h3>
		<span class="order-created-message-modal__text">
			{{ $t('orderSuccessMessageInfo') }}
		</span>
	</centered-modal>
</template>
<script lang="ts" setup>
import CenteredModal from "~/components/modals/CenteredModal.vue";
</script>
<style lang="scss" scoped>
.order-created-message-modal {
	&__title {
		color: $text-primary;
		margin-top: 45px;
	}

	&__text {
		display: inline-block;
		max-width: 360px;
		color: $text-primary;
	}
}
</style>
