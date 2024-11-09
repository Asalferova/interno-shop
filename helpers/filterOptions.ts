export interface FiltersSubCategoryOption {
  label: string;
}
export interface FiltersCategoryOption {
	label: string,
	subcategories: FiltersSubCategoryOption[]
}

export const categoryOptions: FiltersCategoryOption[] = [
	{
		label: 'fiction',
		subcategories: [
			{
				label: 'novels'
			},
			{
				label: 'detectives'
			},
			{
				label: 'science fiction'
			},
			{
				label: 'poetry'
			}
		]
	},
	{
		label: 'non-fiction',
		subcategories: [
			{
				label: 'history'
			},
			{
				label: 'biology'
			},
			{
				label: 'physics'
			},
			{
				label: 'psychology'
			}
		]
	},
	{
		label: 'childrens literature',
		subcategories: [
			{
				label: 'fairy tales'
			},
			{
				label: 'educational books'
			},
			{
				label: 'adventures'
			},
			{
				label: 'comics'
			}
		]
	},
	{
		label: 'self-development and business',
		subcategories: [
			{
				label: 'personal growth'
			},
			{
				label: 'time management'
			},
			{
				label: 'finance and investments'
			},
			{
				label: 'leadership'
			}
		]
	}
]
