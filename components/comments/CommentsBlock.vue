<template>
	<div class="comments">
		<div class="comments__head">
			<div class="comments__title">
				{{ $t('reviews.allReviews') }}
			</div>
			<div class="comments__btns">
				<ui-button :color="'primary'" @click="handleCommentClick" class="comments__btn">{{ $t('reviews.WriteReview')
					}}</ui-button>
			</div>
		</div>
		<div v-if="comments && comments.length" class="comments__list">
			<comments-item v-for="comment in comments" :key="comment.$id" :comment="comment" />
		</div>
		<div v-else class="comments__message">
			{{ $t('reviews.No reviews yet') }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import CommentsItem from '~/components/comments/CommentsItem.vue'
import type { Comment } from '@/types/comments'
import { useModal } from "vue-final-modal";
import CommentModal from "~/components/modals/CommentModal.vue";
import AuthModal from "~/components/auth/modal/AuthModal.vue";
import { useAuthStore } from '~/store/auth';
import { storeToRefs } from 'pinia';

defineProps<{ comments: Comment[] }>()

const authStore = useAuthStore();
const { loggedIn } = storeToRefs(authStore);

const { open: openCommentModal } = useModal({
	component: CommentModal,
});

const { open: openAuthModal } = useModal({
	component: AuthModal,
});

function handleCommentClick() {
	if (loggedIn.value) {
		openCommentModal();
	} else {
		openAuthModal();
	}
}
</script>

<style lang="scss" scoped>
.comments {
	&__head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 26px;

		@include adaptive(767) {
			margin-bottom: 15px;
		}
	}

	&__title {
		color: $text-primary;
		font-size: 35px;
		font-weight: bold;

		@include adaptive(767) {
			font-size: 22px;
		}
	}

	&__btn {
		@include adaptive(767) {
			font-size: 16px;
			padding: 5px 20px;
		}
	}

	&__message {
		color: $text-primary;

		@include adaptive(767) {
			font-size: 16px;
		}
	}
}
</style>
