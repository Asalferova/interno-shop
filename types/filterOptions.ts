export interface FiltersSubCategoryOption {
  label: string;
}
export interface FiltersCategoryOption {
	label: string,
	subcategories: FiltersSubCategoryOption[]
}
