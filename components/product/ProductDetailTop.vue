<template>
	<div class="product-detail-top">
		<ui-back-link></ui-back-link>
		<div class="product-detail-top__btns">
				<ui-favorites-button :product-id="String(route.params.id)"></ui-favorites-button>
			<client-only>
				<tippy ref="tippyEl" theme="menu" :tag="null" content-tag="div" content-class="actions" interactive
					trigger="click" hide-on-click :arrow="false" placement="bottom-end">
					<div class="product-detail-top__action">
						<ui-svg :name="'share'" class="product-detail-top__btn"></ui-svg>
					</div>
					<template #content="{ hide }">
						<div class="product-detail-top__share">
							<product-actions-share-network title="Telegram" network="telegram"
								class="product-detail-top__share-link link" :style="'display:block;'" @click="hide()">
								<ui-button :color="'transparent'" :prependIcon="'telegram'">{{
									$t("Telegram")
								}}</ui-button>
							</product-actions-share-network>
							<ui-button v-clipboard:copy="productLink" v-clipboard:success="hide" :color="'transparent'"
								:prependIcon="'copy'" class="product-detail-top__share-link">{{ $t("CopyLink") }}
							</ui-button>
						</div>
					</template>
				</tippy>
			</client-only>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { useRuntimeConfig } from "#imports";
import { computed } from "vue";
import { useRoute } from "vue-router";

const config = useRuntimeConfig();
const route = useRoute();

const productLink = computed(() => {
	if (
		(config.public.baseUrl as string).endsWith("/") &&
		route.path.startsWith("/")
	) {
		return `${config.public.baseUrl + route.path.substring(1)}`;
	} else {
		return `${config.public.baseUrl + route.path}`;
	}
});

</script>
<style lang="scss" scoped>
.product-detail-top {
	width: 100%;
	display: flex;
	justify-content: space-between;

	&__btns {
		display: flex;
		gap: 8px;
	}

	&__btn {
		width: 24px;
		height: 24px;
		color: $text-primary;
		transition: all 0.3s;
		cursor: pointer;

		&:hover {
			color: $primary-hover-text;
		}
	}

	&__share-link {
		padding: 10px;
	}

	& :deep(.ui-button--transparent) {
		svg {
			margin-right: 10px;
		}
	}
}
</style>
