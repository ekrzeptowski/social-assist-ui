import { TOGGLE_NAVBAR } from '../types';

const initialState = {
  isExpanded: window.innerWidth > 700 ? true : false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case TOGGLE_NAVBAR:
      return {
        ...state,
        isExpanded: !state.isExpanded
      };
    default:
      return state;
  }
}
