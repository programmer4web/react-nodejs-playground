import{MODAL_OPEN, MODAL_CLOSE} from './action-types';

export const modalOpen = id => ({
  type: MODAL_OPEN,
  payload: id
});

export const modalClose = id => ({
  type: MODAL_CLOSE,
  payload: id
});
