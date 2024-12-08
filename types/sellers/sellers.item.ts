import type { ProductItem } from '../products/products.item'

export interface SellerItem {
	$collectionId: string,
	$createdAt: string,
	$databaseId:string,
	$id:string,
	$permissions:string[],
	$updatedAt:string,
	name:string,
	products: ProductItem[]
}

export interface SellersFetchResponse {
	total: number;
	documents: SellerItem[];
}
