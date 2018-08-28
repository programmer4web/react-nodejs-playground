import {
  WISHLIST_GET_IDS,
  WISHLIST_ADD_PRODUCT,
  WISHLIST_REMOVE_PRODUCT,
  WISHLIST_SET_IDS,
  WISHLIST_GET_PRODUCTS,
  WISHLIST_SET_PRODUCTS,
  WISHLIST_ERROR,

  FEATUREDPRODUCTS_GET_SOURCE,
  FEATUREDPRODUCTS_SET_SOURCE,
  FEATUREDPRODUCTS_SET_VISIBLE,
  FEATUREDPRODUCTS_HANDLE_MODE,
  FEATUREDPRODUCTS_APPLY_FILTER,
  FEATUREDPRODUCTS_SET_FILTERS,

  MODAL_OPEN,
  MODAL_CLOSE,

  DEPARTMENTS_PRODUCTS_SEARCH,
  DEPARTMENTS_PRODUCTS_FOCUS,
  DEPARTMENTS_PRODUCTS_BLUR,
  DEPARTMENTS_PRODUCTS_SET,
  DEPARTMENTS_PRODUCTS_SELECTED_CHANGED,

  DEPARTMENTS_SEARCH,
  DEPARTMENTS_FOCUS,
  DEPARTMENTS_BLUR,
  DEPARTMENTS_SET,
  DEPARTMENTS_SELECTED_CHANGED
  } from '../actions/action-types.js';

import {
  wishlistGetIdsApiCall,
  wishlistAddProductApiCall,
  wishlistRemoveProductApiCall,
  wishlistGetProductsApiCall
} from '../apiCall/WishListApiCall.js';

import {
  featuredProductsGetSourceApiCall
} from '../apiCall/FeaturedProductsApiCall.js';

import {featuredProductsApplyFilterReducer} from './FeaturedProductsReducers.js';

import {autocompleteSearchApiCall} from '../apiCall/AutocompleteApiCall.js';

const initialState = {
  serverUrl: 'http://127.0.0.1:7070/',
  user: {
    _id: '5b646febeebb915ff8b221be',
    name: {
      first: 'Jon',
      last: 'Doe',
      position:'admin',
      bio:"sunt frumos",
      phone:"071231311",
      email:"dasdafa@cf.com"
    },
    wishlist: [],
    wishlistProducts: [],
    wishlistError: ''
  },
  links: [
    {title: 'Featured Products', url: '/'},
    {title: 'Departments', url: '/departments'}
  ],
  featuredProducts: {
    source: [],
    visible: [],
    mode: '',
    filters: {
      search: '',
      sort: ''
    }
  },
  departments: {
    items: [],
    search: '',
    selected: '',
    suggestionsVisible: true,
    products: {
      items: [],
      search: '',
      selected: {},
      suggestionsVisible: true
    }
  },
  notifications: {
    items: [
      {title: 'test notification'}
    ]
  },
  modal: {
    status: false
  }
};

const rootReducer = (state = initialState, action) => {
  const userUrl = `${state.serverUrl}users/${state.user._id}`, // get user data url
    productsUrl = `${state.serverUrl}products/`, // get products data url
    departmentsUrl = `${state.serverUrl}departments/`,
    payload = action.payload;

  switch (action.type) {
    case WISHLIST_GET_IDS:
      wishlistGetIdsApiCall(userUrl).then(wishlist => {
        action.asyncDispatch({type: WISHLIST_SET_IDS, payload: wishlist});
      }).catch(err => console.warn(err));
      return state;

    case WISHLIST_ADD_PRODUCT:
      wishlistAddProductApiCall(payload, userUrl).then(wishlist => {
        action.asyncDispatch({type: WISHLIST_SET_IDS, payload: wishlist});
      }).catch(err => action.asyncDispatch({type: WISHLIST_ERROR, payload: err})
        );
      return state;

    case WISHLIST_REMOVE_PRODUCT:
      wishlistRemoveProductApiCall(payload, userUrl).then(wishlist => {
        action.asyncDispatch({type: WISHLIST_SET_IDS, payload: wishlist});
      }).catch(err => console.warn(err));
      return state;

    case WISHLIST_SET_IDS:
      action.asyncDispatch({type: WISHLIST_GET_PRODUCTS, payload: payload});
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {wishlist: payload})
      });

    case WISHLIST_GET_PRODUCTS:
      wishlistGetProductsApiCall(payload, productsUrl).then(wishlistProducts => {
        action.asyncDispatch({type: WISHLIST_SET_PRODUCTS, payload: wishlistProducts});
      }).catch(err => console.warn(err));
      return state;

    case WISHLIST_SET_PRODUCTS:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {wishlistProducts: payload})
      });

    case WISHLIST_ERROR:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {wishlistError: payload}),
        modal: {status: true}
      });

    case FEATUREDPRODUCTS_GET_SOURCE:
      featuredProductsGetSourceApiCall(productsUrl).then(products => {
        action.asyncDispatch({type: FEATUREDPRODUCTS_SET_SOURCE, payload: products});
      });
      return state;

    case FEATUREDPRODUCTS_SET_SOURCE:
      action.asyncDispatch({type: FEATUREDPRODUCTS_SET_VISIBLE, payload: payload});
      return Object.assign({}, state, {
        featuredProducts: Object.assign({}, state.featuredProducts, {source: payload})
      });

    case FEATUREDPRODUCTS_SET_VISIBLE:
      return Object.assign({}, state, {
        featuredProducts: Object.assign({}, state.featuredProducts, {visible: payload})
      });

    case FEATUREDPRODUCTS_HANDLE_MODE:
      return Object.assign({}, state, {
        featuredProducts: Object.assign({}, state.featuredProducts, {mode: payload})
      });

    case FEATUREDPRODUCTS_APPLY_FILTER:
      action.asyncDispatch({type: FEATUREDPRODUCTS_SET_FILTERS, payload: payload});
      featuredProductsApplyFilterReducer(payload).then(visible => {
        action.asyncDispatch({type: FEATUREDPRODUCTS_SET_VISIBLE, payload: visible});
      });
      return state;

    case FEATUREDPRODUCTS_SET_FILTERS:
    return Object.assign({}, state, {
      featuredProducts: Object.assign({}, state.featuredProducts, {
        filters: Object.assign({}, state.featuredProducts.filters, {[payload.task]: payload.value})
      })
    });

    case MODAL_OPEN:
      return Object.assign({}, state, {
        modal: Object.assign({}, state.modal, {status: true})
      });

    case MODAL_CLOSE:
      return Object.assign({}, state, {
        modal: Object.assign({}, state.modal, {status: false})
      });

    case DEPARTMENTS_PRODUCTS_SEARCH:
      autocompleteSearchApiCall(productsUrl, payload).then(products => {
        action.asyncDispatch({type: DEPARTMENTS_PRODUCTS_SET, payload: products});
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
};
export default rootReducer;
