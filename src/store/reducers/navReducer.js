import { TOGGLE_NAVBAR } from '../types';

const initialState = {
  isExpanded: typeof window != "undefined" && window.innerWidth > 768 ? true : false
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
