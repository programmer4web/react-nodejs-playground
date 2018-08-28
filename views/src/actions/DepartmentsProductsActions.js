import {
  DEPARTMENTS_PRODUCTS_SEARCH,
  DEPARTMENTS_PRODUCTS_FOCUS,
  DEPARTMENTS_PRODUCTS_BLUR,
  DEPARTMENTS_PRODUCTS_SET,
  DEPARTMENTS_PRODUCTS_SELECTED_CHANGED,
} from './action-types';

export const departmentsProductsSearch = search => ({
  type: DEPARTMENTS_PRODUCTS_SEARCH,
  payload: search
});

export const departmentsProductsFocus = () => ({
  type: DEPARTMENTS_PRODUCTS_FOCUS,
  payload: null
});

export const departmentsProductsBlur = () => ({
type: DEPARTMENTS_PRODUCTS_BLUR,
  payload: null
});

export const departmentsProductsSet = products => ({
  type: DEPARTMENTS_PRODUCTS_SET,
  payload: products
});

export const departmentsProductsSelectedChanged = product => ({
  type: DEPARTMENTS_PRODUCTS_SELECTED_CHANGED,
  payload: product
});
