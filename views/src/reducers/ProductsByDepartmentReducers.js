import {
  PRODUCTSBYDEPARTMENT_GET_DEPARTMENTS,
  PRODUCTSBYDEPARTMENT_SET_DEPARTMENTS,
  // PRODUCTSBYDEPARTMENT_REMOVE
} from '../actions/action-types.js'

import {productsByDepartmentGetDepartmentsApiCall} from '../apiCall/ProductsByDepartmentApiCall.js';
// import { productsByDepartmentRemove } from '../actions/ProductsByDepartmentActions.js';
const productsByDepartmentReducers = (state, action) => {
  const departmentsUrl = `${state.serverUrl}departments/`;

  switch (action.type) {
    case PRODUCTSBYDEPARTMENT_GET_DEPARTMENTS:
      productsByDepartmentGetDepartmentsApiCall(departmentsUrl).then(
        result => action.asyncDispatch({
          type: PRODUCTSBYDEPARTMENT_SET_DEPARTMENTS,
          payload: result
        })
      )
    return state;

    case PRODUCTSBYDEPARTMENT_SET_DEPARTMENTS:
      return Object.assign({}, state, {
        productsByDepartment: Object.assign({}, state.productsByDepartment, {
          items: action.payload
        })
      });

    default:
      return state;
  }
}
export default productsByDepartmentReducers;