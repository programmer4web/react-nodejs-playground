import {
  DEPARTMENTS_PRODUCTS_SEARCH,
  DEPARTMENTS_PRODUCTS_FOCUS,
  DEPARTMENTS_PRODUCTS_BLUR,
  DEPARTMENTS_PRODUCTS_SET,
  DEPARTMENTS_PRODUCTS_SELECTED_CHANGED,

  DEPARTMENTS_SEARCH,
  DEPARTMENTS_FOCUS,
  DEPARTMENTS_BLUR,
  DEPARTMENTS_SET,
  DEPARTMENTS_SELECTED_CHANGED,
  DEPARTMENTS_PRODUCT_ADD
} from '../actions/action-types.js';

import { autocompleteSearchApiCall } from '../apiCall/AutocompleteApiCall.js';
import { departmentsProductAddApiCall } from '../apiCall/DepartmentsProductsApiCall.js';

const departmentsReducers = (state, action) => {
  const productsUrl = `${state.serverUrl}products/`,
    departmentsUrl = `${state.serverUrl}departments/`,
    payload = action.payload;
  
  switch (action.type) {
    case DEPARTMENTS_PRODUCTS_SEARCH:
      autocompleteSearchApiCall(productsUrl, payload).then(products => {
        action.asyncDispatch({ type: DEPARTMENTS_PRODUCTS_SET, payload: products });
      });
      return Object.assign({}, state, {
        departments: Object.assign({}, state.departments, {
          products: Object.assign({}, state.departments.products, {
            search: payload,
            suggestionsVisible: true
          })
        })
      });

    case DEPARTMENTS_PRODUCTS_BLUR:
      return Object.assign({}, state, {
        departments: Object.assign({}, state.departments, {
          products: Object.assign({}, state.departments.products, {
            suggestionsVisible: false
          })
        })
      });

    case DEPARTMENTS_PRODUCTS_FOCUS:
      return Object.assign({}, state, {
        departments: Object.assign({}, state.departments, {
          products: Object.assign({}, state.departments.products, {
            suggestionsVisible: true
          })
        })
      });

    case DEPARTMENTS_PRODUCTS_SET:
      return Object.assign({}, state, {
        departments: Object.assign({}, state.departments, {
          products: Object.assign({}, state.departments.products, {
            items: payload
          })
        })
      });

    case DEPARTMENTS_PRODUCTS_SELECTED_CHANGED:
      return Object.assign({}, state, {
        departments: Object.assign({}, state.departments, {
          products: Object.assign({}, state.departments.products, {
            selected: payload,
            search: payload.name
          })
        })
      });

    case DEPARTMENTS_PRODUCT_ADD:
      departmentsProductAddApiCall(`${productsUrl}${state.departments.products.selected._id}`,
        state.departments.products.selected.departments,
        state.departments.selected
      ).then(product => {
        console.log('updated product: ', product);
      }).catch(err => console.warn(err));

      return state;

    case DEPARTMENTS_SEARCH:
      autocompleteSearchApiCall(departmentsUrl, payload).then(departments => {
        action.asyncDispatch({ type: DEPARTMENTS_SET, payload: departments });
      });
      return Object.assign({}, state, {
        departments: Object.assign({}, state.departments, {
          search: payload,
          suggestionsVisible: true
        })
      });

    case DEPARTMENTS_BLUR:
      return Object.assign({}, state, {
        departments: Object.assign({}, state.departments, {
          suggestionsVisible: false
        })
      });

    case DEPARTMENTS_FOCUS:
      return Object.assign({}, state, {
        departments: Object.assign({}, state.departments, {
          suggestionsVisible: true
        })
      });

    case DEPARTMENTS_SET:
      return Object.assign({}, state, {
        departments: Object.assign({}, state.departments, {
          items: payload
        })
      });

    case DEPARTMENTS_SELECTED_CHANGED:
      return Object.assign({}, state, {
        departments: Object.assign({}, state.departments, {
          selected: payload,
          search: payload.name
        })
      });
    
    default:
      return state;
  }
}
export default departmentsReducers;