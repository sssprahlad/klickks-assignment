// export const URL = "http://localhost:5000"

export const URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";


export const REGISTER = '/api/auth/register'

export const LOGIN = '/api/auth/login'

export const ADD_CATEGORY = '/api/admin/category'

export const GET_CATEGORY = '/api/admin/category'

export const ADD_PRODUCT = '/api/admin/products'

export const GET_PRODUCTS = '/api/admin/products'

export const ADD_TO_CART = '/api/cartItem'

export const GET_CART = '/api/cartItem/cart'

export const UPDATE_CART_ITEM = '/api/cartItem'

export const REMOVE_CART_ITEM = '/api/cartItem'

