import {
  FEATUREDPRODUCTS_GET_SOURCE,
  FEATUREDPRODUCTS_SET_SOURCE,
  FEATUREDPRODUCTS_SET_VISIBLE,
  FEATUREDPRODUCTS_HANDLE_MODE,
  FEATUREDPRODUCTS_APPLY_FILTER,
  FEATUREDPRODUCTS_SET_FILTERS
} from './action-types.js';

export const featuredProductsGetSource = () => ({
  type: FEATUREDPRODUCTS_GET_SOURCE,
  payload: null
});

export const featuredProductsSetSource = () => ({
  type: FEATUREDPRODUCTS_SET_SOURCE,
  payload: null
});

export const featuredProductsSetVisible = products => ({
  type: FEATUREDPRODUCTS_SET_VISIBLE,
  payload: products
});

export const featuredProductsHandleMode = mode => ({
  type: FEATUREDPRODUCTS_HANDLE_MODE,
  payload: mode
});

export const featuredProductsApplyFilter = (task, value, filters, source) => ({
  type: FEATUREDPRODUCTS_APPLY_FILTER,
  payload: {task, value, filters, source}
});

export const featuredProductsSetFilters = (task, value) => ({
  type: FEATUREDPRODUCTS_SET_FILTERS,
  payload: {task, value}
});
