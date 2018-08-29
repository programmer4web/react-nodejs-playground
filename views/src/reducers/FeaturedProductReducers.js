import {
  FEATUREDPRODUCTS_GET_SOURCE,
  FEATUREDPRODUCTS_SET_SOURCE,
  FEATUREDPRODUCTS_SET_VISIBLE,
  FEATUREDPRODUCTS_HANDLE_MODE,
  FEATUREDPRODUCTS_APPLY_FILTER,
  FEATUREDPRODUCTS_SET_FILTERS
} from '../actions/action-types.js';

import {
  featuredProductsGetSourceApiCall
} from '../apiCall/FeaturedProductsApiCall.js';

import { featuredProductsApplyFilters } from './FeaturedProductsFilters.js';

const featuredProductsReducers = (state, action) => {
  const productsUrl = `${state.serverUrl}products/`,
    payload = action.payload;

  switch (action.type) {
    case FEATUREDPRODUCTS_GET_SOURCE:
      featuredProductsGetSourceApiCall(productsUrl).then(products => {
        action.asyncDispatch({ type: FEATUREDPRODUCTS_SET_SOURCE, payload: products });
      });
      return state;

    case FEATUREDPRODUCTS_SET_SOURCE:
      action.asyncDispatch({ type: FEATUREDPRODUCTS_SET_VISIBLE, payload: payload });
      return Object.assign({}, state, {
        featuredProducts: Object.assign({}, state.featuredProducts, { source: payload })
      });

    case FEATUREDPRODUCTS_SET_VISIBLE:
      return Object.assign({}, state, {
        featuredProducts: Object.assign({}, state.featuredProducts, { visible: payload })
      });

    case FEATUREDPRODUCTS_HANDLE_MODE:
      return Object.assign({}, state, {
        featuredProducts: Object.assign({}, state.featuredProducts, { mode: payload })
      });

    case FEATUREDPRODUCTS_APPLY_FILTER:
      action.asyncDispatch({ type: FEATUREDPRODUCTS_SET_FILTERS, payload: payload });
      featuredProductsApplyFilters(payload).then(visible => {
        action.asyncDispatch({ type: FEATUREDPRODUCTS_SET_VISIBLE, payload: visible });
      });
      return state;

    case FEATUREDPRODUCTS_SET_FILTERS:
      return Object.assign({}, state, {
        featuredProducts: Object.assign({}, state.featuredProducts, {
          filters: Object.assign({}, state.featuredProducts.filters, { [payload.task]: payload.value })
        })
      });

    default:
      console.log('action: ',action.type);
      return state;
  }
}
export default featuredProductsReducers;