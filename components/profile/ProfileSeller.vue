<template>
	<div class="profile-seller">
		<p>{{ $t('storeName') }}: {{ seller?.name }} </p>
	</div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSellerStore } from '~/store/seller';

const sellerStore = useSellerStore();
const { seller } = storeToRefs(sellerStore)

</script>

<style lang="scss" scoped>
.profile-seller {
  color: $text-primary;
}
</style>
