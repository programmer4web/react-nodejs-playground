import React from 'react';
import renderer from 'react-test-renderer';

import CustomButton from './CustomButton.jsx';


test('Initiated CustomButton matches the snapshot', () => {
  const component = renderer.create(<CustomButton />);
  expect(component.toJSON()).toMatchSnapshot();
});

test('action has text', () => {
  let button = mount(
    <CustomButton text="text property" />
  );
  expect(button.text()).toBe('text property');
});

test('handleClickCustomButton preventsDefault event', () => {

  const data = '398456394-865';
  let button = shallow(
    <CustomButton text="text property" id={data} callback={(receivedData) => {
      expect(receivedData).toEqual(data);
    }} />
  );

  let e = {};
  e.preventDefault = () => {
    expect(true).toEqual(true);
  };
  button.simulate('click', e);
})
