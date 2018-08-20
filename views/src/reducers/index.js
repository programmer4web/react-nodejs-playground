import {
  WISHLIST_GET_IDS,
  WISHLIST_ADD_PRODUCT,
  WISHLIST_SET_IDS,
  WISHLIST_GET_PRODUCTS} from '../actions/action-types.js';

import {
  wishlistGetIdsApiCall,
  wishlistAddProductApiCall,
  wishlistGetProductsApiCall
} from '../apiCall/WishListApiCall.js';

const initialState = {
  serverUrl: 'http://127.0.0.1:7070/',
  user: {
    _id: '5b646febeebb915ff8b221be',
    wishlist: [],
    wishlistProducts: []
  }
};

const rootReducer = (state = initialState, action) => {
  const userUrl = `${state.serverUrl}users/${state.user._id}`, // get user data url
    productsUrl = `${state.serverUrl}products/`; // get products data url

  switch (action.type) {
    case WISHLIST_GET_IDS:
      wishlistGetIdsApiCall(userUrl).then(wishlist => {
        action.asyncDispatch({type: WISHLIST_SET_IDS, payload: wishlist});
      }).catch(err => console.log(err));
      return state;

    case WISHLIST_ADD_PRODUCT:
      wishlistAddProductApiCall(action.payload, userUrl).then(wishlist => {
        action.asyncDispatch({ type: WISHLIST_SET_IDS, payload: wishlist});
      }).catch((err)=> console.warn(err));;
      return state;

    case WISHLIST_SET_IDS:
      action.asyncDispatch({type: WISHLIST_GET_PRODUCTS, payload: action.payload});
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {wishlist: action.payload})
      });

    case WISHLIST_GET_PRODUCTS:
      wishlistGetProductsApiCall(action.payload, productsUrl).then(wishlistProducts => {
        action.asyncDispatch({type: "WISHLIST_SET_PRODUCTS", payload: wishlistProducts});
      }).catch((err)=> console.warn(err));
      return state;

    case "WISHLIST_SET_PRODUCTS":
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {wishlistProducts: action.payload})
      });

    default:
      return state;
  }
};
export default rootReducer;
