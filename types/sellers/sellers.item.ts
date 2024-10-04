export interface SellerItem {
	$collectionId: string,
	$createdAt: string,
	$databaseId:string,
	$id:string,
	$permissions:string[],
	$updatedAt:string,
	name:string,
}

export interface SellersFetchResponse {
	total: number;
	documents: SellerItem[];
}
