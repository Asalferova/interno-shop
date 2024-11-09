<template>
	<div class="user-panel user-panel--comment">
		<div class="user-panel__avatar">
			<user-avatar :src="avatar" />
		</div>
		<div>
			<div class="user-panel__name">
				{{ authorName }}
			</div>
			<div class="user-panel__publish-date">
				{{ relativePublishDate }}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { format, isToday, isYesterday } from 'date-fns'
import UserAvatar from '@/components/user/UserAvatar.vue'
import { parseISO } from 'date-fns';
import { computed, useI18n } from '#imports';
import { useLocaleStore } from '~/store/locale';

interface Props {
	authorName: string;
	publishDate: string;
	avatar?: string;
}

const props = defineProps<Props>()

const localeStore = useLocaleStore()
const { currentLocale } = storeToRefs(localeStore)

const locale = computed(() => {
	return currentLocale.value === 'ru' ? 'ru-RU' : 'en-EN'
})

const { t } = useI18n()

const relativePublishDate = computed(() => {
	const date = parseISO(props.publishDate)
	const time = format(date, 'h:mm a')
	if (isToday(date)) {
		return t('todayAt', { time })
	}
	if (isYesterday(date)) {
		return t('yesterdayAt', { time })
	}
	return date.toLocaleDateString(locale.value, {
		month: 'long', day: 'numeric', year: 'numeric'
	})
})
</script>

<style lang="scss" scoped>
.user-panel {
	$block: &;

	display: flex;
	align-items: center;

	&--comment {
		#{$block}__name {
			color: $text-primary;
		}
	}

	&__avatar {
		margin-right: 16px;
	}

	&__name {
		@include adaptive(1124) {
			font-size: 16px;
		}

		@include adaptive(767) {
			font-size: 13px;
		}
	}

	&__publish-date {
		color: $text-primary;
		font-size: 17px;

		@include adaptive(767) {
			font-size: 13px;
		}
	}
}
</style>
