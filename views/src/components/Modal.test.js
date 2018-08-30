import React from 'react';

import Modal from './Modal';
import store from '../store/index';

test('modal accepts childrens', () => {
  const component = mount(<Modal store={store}><div className="childrens">childrens</div></Modal>),
  result = component.find('.childrens');
  expect(result.text()).toBe('childrens');
});

test('modal click on Close button dispatches MODAL_CLOSE', () => {
  const spy = jest.spyOn(store, 'dispatch'),
    component = mount(<Modal store={store} modalClose={spy}/>),
    close = component.find('CustomButton');
  
    close.simulate('click');
  expect(spy).toHaveBeenCalled();
  expect(spy.mock.calls[0][0].type).toEqual("MODAL_CLOSE");
});

test('MODAL_OPEN sets status true', () => {
  mount(<Modal store={store} />);

  store.dispatch({type: "MODAL_OPEN", payload: null});
  expect(store.getState().modal.status).toBe(true);
});