import {
  REDUX_WEBSOCKET_BROKEN,
  REDUX_WEBSOCKET_CLOSED,
  REDUX_WEBSOCKET_CONNECT,
  REDUX_WEBSOCKET_MESSAGE,
  REDUX_WEBSOCKET_OPEN,
  REDUX_WEBSOCKET_SEND
} from "../types";

const initialState = {
  connected: false,
  messages: [],
  url: null
};

export const getConnected = state => state.connected;

export default function(state = initialState, { type, payload, meta }) {
  switch (type) {
    case "INTERNAL::CLEAR_MESSAGE_LOG":
      return {
        ...state,
        messages: []
      };

    case REDUX_WEBSOCKET_CONNECT:
      return {
        ...state,
        url: payload.url
      };

    case REDUX_WEBSOCKET_OPEN:
      return {
        ...state,
        connected: true
      };

    case REDUX_WEBSOCKET_BROKEN:
    case REDUX_WEBSOCKET_CLOSED:
      return {
        ...state,
        connected: false
      };

    case REDUX_WEBSOCKET_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            data: JSON.parse(payload.message),
            origin: payload.origin,
            timestamp: meta.timestamp,
            type: "INCOMING"
          }
        ]
      };

    case REDUX_WEBSOCKET_SEND:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            data: payload,
            origin: window.location.origin,
            timestamp: new Date(),
            type: "OUTGOING"
          }
        ]
      };

    default:
      return state;
  }
}
