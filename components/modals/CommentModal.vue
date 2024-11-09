<template>
	<centered-modal class="comment-modal" @update:model-value="(val) => emit('update:modelValue', val)">
		<div class="comment-modal__wrapper">
			<div :class="'comment-modal__rating'">
				<span class="comment-modal__label">{{ $t('Leave a rating') }}</span>
				<ui-rating-star :selectedStar="rating" @star-selected="handleStarSelected"></ui-rating-star>
			</div>
			<div class="comment-modal__comment">
				<label><span class="comment-modal__label">{{ $t('reviews.leaveReview') }}</span>
					<textarea ref="textarea" v-model="comment" class="comment-modal__comment-textarea" maxlength="2500"
						:placeholder="$t('reviews.reviewText')" />
				</label>
			</div>
			<div v-if="error" class="comment-modal__error">{{ error }}</div>
			<ui-button :color="'primary'" @click="submit" class="comment-modal__btn">{{ $t('Publish') }} </ui-button>
		</div>
	</centered-modal>
</template>
<script lang="ts" setup>
import { ref, useRoute } from "#imports";
import { storeToRefs } from "pinia";
import { v4 as uuid } from "uuid";
import CenteredModal from "~/components/modals/CenteredModal.vue";
import { useAuthStore } from "~/store/auth";
import { useProductsCommentsStore } from "~/store/products/products.comments";
import { useI18n } from "#imports";

const commentsStore = useProductsCommentsStore();

const route = useRoute();
const { t } = useI18n();

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const emit = defineEmits<{
	(e: "update:modelValue", modelValue: boolean): void;
}>();

const rating = ref("");
const comment = ref("");
const error = ref('');

const handleStarSelected = (selectedStar: string) => {
	oninput()
	rating.value = selectedStar;
};

const createComment = async () => {
	if (user.value) {
		const form = {
			documentId: uuid(),
			data: {
				text: comment.value,
				rating: rating.value,
				product: route.params.id as string,
				author: user.value.$id,
			},
		};
		await commentsStore.createComment(form);
		emit("update:modelValue", false);
		comment.value = "";
		rating.value = "";
	}
};

const submit = async () => {
	if (rating.value) {
		await createComment();
	} else {
		error.value = t('ratingRequired');
	}
};

const oninput = () => {
	error.value = '';
};
</script>
<style lang="scss" scoped>
.comment-modal {
	&__wrapper {
		width: 100%;
		overflow: hidden;
		margin: 26px 0;
	}

	&__header {
		&-name {
			cursor: pointer;
			@include text-ellipsis();

			&:hover {
				color: $primary-hover-text;
			}
		}

	}

	&__label {
		display: block;
		margin-bottom: 5px;
		color: $text-primary;
	}

	&__rating {
		margin-bottom: 10px;

		&-error {
			span {
				color: $accent;
			}
		}
	}

	&__comment {
		margin-bottom: 26px;

		&-textarea {
			@include text-style(400, 22);
			line-height: 1;
			letter-spacing: 0.16px;
			border-radius: 9px;
			background-color: $white;
			display: block;
			box-sizing: border-box;
			width: 100%;
			margin: 0;
			resize: none;
			white-space: pre-wrap;
			border: 2px solid $primary;
			outline: transparent;
			word-wrap: break-word;
			min-height: 140px;
			max-height: 140px;
			overflow: auto;
			padding: 26px;
		}
	}

	&__btn {
		width: 100%;
		max-width: none;
	}

	&__error {
		color: $lighterror;
		padding-bottom: 26px;
		@include adaptive(600) {
			font-size: 13px;
		}
	}
}
</style>
