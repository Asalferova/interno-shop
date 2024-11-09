<template>
	<div class="comment" itemprop="review" itemscope itemtype="https://schema.org/Review">
		<div class="comment__content">
			<div class="comment__content-head">
				<user-panel v-if="comment.author" :author-name="comment.author.name" :publish-date="comment.$createdAt"
					:avatar="comment.author.avatar" itemprop=" author" />
				<div class="raiting" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
					<ui-rating-star :selectedStar="comment.rating" itemprop="ratingValue"></ui-rating-star>
				</div>
			</div>
			<div class="comment__content-text" itemprop="reviewBody">
				{{ comment.text }}
			</div>
			<client-only>
				<ui-button v-if="user?.$id === comment.author.$id" @click="deleteReview(comment.$id)"
					class="comment__content-btn">{{ $t("remove") }}</ui-button>
			</client-only>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { Comment } from "~/types/comments";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { useProductsCommentsStore } from "~/store/products/products.comments";

defineProps<{ comment: Comment }>();

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const commentsStore = useProductsCommentsStore();

const deleteReview = (id: string) => {
	commentsStore.deleteComment(id);
};
</script>

<style lang="scss" scoped>
.comment {
	margin-bottom: 32px;

	&:not(:last-child) {
		border-bottom: 1px solid $primary;
	}

	@include adaptive(600) {
		margin-bottom: 10px;
	}

	&__content {
		padding: 12px 0 16px;
		color: $text-primary;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		line-height: 1.3;

		&-head {
			display: flex;
			justify-content: space-between;
			width: 100%;
		}

		&-text {
			padding: 12px 0 0;
			width: 100%;

			@include adaptive(1124) {
				font-size: 16px;
			}

			@include adaptive(767) {
				font-size: 13px;
			}
		}

		&-btn {
			padding: 5px;
			font-size: 16px;

			@include adaptive(767) {
				@include text-style(400, 11);
			}
		}
	}
}
</style>
