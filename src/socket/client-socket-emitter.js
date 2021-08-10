import ClientSocketEmitter from '../lib/client-socket-emitter';

export const clientSocketEmitter = new ClientSocketEmitter(`ws://${process.env.REACT_APP_HOST}:3000/ws/poker`);
