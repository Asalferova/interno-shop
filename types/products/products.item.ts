import type { Locale } from '../languages'
import type { CurrencyName } from '../currency'
import type { MediaImage } from '~/types/media'
import type { Comment } from '~/types/comments'

export interface ProductItem {
	$collectionId: string,
	$createdAt: string,
	$databaseId: string,
	$id: string,
	$permissions?: string[],
	$updatedAt: string,
	images: MediaImage[]
	name: string,
	price: number,
	isNew?: boolean,
	isBestseller?: boolean,
	isDiscounted?: boolean,
	author: string,
	seller: string,
	initialPrice?: number,
	locale: Locale,
	currency: CurrencyName,
	description: string,
	comments: Comment[],
	category: string[],
	subcategory: string[],
}

export interface ProductsFiltersSpecs {
	subcategories?: string[],
	sellers?: string[],
	priceFrom?: string,
	priceTo?: string,
}

export interface ProductsFetchResponse {
	total: number;
	documents: ProductItem[];
}
