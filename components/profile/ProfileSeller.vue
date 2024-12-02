<template>
	<div class="profile-seller" v-if="sellerDB && Object.keys(sellerDB).length">
		<div class="profile-seller__wrapper">
			<ui-input :model-value="sellerDB.name" class="profile-seller__input" :label="$t('storeName')"
				:placeholder="$t('storeName')" size="medium" border-radius="small" disabled></ui-input>
		</div>
		<div class="profile-seller__btns">
			<ui-button class="profile-seller__btn" color="primary" @click="router.push({
				name: 'products-create',
				query: { seller: sellerDB.name }
			})">
				{{ $t('ad.newAds') }}
			</ui-button>
		</div>
		<h3 class="profile-seller__title">{{ $t('profile.active') }}</h3>
		<template v-if="sellerProductsData && sellerProductsData.length">
			<profile-ads-card v-for="product in sellerProductsData" :key="product.$id" :card="product"
			class="profile-seller__product" @refresh="sellerProductsStore.fetchRequests()"></profile-ads-card>
		</template>
		<template v-else>
			<div class="profile-seller__message">
				{{ $t("Nothing found") }}
			</div>
		</template>
	</div>
</template>
<script lang="ts" setup>
import { useAuthStore } from '~/store/auth';
import { useSellerProductsStore } from '~/store/seller/seller.products';

const router = useRouter()

const authStore = useAuthStore()
const { sellerDB } = storeToRefs(authStore)

const sellerProductsStore = useSellerProductsStore(sellerDB.value?.name || '')
sellerProductsStore.fetchRequests()
const { sellerProductsData } = storeToRefs(sellerProductsStore)

const el = ref<Document | null>(null);

onMounted(() => {
	el.value = document;
	useInfiniteScroll(el, sellerProductsStore.loadMore, { distance: 100 });
});

</script>

<style lang="scss" scoped>
.profile-seller {
	$profile: &;

	&__wrapper {
		padding-top: 40px;
		display: flex;
		flex-wrap: wrap;
		max-width: 998px;
		gap: 24px;
		margin-bottom: 40px;

		#{$profile}__input {
			max-width: 316px;
		}
	}

	&__title {
		color: $text-primary;
		margin: 35px 0 0 0;
	}

	&__btns {
		display: flex;
		gap: 15px;
		flex-wrap: wrap;
		flex-direction: row-reverse;
	}

	&__btn {
		padding: 0 110px;
		height: 42px;

		@include adaptive(500) {
			height: 52px;
			font-size: 17px;
		}
	}

	&__product {
		padding-bottom: 5px;
		margin-bottom: 12px;

		&:not(:last-child) {
			border-bottom: 1px solid $primary;
		}
	}
	&__message {
		color: $text-primary;
		margin: 26px 0;
	}

	& :deep(.ui-input__input) {
		border: 2px solid $primary;
		height: 42px;
	}

	& :deep(.ui-input__wrapper) {
		height: 56px;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-end;
	}
}
</style>
