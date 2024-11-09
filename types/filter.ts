export interface FilterDefault {
	method: string,
	attribute?: string,
	values?: boolean[] | string[] | number[]
}

export interface Pagination {
	method: 'limit',
	values: number[]
}

export interface SortDefault {
	method: string,
	attribute: string
}
