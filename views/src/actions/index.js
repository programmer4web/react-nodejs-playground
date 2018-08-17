import {WISHLIST_ADD_PRODUCT, WISHLIST_UPDATE, WISHLIST_GET_PRODUCTS} from './action-types.js';

export const wishlistAddProduct = productId => ({
  type: WISHLIST_ADD_PRODUCT,
  payload: productId
})

export const wishlistGetProducts = wishlist => ({
  type: WISHLIST_GET_PRODUCTS,
  payload: wishlist
})
