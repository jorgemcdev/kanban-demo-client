import axios from 'axios';

import { MODAL_OPEN, MODAL_CLOSE } from './actionTypes';

const open = (id) => (
  {
    type: MODAL_OPEN,
    payload: id
  }
);

const close = () => (
  {
    type: MODAL_CLOSE
  }
);

export const openModal = (id) =>
  dispatch => dispatch(open(id));

export const closeModal = () =>
  dispatch => dispatch(close());

