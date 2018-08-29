import {
  PRODUCTSBYDEPARTMENT_GET_DEPARTMENTS,
  PRODUCTSBYDEPARTMENT_REMOVE
} from './action-types.js'

export const productsByDepartmentGetDepartments = () => ({
  type: PRODUCTSBYDEPARTMENT_GET_DEPARTMENTS,
  payload: null
})

export const productsByDepartmentRemove = productId => ({
  type: PRODUCTSBYDEPARTMENT_REMOVE,
  payload: productId
})