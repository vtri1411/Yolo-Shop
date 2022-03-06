import productTypes from './product.types'

const initialState = {
	products: [], // [{}]
	productDetail: null, // {}

	isLoadingProductModal: false,
	isShowProductModal: false,
	productModal: null, // {}
}

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case productTypes.SET_PRODUCTS:
			return {
				...state,
				products: action.payload,
			}
		case productTypes.APPEND_PRODUCTS:
			return {
				...state,
				products: [...state.products, ...action.payload],
			}
		case productTypes.SET_PRODUCT:
			return {
				...state,
				productDetail: action.payload,
			}
		case productTypes.SET_SHOW_PRODUCT_MODAL:
			return {
				...state,
				isShowProductModal: action.payload,
				isLoadingProductModal: true,
			}
		case productTypes.SET_IS_LOADING_PRODUCT_MODAL:
			return {
				...state,
				isLoadingProductModal: action.payload,
			}
		case productTypes.SET_PRODUCT_MODEL:
			return {
				...state,
				productModal: action.payload,
				isLoadingProductModal: false,
			}
		default:
			return state
	}
}

export default productReducer
