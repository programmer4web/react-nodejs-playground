import {
  WISHLIST_GET_IDS,
  WISHLIST_ADD_PRODUCT,
  WISHLIST_REMOVE_PRODUCT,
  WISHLIST_SET_IDS,
  WISHLIST_GET_PRODUCTS,
  WISHLIST_SET_PRODUCTS,
  WISHLIST_ERROR
} from '../actions/action-types.js';

import {
  wishlistGetIdsApiCall,
  wishlistAddProductApiCall,
  wishlistRemoveProductApiCall,
  wishlistGetProductsApiCall
} from '../apiCall/WishListApiCall.js';

const wishlistReducers = (state, action) => {
  const productsUrl = `${state.serverUrl}products/`,
    userUrl = `${state.serverUrl}users/${state.user._id}`,
    payload = action.payload;

  switch (action.type) {
    case WISHLIST_GET_IDS:
      wishlistGetIdsApiCall(userUrl).then(wishlist => {
        action.asyncDispatch({ type: WISHLIST_SET_IDS, payload: wishlist });
      }).catch(err => console.warn(err));
      return state;

    case WISHLIST_ADD_PRODUCT:
      wishlistAddProductApiCall(payload, userUrl).then(wishlist => {
        action.asyncDispatch({ type: WISHLIST_SET_IDS, payload: wishlist });
      }).catch(err => action.asyncDispatch({ type: WISHLIST_ERROR, payload: err })
      );
      return state;

    case WISHLIST_REMOVE_PRODUCT:
      wishlistRemoveProductApiCall(payload, userUrl).then(wishlist => {
        action.asyncDispatch({ type: WISHLIST_SET_IDS, payload: wishlist });
      }).catch(err => console.warn(err));
      return state;

    case WISHLIST_SET_IDS:
      action.asyncDispatch({ type: WISHLIST_GET_PRODUCTS, payload: payload });
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, { wishlist: payload })
      });

    case WISHLIST_GET_PRODUCTS:
      wishlistGetProductsApiCall(payload, productsUrl).then(wishlistProducts => {
        action.asyncDispatch({ type: WISHLIST_SET_PRODUCTS, payload: wishlistProducts });
      }).catch(err => console.warn(err));
      return state;

    case WISHLIST_SET_PRODUCTS:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, { wishlistProducts: payload })
      });

    case WISHLIST_ERROR:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, { wishlistError: payload }),
        modal: { status: true }
      });

    default:
      return state;
    }
  }
export default wishlistReducers;