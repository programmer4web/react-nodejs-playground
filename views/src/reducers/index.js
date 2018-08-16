import {WISHLIST_ADD_PRODUCT} from '../actions/action-types.js';

import {wishlistAddProductAction} from '../actions/WishListActions.js';

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
      const wishlist = wishlistAddProductAction(action.payload, url); // productId, url
      return {...state, user: {...state.user, wishlist}};

    default:
      return state;
  }
};
export default rootReducer;
