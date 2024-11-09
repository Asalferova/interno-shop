import api from '~/api'
import { useProductsStore } from '~/store/products'
import type { CommentsApi } from '~/types/comments'

export const useProductsCommentsStore = defineStore('productsCommentsStore', () => {
	const route = useRoute()
	const productsStore = useProductsStore()
	const id = computed(() => route.params.id as string)

	const createComment = async (form: CommentsApi.CreateComment.RequestDTO) => {
		try {
			await api.comments.createComment(form)
			await productsStore.getProduct(id.value)
		} catch (e) {
			console.warn(e)
		}
	}

	const deleteComment = async (commentId: string) => {
		try {
			await api.comments.deleteComment(commentId)
			await productsStore.getProduct(id.value)
		} catch (e) {
			console.warn(e)
		}
	}

	return {
		createComment,
		deleteComment
	}
})
