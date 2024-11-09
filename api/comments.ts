import { getApiUrl } from '.'
import type { CommentsApi } from '~/types/comments'

const comments = {
	createComment: async (body: CommentsApi.CreateComment.RequestDTO) => {
		return await $http.$post(getApiUrl('internoBD', 'comments'), { body })
	},
	deleteComment: async (commentId: string) => {
		return await $http.delete(`${getApiUrl('internoBD', 'comments')}/${commentId}`)
	}
}

export default comments
