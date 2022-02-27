import { combineReducers } from 'redux'
import userReducer from './user/user.reducer'
import productReducer from './product/product.reducer'
import brandReducer from './brand/brand.reducer'
import colorReducer from './color/color.reducer'
import sizeReducer from './size/size.reducer'
import categoryReducer from './category/category.reducer'

const reducer = combineReducers({
	user: userReducer,
	product: productReducer,
	brand: brandReducer,
	color: colorReducer,
	size: sizeReducer,
	category: categoryReducer,
})

export default reducer
