import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';

import WishList from './Wishlist.jsx';
import store from '../store/index';

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
