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

const upload = {
	uploadFile: async (file: FormData): Promise<MediaImage> => {
		return await $http.$post(`/upload/storage/buckets/storage/files/`, { body: file })
	},
}

export default upload
