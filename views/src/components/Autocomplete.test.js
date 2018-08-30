import React from 'react';

import Autocomplete from './Autocomplete.jsx';

test('className default is autocomplete', () => {
  const component = shallow(<Autocomplete/>);
    expect(component.hasClass('autocomplete')).toBe(true);
});

test('className is test-autocomplete', () => {
  const component = shallow(<Autocomplete className="test-autocomplete"/>);
  expect(component.hasClass('test-autocomplete')).toBe(true);
});

test('placeholder of input is updated from property', ()=> {
  const component = shallow(<Autocomplete placeholder="Search User" />);
  expect(component.find('input').prop('placeholder')).toEqual('Search User');
});

test('click on Clear triggers handleSearch and handleBlur', () => {
  const searchChanged = (value) => {
      expect(value).toEqual('');
    },
    handleBlur = () => {},
    spy = jest.spyOn(Autocomplete.prototype, 'handleClear'),
    component = mount(<Autocomplete searchChanged={searchChanged} handleBlur={handleBlur} />);
  component.find('CustomButton').simulate('click');

  expect(spy).toHaveBeenCalled();
});

test('onChange triggers handleSearchChanged', () => {
  const searchChanged = (value) => {
      expect(value).toEqual('');
    },
    spy = jest.spyOn(Autocomplete.prototype, 'handleSearchChanged'),
    component = mount(<Autocomplete searchChanged={searchChanged} />);
  component.find('input').simulate('change',{});

  expect(spy).toHaveBeenCalled();
});

test('onBlur triggers handleBlur', done => {
  const searchChanged = () => {
    },
    handleBlur = () => {},
    spy = jest.spyOn(Autocomplete.prototype, 'handleBlur'),
    component = mount(<Autocomplete searchChanged={searchChanged} handleBlur={handleBlur}/>);
  component.find('input').simulate('blur', {});
  expect(spy).toHaveBeenCalled();
  done();
})

test('if value and no items empty-items className is added', () => {
  const component = mount(<Autocomplete value="abc" />),
    input = component.find('input');
  expect(input.hasClass('empty-items')).toBe(true);
})