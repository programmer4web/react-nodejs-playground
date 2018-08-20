import {
  WISHLIST_GET_IDS,
  WISHLIST_ADD_PRODUCT,
  WISHLIST_REMOVE_PRODUCT,
  WISHLIST_SET_IDS,
  WISHLIST_GET_PRODUCTS,
  WISHLIST_SET_PRODUCTS
} from './action-types.js';

export const wishlistGetIds = () => ({
  type: WISHLIST_GET_IDS,
  payload: null
});

export const wishlistAddProduct = productId => ({
  type: WISHLIST_ADD_PRODUCT,
  payload: productId
});

export const wishlistRemoveProduct = productId => ({
  type: WISHLIST_REMOVE_PRODUCT,
  payload: productId
});

export const wishlistUpdate = wishlist => ({
  type: WISHLIST_SET_IDS,
  payload: wishlist
});

export const wishlistGetProducts = wishlist => ({
  type: WISHLIST_GET_PRODUCTS,
  payload: wishlist
});

export const wishlistSetProducts = wishlistProducts => ({
  type: WISHLIST_SET_PRODUCTS,
  payload: wishlistProducts
});
