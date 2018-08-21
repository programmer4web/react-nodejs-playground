import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';

import Action from './Action.js';
import store from '../store/index';


test('Initiated Action matches the snapshot', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Action />
    </Provider>
  );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('action has text', () => {
  let wrapper = mount(
    <Provider store={store}>
      <Action text="text property" />
    </Provider>);
    expect(wrapper.text()).toBe('text property');
});

test('handleClickAction preventsDefault event', () => {
  let wrapper = shallow(
      <Action text="text property" store={store} />
    );

    const action = wrapper.dive(),
      e = {};
    let flag = false;
      e.preventDefault = () => {
        flag = true;
      };
    action.simulate('click', e);
    expect(flag).toBe(true);
})
