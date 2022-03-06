import { combineReducers } from 'redux'
import userReducer from './user/user.reducer'
import productReducer from './product/product.reducer'
import brandReducer from './brand/brand.reducer'
import colorReducer from './color/color.reducer'
import sizeReducer from './size/size.reducer'
import categoryReducer from './category/category.reducer'
import cartReducer from './cart/cart.reducer'
import orderReducer from './order/order.reducer'

const reducer = combineReducers({
	user: userReducer,
	product: productReducer,
	brand: brandReducer,
	color: colorReducer,
	size: sizeReducer,
	category: categoryReducer,
	cart: cartReducer,
	order: orderReducer,
})

export default reducer
