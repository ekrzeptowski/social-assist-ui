import {
    WEBSOCKET_BROKEN,
    WEBSOCKET_CLOSED,
    WEBSOCKET_CONNECT,
    WEBSOCKET_MESSAGE,
    WEBSOCKET_OPEN,
    WEBSOCKET_SEND,
    WEBSOCKET_DISCONNECT
  } from "../types";

export const websocketConnect = host => ({ type: WEBSOCKET_CONNECT, host });
export const websocketConnected = host => ({ type: WEBSOCKET_OPEN, host });
export const websocketDisconnect = host => ({ type: WEBSOCKET_DISCONNECT, host });
export const websocketDisconnected = host => ({ type: WEBSOCKET_CLOSED, host });