import {WISHLIST_ADD_PRODUCT, WISHLIST_UPDATE, WISHLIST_GET_PRODUCTS} from '../actions/action-types.js';

import {wishlistAddProductApiCall, wishlistGetProductsApiCall} from '../apiCall/WishListApiCall.js';

const initialState = {
  serverUrl: 'http://127.0.0.1:7070/',
  user: {
    _id: '5b646febeebb915ff8b221be',
    wishlist: [],
    wishlistProducts: []
  }
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case WISHLIST_ADD_PRODUCT:
    // console.log('State:', state);
      const url = `${state.serverUrl}users/${state.user._id}`; // get user data url
      wishlistAddProductApiCall(action.payload, url).then(wishlist => {
        // console.log('wishlist from callback:', wishlist);
        action.asyncDispatch({ type: WISHLIST_UPDATE, payload: wishlist});
      });
      return state;

    case WISHLIST_UPDATE:
      console.log('Fetched response: ',action.payload);
      action.asyncDispatch({type: WISHLIST_GET_PRODUCTS, payload: action.payload});
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {wishlist: action.payload})
      });

    case WISHLIST_GET_PRODUCTS:
      const productsUrl = `${state.serverUrl}products/`;
      wishlistGetProductsApiCall(action.payload, productsUrl).then(wishlistProducts => {
        action.asyncDispatch({type: "WISHLIST_SET_PRODUCTS", payload: wishlistProducts});
      });
      return state;

    case "WISHLIST_SET_PRODUCTS":
      // console.log('WISHLIST_SET_PRODUCTS: ', action.payload);
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {wishlistProducts: action.payload})
      });

    default:
      return state;
  }
};
export default rootReducer;
