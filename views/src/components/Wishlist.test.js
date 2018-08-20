import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';

import WishList from './Wishlist.js';
import store from '../store/index';

test('Initiates an Wishlist instance', () => {
  const component = renderer.create(
    <Provider store={store}>
      <WishList />
    </Provider>
  );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
