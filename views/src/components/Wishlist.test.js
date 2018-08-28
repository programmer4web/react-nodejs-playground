import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';

import WishList from './Wishlist.jsx';
import store from '../store/index';

// import {wishlistAddProduct} from '../actions/index';

test('Initiated Wishlist matches the snapshot', () => {
  const component = renderer.create(
    <Provider store={store}>
      <WishList />
    </Provider>
  );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('wishlist className is wishlist-products', () => {
  let wrapper = mount(
    <Provider store={store}>
      <WishList />
    </Provider>);
    expect(wrapper.find('.wishlist-products')).toHaveLength(1);
});

// test('wishlistGetIds is called once', ()=> {
//   let wrapper = mount(
//       <WishList store={store} />);
//       const props = wrapper.instance().props;
//         // store = props.store;
//       props.store.subscribe(() => {
//         expect(props.store.getState()).user.wishlist.toHaveLength(1);
//       });
//
//       props.store.dispatch(wishlistAddProduct('5b6830856882617d10f2a567'));
// });
