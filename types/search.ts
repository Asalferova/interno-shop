import type { FilterDefault } from './filter'
import type { Locale } from './languages'

export interface Search {
	name: string,
	author: string
}

export interface SearchFetchResponse {
	total: number;
	documents: Search[];
}

export namespace SearchApi {
  export namespace SuggestionsList {
    export type RequestDTO = FilterDefault[]
    export type ResponseDTO = SearchFetchResponse
  }
}
