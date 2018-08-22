import {
  WISHLIST_GET_IDS,
  WISHLIST_ADD_PRODUCT,
  WISHLIST_REMOVE_PRODUCT,
  WISHLIST_SET_IDS,
  WISHLIST_GET_PRODUCTS,
  WISHLIST_SET_PRODUCTS,

  FEATUREDPRODUCTS_GET_SOURCE,
  FEATUREDPRODUCTS_SET_SOURCE,
  FEATUREDPRODUCTS_SET_VISIBLE,
  FEATUREDPRODUCTS_HANDLE_MODE
  } from '../actions/action-types.js';

import {
  wishlistGetIdsApiCall,
  wishlistAddProductApiCall,
  wishlistRemoveProductApiCall,
  wishlistGetProductsApiCall
} from '../apiCall/WishListApiCall.js';

import {
  featuredProductsGetSourceApiCall
} from '../apiCall/FeaturedProductsApiCall.js';

const initialState = {
  serverUrl: 'http://127.0.0.1:7070/',
  user: {
    _id: '5b646febeebb915ff8b221be',
    wishlist: [],
    wishlistProducts: []
  },
  featuredProducts: {
    source: [],
    visible: [],
    mode: ''
  }
};

const rootReducer = (state = initialState, action) => {
  const userUrl = `${state.serverUrl}users/${state.user._id}`, // get user data url
    productsUrl = `${state.serverUrl}products/`; // get products data url

  switch (action.type) {
    case WISHLIST_GET_IDS:
      wishlistGetIdsApiCall(userUrl).then(wishlist => {
        action.asyncDispatch({type: WISHLIST_SET_IDS, payload: wishlist});
      }).catch(err => console.warn(err));
      return state;

    case WISHLIST_ADD_PRODUCT:
      wishlistAddProductApiCall(action.payload, userUrl).then(wishlist => {
        action.asyncDispatch({type: WISHLIST_SET_IDS, payload: wishlist});
      }).catch(err => console.warn(err));
      return state;

    case WISHLIST_REMOVE_PRODUCT:
      wishlistRemoveProductApiCall(action.payload, userUrl).then(wishlist => {
        action.asyncDispatch({type: WISHLIST_SET_IDS, payload: wishlist});
      }).catch(err => console.warn(err));
      return state;

    case WISHLIST_SET_IDS:
      action.asyncDispatch({type: WISHLIST_GET_PRODUCTS, payload: action.payload});
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {wishlist: action.payload})
      });

    case WISHLIST_GET_PRODUCTS:
      wishlistGetProductsApiCall(action.payload, productsUrl).then(wishlistProducts => {
        action.asyncDispatch({type: WISHLIST_SET_PRODUCTS, payload: wishlistProducts});
      }).catch(err => console.warn(err));
      return state;

    case WISHLIST_SET_PRODUCTS:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {wishlistProducts: action.payload})
      });

    case FEATUREDPRODUCTS_GET_SOURCE:
      featuredProductsGetSourceApiCall(productsUrl).then(products => {
        action.asyncDispatch({type: FEATUREDPRODUCTS_SET_SOURCE, payload: products});
      });
      return state;

    case FEATUREDPRODUCTS_SET_SOURCE:
      action.asyncDispatch({type: FEATUREDPRODUCTS_SET_VISIBLE, payload: action.payload});
      return Object.assign({}, state, {
        featuredProducts: Object.assign({}, state.featuredProducts, {source: action.payload})
      });

    case FEATUREDPRODUCTS_SET_VISIBLE:
      return Object.assign({}, state, {
        featuredProducts: Object.assign({}, state.featuredProducts, {visible: action.payload})
      });

    case FEATUREDPRODUCTS_HANDLE_MODE:
      return Object.assign({}, state, {
        featuredProducts: Object.assign({}, state.featuredProducts, {mode: action.payload})
      });
    default:
      return state;
  }
};
export default rootReducer;
