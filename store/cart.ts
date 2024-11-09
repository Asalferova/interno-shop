import { skipHydrate } from 'pinia'
import api from '~/api'
import type { FilterDefault } from '~/types/filter'
import type { ProductItem } from '~/types/products/products.item'
import { promotionalCodes, type PromoCode } from '~/helpers/promotionalCodes'

type CartProducts = Record<string, number>;

export const useCartStore = defineStore('cart', () => {
	const cartProducts = useLocalStorage<CartProducts>('cart-products', {})
	const selectedProducts = useLocalStorage<string[]>('selected-products', [])
	const promoCode = useLocalStorage<string>('promo-code', '')
	const cartProductsData = ref<ProductItem[]>([])
	const statusCartProducts = ref<'pending' | 'success' | 'error' | null>(null)

	const getMyCartProducts = async (page: 'cart' | 'order'): Promise<void> => {
		const filters: FilterDefault =
		{
			method: 'equal',
			attribute: '$id',
			values: page === 'cart' ? Object.keys(cartProducts.value) : selectedProducts.value
		}
		statusCartProducts.value = 'pending'
		try {
			const res = await api.products.getProducts(filters)
			cartProductsData.value = res.documents
			statusCartProducts.value = 'success'
		} catch (e) {
			statusCartProducts.value = 'error'
			cartProductsData.value = []
			console.warn(e)
		}
	}

	function increaseProductInCart (productId: string, quantity: number = 1): void {
		if (cartProducts.value[productId]) {
			cartProducts.value[productId] = quantity
		} else {
			cartProducts.value[productId] = 1
		}
	}

	function addProductToCart (productId: string): void {
		if (cartProducts.value[productId]) {
			delete cartProducts.value[productId]
		} else {
			cartProducts.value[productId] = 1
			selectedProducts.value.push(productId)
		}
	}

	function deleteCartProduct (productId: string): void {
		if (cartProducts.value[productId]) {
			delete cartProducts.value[productId]
		}
		const productIndex = selectedProducts.value.indexOf(productId)
		if (productIndex !== -1) {
			selectedProducts.value.splice(productIndex, 1)
		}
		getMyCartProducts('cart')
	}

	const totalPrice: ComputedRef<number> = computed(() => {
		return cartProductsData.value.reduce((total, product) => {
			if (selectedProducts.value.includes(product.$id)) {
				const quantity = Number(cartProducts.value[product.$id]) || 0
				return total + product.price * quantity
			}
			return total
		}, 0)
	})

	const totalQuantity: ComputedRef<number> = computed(() => {
		return cartProductsData.value.reduce((quantity, product) => {
			if (selectedProducts.value.includes(product.$id)) {
				const productId = product.$id
				return quantity + (Number(cartProducts.value[productId]) || 0)
			}
			return quantity
		}, 0)
	})

	const getPromoCodeDetails = (code: string): PromoCode | undefined => {
		return promotionalCodes.find(promo => promo.code === code)
	}

	const ifPromoCode: ComputedRef<boolean> = computed(() => {
		return !!getPromoCodeDetails(promoCode.value)
	})

	function applyPromoCode (code: string): void {
		const promoDetails = getPromoCodeDetails(code)
		if (!ifPromoCode.value && promoDetails) {
			promoCode.value = promoDetails.code
		}
	}

	function deletePromoCode (): void {
		promoCode.value = ''
	}

	const totalPriceWithDiscount: ComputedRef<number> = computed(() => {
		const promoDetails = getPromoCodeDetails(promoCode.value)
		const discount = promoDetails?.discount ?? 0
		return ifPromoCode.value ? totalPrice.value * (1 - discount) : totalPrice.value
	})

	const setSelectedProducts = (value: string[]) => {
		selectedProducts.value = value
	}

	return {
		cartProducts: skipHydrate(cartProducts),
		increaseProductInCart,
		cartProductsData,
		getMyCartProducts,
		addProductToCart,
		deleteCartProduct,
		totalPrice,
		totalQuantity,
		selectedProducts: skipHydrate(selectedProducts),
		promoCode: skipHydrate(promoCode),
		applyPromoCode,
		totalPriceWithDiscount,
		ifPromoCode,
		deletePromoCode,
		setSelectedProducts,
		statusCartProducts
	}
})
