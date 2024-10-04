import api from '~/api'
import { Sorting } from '~/helpers/constants'
import type { FilterDefault } from '~/types/filter'
import type { Pagination } from '~/types/pagination'
import type { ProductItem, ProductsFiltersSpecs } from '~/types/products/products.item'
import type { SortDefault } from '~/types/sort'
import { isArrayNotEmptyStrings, isNotEmptyString } from '~/utils/type-guards'

export const useProductsStore = defineStore('products', () => {
	const filtersSpecs = ref<ProductsFiltersSpecs>({
	})

	const currentSortKey = ref(Sorting.NEW)

	const pagination = ref<Pagination>({
		method: 'limit',
		values: [25]
	})

	const { subcategories, sellers, priceFrom, priceTo } = useRoute().query
	if (isArrayNotEmptyStrings(subcategories) || isNotEmptyString(subcategories)) {
		filtersSpecs.value.subcategories = [subcategories].flat()
	}
	if (isArrayNotEmptyStrings(sellers) || isNotEmptyString(sellers)) {
		filtersSpecs.value.sellers = [sellers].flat()
	}
	if (isNotEmptyString(priceFrom)) {
		filtersSpecs.value.priceFrom = priceFrom
	}
	if (isNotEmptyString(priceTo)) {
		filtersSpecs.value.priceTo = priceTo
	}

	const setFilters = (appliedFilters: ProductsFiltersSpecs) => {
		filtersSpecs.value = appliedFilters
		updateQuery(filtersSpecs.value)
	}

	const recalculatedFilter = computed(() => {
		const result: FilterDefault[] = []
		if (filtersSpecs.value.subcategories?.length) {
			result.push({
				method: 'equal',
				attribute: 'subcategory',
				values: filtersSpecs.value.subcategories
			})
		}
		if (filtersSpecs.value.sellers?.length) {
			result.push({
				method: 'equal',
				attribute: 'seller',
				values: filtersSpecs.value.sellers
			})
		}
		if (filtersSpecs.value.priceFrom && !filtersSpecs.value.priceTo) {
			result.push({
				method: 'greaterThan',
				attribute: 'price',
				values: [+filtersSpecs.value.priceFrom]
			})
		}
		if (!filtersSpecs.value.priceFrom && filtersSpecs.value.priceTo) {
			result.push({
				method: 'lessThan',
				attribute: 'price',
				values: [+filtersSpecs.value.priceTo]
			})
		}
		if (filtersSpecs.value.priceFrom && filtersSpecs.value.priceTo) {
			result.push({
				method: 'between',
				attribute: 'price',
				values: [+filtersSpecs.value.priceFrom, +filtersSpecs.value.priceTo]
			})
		}
		return result
	})

	const recalculatedSorting = computed(() => {
		const result: SortDefault[] = []
		if (currentSortKey.value === Sorting.NEW) {
			result.push({
				method: 'orderDesc',
				attribute: '$createdAt'
			})
		}
		if (currentSortKey.value === Sorting.ASC) {
			result.push({
				method: 'orderAsc',
				attribute: 'price'
			})
		}
		if (currentSortKey.value === Sorting.DESC) {
			result.push({
				method: 'orderDesc',
				attribute: 'price'
			})
		}
		return result
	})

	const {
		data: products,
		status: productsStatus,
		refresh: refreshProducts
	} = useLazyAsyncData<ProductItem[]>('products:list', async () => {
		try {
			const res = await api.products.getProducts(...recalculatedFilter?.value, ...recalculatedSorting?.value, pagination.value)
			return res.documents
		} catch (e) {
			console.log(e)
			return []
		}
	}, {
		watch: [filtersSpecs, pagination, currentSortKey],
		default () {
			return [] as ProductItem[]
		}
	})

	return {
		filtersSpecs,
		products,
		productsStatus,
		refreshProducts,
		setFilters,
		currentSortKey
	}
})
