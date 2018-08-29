
import wishlistReducers from './WishlistReducers.js';
import featuredProductsReducers from './FeaturedProductReducers';
import modalReducers from './ModalReducers.js';
import departmentsReducers from './DepartmentsReducers.js';
import productsByDepartmentReducers from './ProductsByDepartmentReducers.js';

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
    suggestionsVisible: false,
    products: {
      items: [],
      search: '',
      selected: {},
      suggestionsVisible: false
    }
  },
  productsByDepartment: {
    items: [],
    selected: {},
    products: []
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
  const type = action.type.split('_')[0];

  switch (type) {
    case "WISHLIST":
      return wishlistReducers(state, action);
    case "FEATUREDPRODUCTS":
      return featuredProductsReducers(state, action);
    case "MODAL":
      return modalReducers(state, action);
    case "DEPARTMENTS":
      return departmentsReducers(state, action);
    case "PRODUCTSBYDEPARTMENT":
      return productsByDepartmentReducers(state, action);

    default:
      return state;
  }
};
export default rootReducer;
