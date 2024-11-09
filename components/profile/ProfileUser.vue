<template>
	<div class="profile-user">
		<p>{{$t('name')}}: {{ user?.name }}</p>
	</div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

</script>

<style lang="scss" scoped>
.profile-user {
  color: $text-primary;
}
</style>
