import {
  DEPARTMENTS_PRODUCTS_SEARCH,
  DEPARTMENTS_PRODUCTS_SET,
  DEPARTMENTS_PRODUCTS_SELECTED_CHANGED,
} from './action-types';

export const departmentsProductsSearch = search => ({
  type: DEPARTMENTS_PRODUCTS_SEARCH,
  payload: search
});

export const departmentsProductsSet = products => ({
  type: DEPARTMENTS_PRODUCTS_SET,
  payload: products
});

export const departmentsProductsSelectedChanged = id => ({
  type: DEPARTMENTS_PRODUCTS_SELECTED_CHANGED,
  payload: id
});
