import { getApiUrl } from '.'

type MediaImage = {
	$createdAt: string;
	$id: string;
	$permissions: string[];
	$updatedAt: string;
	name: string;
	bucketId: string,
	signature: string,
	mimeType: string,
	sizeOriginal: number,
	chunksTotal: number,
	chunksUploaded: number
}

type ImageCreate = {
	documentId: string,
	data: {
		name: string;
		src: string
	}
}

const upload = {
	uploadFile: async (file: FormData): Promise<MediaImage> => {
		return await $http.$post('/upload/storage/buckets/storage/files/', { body: file })
	},
	createFile: async (body: ImageCreate) => {
		return await $http.$post(getApiUrl('internoBD', 'images'), { body })
	}
}

export default upload
