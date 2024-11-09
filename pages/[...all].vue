<template>
	<div>
		<div class="not-found container">
			<page-breadcrumbs :crumbs="crumbs" class="not-found__breadcrumbs" />
			<h1 class="not-found__title">
				404
			</h1>
			<main class="not-found__message">
				{{ $t("Nothing found") }}
				<ui-button
					:color="'primary'"
					class="not-found__message-link"
					to="/"
				>
					{{ $t("Return to home") }}
				</ui-button>
			</main>
		</div>
	</div>
</template>

<script lang="ts" setup>
const crumbs = [{ name: '404', path: null }]
</script>

<style lang="scss" scoped>
.not-found {
	&__title {
		@include text-style(600, 35);
		margin: 15px 0;
		color: $text-primary;

		@include adaptive(600) {
			@include text-style(600, 25);
			margin-bottom: 15px;
		}
	}
  &__message {
		color: $text-primary;
		display: flex;
		align-items: center;
		gap: 26px;

		@include adaptive(767) {
			font-size: 16px;
		}

		&-link {
      @include adaptive(767) {
			font-size: 16px;
		}
		}
	}
}
</style>
