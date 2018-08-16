import {WISHLIST_ADD_PRODUCT} from './action-types.js';

export const wishlistAddProduct = productId => ({
  type: WISHLIST_ADD_PRODUCT,
  payload: productId
})
