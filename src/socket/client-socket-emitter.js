import ClientSocketEmitter from '../lib/client-socket-emitter';

export const clientSocketEmitter = new ClientSocketEmitter(`ws://${process.env.REACT_APP_POKER_SERVICE_HOST}:${process.env.REACT_APP_POKER_SERVICE_PORT}/ws/poker`);
