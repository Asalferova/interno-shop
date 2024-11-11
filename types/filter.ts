export interface Filter {
	method: string,
	attribute?: string,
	values?: boolean[] | string[] | number[]
}


export interface FilterDefault {
	method: string,
	attribute?: string,
	values?: boolean[] | string[] | number[] | Filter[]
}

export interface Pagination {
	method: 'limit',
	values: number[]
}

export interface SortDefault {
	method: string,
	attribute: string
}
