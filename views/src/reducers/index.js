import {WISHLIST_ADD_PRODUCT, WISHLIST_GET_PRODUCTS} from '../actions/action-types.js';

import {wishlistAddProductApiCall} from '../apiCall/WishListApiCall.js';

const initialState = {
  serverUrl: 'http://127.0.0.1:7070/',
  user: {
    _id: '5b646febeebb915ff8b221be',
    wishlist: []
  }
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case WISHLIST_ADD_PRODUCT:
      const url = `${state.serverUrl}users/${state.user._id}`; // get user data url
      wishlistAddProductApiCall(action.payload, url).then(wishlist => {
        // console.log('wishlist from callback:', wishlist);
        action.asyncDispatch({ type: "WISHLIST_UPDATE", payload: wishlist});
      });
      return state;
    case "WISHLIST_UPDATE":
      console.log('Fetched response: ',action.payload);
      action.asyncDispatch({type: WISHLIST_GET_PRODUCTS, payload: action.payload});
      return  Object.assign({}, state, {user: {wishlist: action.payload}});

    case WISHLIST_GET_PRODUCTS:
      const productsUrl = `${serverUrl}products/`;
      wishlistGetProductsApiCall(action.payload, productsUrl).then(wishlistProducts => {
        action.asyncDispatch({type: "WISHLIST_SET_PRODUCTS", payload: wishlistProducts});
      });

    case "WISHLIST_SET_PRODUCTS":
      return Object.assign({}, state, {user: {wishlistProducts: action.payload}});
    default:
      return state;
  }
};
export default rootReducer;
