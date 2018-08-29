import {
  MODAL_OPEN,
  MODAL_CLOSE
} from '../actions/action-types.js';

const modalReducers = (state, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return Object.assign({}, state, {
        modal: Object.assign({}, state.modal, { status: true })
      });

    case MODAL_CLOSE:
      return Object.assign({}, state, {
        modal: Object.assign({}, state.modal, { status: false })
      });

    default:
      return state;
  }
}
export default modalReducers;