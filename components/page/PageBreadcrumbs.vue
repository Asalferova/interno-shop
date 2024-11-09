<template>
	<nav class="breadcrumbs">
		<ol class="breadcrumbs__list">
			<li class="breadcrumbs__crumb" v-for="(crumb, index) in displayedCrumbs" :key="`breadcrumb-${index}`">
				<nuxt-link class="breadcrumbs__link" :to="crumb.path || ''"
					:class="{ 'breadcrumbs__link--current': !crumb.path }" :disabled="!crumb.path">
					<span v-if="!crumb.withoutTranslation">
						{{ $t(crumb.name) }}
					</span>
					<span v-else>
						{{ crumb.name }}
					</span>
				</nuxt-link>
				<span v-if="crumb.path" class="breadcrumbs__circle"></span>
			</li>
		</ol>
	</nav>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

interface Breadcrumbs {
	name: string;
	path: string | null;
	withoutTranslation?: boolean;
}
const props = withDefaults(
	defineProps<{
		crumbs: Breadcrumbs[];
	}>(),
	{
		crumbs: () => [{ name: "Main", path: "/" }],
	}
);

const displayedCrumbs = computed<Breadcrumbs[]>(() => {
	return [{ name: "Main", path: "/" }, ...props.crumbs];
});
</script>
<style lang="scss">
.breadcrumbs {
	margin: 0;

	&__crumb {
		display: flex;
		align-items: center;
		text-decoration: none;
	}

	&__list {
		display: flex;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	&__link {
		@include text-style(600, 19);
		padding: 10px 0;
		text-decoration: none;
		color: $text-primary;

		@include adaptive(600) {
			@include text-style(400, 19);
			max-width: 200px;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}

		@include adaptive(450) {
			max-width: 120px;
		}

		&:hover {
			color: $primary-hover-text;
		}

		&--current {
			color: $text-primary;

			&:hover {
				color: $text-primary;
			}
		}
	}
	&__circle {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: $primary;
		margin: 0px 10px;
	}
}
</style>
