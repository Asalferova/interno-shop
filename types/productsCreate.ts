import type { CurrencyName } from "./currency";
import type { Locale } from "./languages";

export interface CreateProductDto {
	images: string[]
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
	category: string[],
	subcategory: string[]
}

export interface CreateProductSelectItems {
	label: string;
	value: string;
}

export interface CreateProductAccomplishedModel {
	name: boolean,
	price: boolean,
	descriptionAndPhotos: boolean,
  additionalSpecs: boolean
 }
