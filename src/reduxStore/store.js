import { configureStore} from "@reduxjs/toolkit"
import authAction from "./reducer/authReducer"
import categorySlice from './reducer/CategorySlice'
import productSlice from './reducer/ProductSlice'


export const store = configureStore({
    reducer:{
        user: authAction,  
        category: categorySlice,
        product: productSlice
    },
})

export default store