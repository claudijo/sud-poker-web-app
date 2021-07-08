import { selectorFamily } from 'recoil';
import ClientSocketEmitter from '../lib/client-socket-emitter';

const openSocket = url => {
  return new Promise((resolve, reject) => {
    const socket = new ClientSocketEmitter(url)

    const onError = error => {
      socket.off('open', onOpen)
      reject(error)
    }

    const onOpen = async () => {
      socket.off('error', onError)
      const response = await fetch('/api/me', {
        credentials: 'same-origin',
      });

      if (response.ok) {
        console.log('Connection set up')
        resolve(socket)
      } else {
        const responseText = await response.text()
        reject(new Error(responseText))
      }

      resolve(socket)
    }

    socket.once('error', onError)
    socket.once('open', onOpen)
  })
}

const socketEmitterState = selectorFamily({
  key: 'SocketEmitter',
  default: null,
  get: url => () => {
    const socket = openSocket(url)
    return socket
  }
})

export { socketEmitterState }