import {
  DEPARTMENTS_SEARCH,
  DEPARTMENTS_FOCUS,
  DEPARTMENTS_BLUR,
  DEPARTMENTS_SET,
  DEPARTMENTS_SELECTED_CHANGED,
} from './action-types';

export const departmentsSearch = search => ({
  type: DEPARTMENTS_SEARCH,
  payload: search
});

export const departmentsFocus = () => ({
  type: DEPARTMENTS_FOCUS,
  payload: null
});

export const departmentsBlur = () => ({
type: DEPARTMENTS_BLUR,
  payload: null
});

export const departmentsSet = products => ({
  type: DEPARTMENTS_SET,
  payload: products
});

export const departmentsSelectedChanged = product => ({
  type: DEPARTMENTS_SELECTED_CHANGED,
  payload: product
});
