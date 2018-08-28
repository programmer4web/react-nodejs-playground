import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import Product from './Product.jsx';
import store from '../store/index';

const data = {
  "name":"White T-shirt Elevate",
  "price": {"amount": 17, "currency": "usd"},
  "images":[{"src":"./demo_imgs/shirt.jpg","alt":"test"}],
  "departments":["5b7bbfc0e5b2f20e8cb06866"],
  "_id":"5b6830856882617d10f2a567",
  "type":"Clothing",
  "size":"Small",
  "power": 0
};

test('product toJson matches snapshot', () => {

  const component = renderer.create(
    <Provider store={store}>
      <Product data={data} />
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('data is used in tile', () => {
  const component = mount(
  <Provider store={store}>
    <Product data={data} />
  </Provider>);

  expect(component.find('.product-title').text()).toEqual('White T-shirt Elevate');
});
