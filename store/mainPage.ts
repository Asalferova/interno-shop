import api from '~/api'
import type { ProductItem } from '~/types/products/products.item'
import { useLocaleStore } from '~/store/locale'
import type { FilterDefault, Pagination } from '~/types/filter'

export const useMainPageStore = defineStore('main-page-store', () => {
	const localeStore = useLocaleStore()
	const {
		currentLocaleFilter
	} = storeToRefs(localeStore)

	const currentSortKey = ref('isNew')

	const sortBooksPaginationModel = ref<Pagination>({
		method: 'limit',
		values: [25]
	})

	const totalItems = ref(0)

	const { data: sortBooks, status: statusSortBooks } = useLazyAsyncData('main-page-sorted-books', async () => {
		const filters = <FilterDefault>{
			method: 'equal',
			attribute: currentSortKey.value,
			values: [true]
		}
		try {
			const res = await api.products.getProducts(filters, sortBooksPaginationModel.value, currentLocaleFilter.value)
			return res.documents
		} catch (e) {
			console.warn(e)
			return []
		}
	}, {
		watch: [currentSortKey, sortBooksPaginationModel, currentLocaleFilter],
		default () {
			return [] as ProductItem[]
		}
	})

	const allBooksPaginationModel = ref<Pagination>({
		method: 'limit',
		values: [12]
	})

	const { data: allBooks, status: statusAllBooks } = useLazyAsyncData('main-page-all-books', async () => {
		try {
			const res = await api.products.getProducts(allBooksPaginationModel.value, currentLocaleFilter.value)
			totalItems.value = res.total
			return res.documents
		} catch (e) {
			console.warn(e)
			return []
		}
	}, {
		watch: [allBooksPaginationModel, currentLocaleFilter],
		default () {
			return [] as ProductItem[]
		}
	})

	const loadMore = async () => {
		if (allBooks.value.length < totalItems.value) {
			const remaining = totalItems.value - allBooks.value.length
			const limit = Math.min(remaining, 12)
			try {
				const res = await api.products.getProducts(...[{
					method: 'limit',
					values: [limit]
				},
				{
					method: 'offset',
					values: [allBooks.value.length]
				}], currentLocaleFilter.value)
				allBooks.value = [...allBooks.value, ...res.documents]
			} catch (e) {
				console.log(e)
				throw e
			}
		}
	}

	return {
		allBooks,
		allBooksPaginationModel,
		sortBooks,
		currentSortKey,
		statusSortBooks,
		statusAllBooks,
		loadMore,
		totalItems
	}
})
