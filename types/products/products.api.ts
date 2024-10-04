import type { FilterDefault } from '../filter'
import type { ProductsFetchResponse } from './products.item'

export namespace ProductsApi {
  export namespace ProductsList {
    export type RequestDTO = FilterDefault[]
    export type ResponseDTO = ProductsFetchResponse
  }
}
