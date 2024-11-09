import type { ProductItem } from './products/products.item'

export interface Author {
	name: string,
	$id: string,
	$createdAt: string,
	$updatedAt: string,
	$permissions: string[],
	$databaseId: string,
	$collectionId: string,
	avatar: string
}

export interface Comment {
	text: string,
	$id: string,
	$createdAt: string,
	$updatedAt: string,
	$permissions: string[],
	product: ProductItem,
	author: Author,
	$databaseId: string,
	$collectionId: string,
	rating: string
}

export interface CommentData {
	text: string,
	product: string,
	author: string,
	rating: string
}

export namespace CommentsApi {
	export namespace CreateComment {
		export type RequestDTO = Partial<{}> & {
			documentId: string;
			data: CommentData
		}
	}
}
