<template>
	<nuxt-link :to="{path:
		'/'
	}" class="page-logo">
		<ui-svg :name="'logo'" class="page-logo__logo" itemprop="image"></ui-svg>
		<span class="page-logo__name" itemprop="name">{{ $t('siteTitle') }}</span>
	</nuxt-link>
</template>

<style lang="scss" scoped>
.page-logo {
	display: flex;
	align-items: center;
	text-decoration: none;

	&__logo {
		width: 34px;
		height: 34px;
	}

	&__name {
		@include text-style(400, 40);
		@include DMSerifDisplay();
		margin-left: 10px;
		color: $text-primary;
	}
}
</style>
