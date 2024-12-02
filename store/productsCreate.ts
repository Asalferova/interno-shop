import { cloneDeep } from 'lodash-es'
import { defineStore } from 'pinia'
import api from '~/api'
import type { ProductItem } from '~/types/products/products.item'
import type { CreateProductAccomplishedModel, CreateProductDto } from '~/types/productsCreate'

export const useProductsCreateStore = (id = 'default') => defineStore(`products-create-${id}`, () => {
	const router = useRouter()
	const route = useRoute()
	const newProductId = ref('')

	const accomplishedSegmentsModel = ref<CreateProductAccomplishedModel>({
		name: false,
		price: false,
		additionalSpecs: false,
		descriptionAndPhotos: false,
	})

	const editableProduct = ref<null | ProductItem>(null)

	const formIsComplete = ref(false)

	const productsCreatePayload = ref<CreateProductDto>({} as CreateProductDto)

	const setProductsCreatePayload = () => {
		if (editableProduct.value) {
			productsCreatePayload.value = {
				name: editableProduct.value.name,
				images: [editableProduct.value.images[0].$id],
				price: editableProduct.value.price,
				isNew: editableProduct.value.isNew,
				isBestseller: editableProduct.value.isBestseller,
				isDiscounted: editableProduct.value.isDiscounted,
				author: editableProduct.value.author,
				seller: editableProduct.value.seller,
				initialPrice: editableProduct.value.initialPrice,
				locale: editableProduct.value.locale,
				currency: editableProduct.value.currency,
				description: editableProduct.value.description,
				category: editableProduct.value.category,
				subcategory: editableProduct.value.subcategory
			}
		}
	}

	const uploadProduct = async (id: string) => {
		const res = await api.products.getProductById(id)
		editableProduct.value = res
		setProductsCreatePayload()
		formIsComplete.value = true
	}

	if (id) {
		uploadProduct(id)
	}

	const specsStep = computed(() => {
		return accomplishedSegmentsModel.value.name === true
	})

	watch(() => accomplishedSegmentsModel.value, () => {
		formIsComplete.value = Object.values(accomplishedSegmentsModel.value)
			.every(value => value === true)
	}, { deep: true })

	const setPropsToPayload = (props: Partial<CreateProductDto>) => {
		productsCreatePayload.value = {
			...productsCreatePayload.value,
			...cloneDeep(props)
		}
	}

	const createNewProduct = async () => {
		const payload = removeEmptyProperties({
			...productsCreatePayload.value,
		})
		if (id) {
			try {
				const result = await api.products.editProduct(id, payload)
				await uploadProduct(id)
				router.push({
					name: 'products-id',
					params: {
						id: result.$id
					}
				})
			} catch (err) {
				console.log(err)
			}
		} else {
			try {
				const result = await api.products.createNewProduct(newProductId.value, payload)
				router.push({
					name: 'products-id',
					params: {
						id: result.$id
					}
				})
			} catch (err) {
				console.log(err)
			}
		}
	}

	return {
		productsCreatePayload,
		setPropsToPayload,
		createNewProduct,
		accomplishedSegmentsModel,
		formIsComplete,
		editableProduct,
		specsStep,
		newProductId
	}
})()
