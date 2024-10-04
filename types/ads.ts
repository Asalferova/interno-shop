import type { FilterDefault } from './filter'
import type { Locale } from './languages'

export interface Banner {
	imageUrl: string,
	url: string,
	locale: Locale,
	$id: string,
	$createdAt: string,
	$updatedAt: string,
	$permissions: string[],
	$databaseId: string,
	$collectionId: string
}

export interface BannersFetchResponse {
	total: number;
	documents: Banner[];
}

export namespace AdsApi {
  export namespace BannersList {
    export type RequestDTO = FilterDefault[]
    export type ResponseDTO = BannersFetchResponse
  }
}
