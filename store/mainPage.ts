import api from '~/api'
import type { ProductItem } from '~/types/products/products.item'
import { useLocaleStore } from '~/store/locale.js'
import type { Pagination } from '~/types/pagination'
import type { FilterDefault } from '~/types/filter'

export const useMainPageStore = defineStore('main-page-store', () => {
	const localeStore = useLocaleStore()
	const {
		currentLocale
	} = storeToRefs(localeStore)

	const currentSortKey = ref('isNew')

	const sortBooksPaginationModel = ref<Pagination>({
		method: 'limit',
		values: [25]
	})

	const { data: sortBooks } = useLazyAsyncData('main-page-sorted-books', async () => {
		const filters = <FilterDefault>{
			method: 'equal',
			attribute: currentSortKey.value,
			values: [true]
		}
		try {
			const res = await api.products.getProducts(filters, sortBooksPaginationModel.value, currentLocale.value)
			return res.documents
		} catch (e) {
			console.log(e)
			return []
		}
	}, {
		watch: [currentSortKey, sortBooksPaginationModel, currentLocale],
		default () {
			return [] as ProductItem[]
		}
	})

	const allBooksPaginationModel = ref<Pagination>({
		method: 'limit',
		values: [12]
	})

	const { data: allBooks } = useLazyAsyncData('main-page-all-books', async () => {
		try {
			const res = await api.products.getProducts(allBooksPaginationModel.value, currentLocale.value)
			return res.documents
		} catch (e) {
			console.log(e)
			return []
		}
	}, {
		watch: [allBooksPaginationModel, currentLocale],
		default () {
			return [] as ProductItem[]
		}
	})

	return {
		allBooks,
		allBooksPaginationModel,
		sortBooks,
		currentSortKey
	}
})
