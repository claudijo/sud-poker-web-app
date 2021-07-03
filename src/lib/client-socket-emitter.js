import {TinyEmitter} from "tiny-emitter";
import uniqueId from "./unique-id";
import Backoff from 'backo2';

export default class ClientSocketEmitter extends TinyEmitter {
    constructor(url) {
        super()

        this.url = url
        this.responseCallbacks = {}
        this.keepAlive = true
        this.reconnectTimeout = null
        this.reconnectionBackoff = new Backoff({min: 100, max: 10000, jitter: 0.5});
        this.responseTimeoutMs = 30000
        this.messageBuffer = []
        this.onError = this.onError.bind(this)
        this.onMessage = this.onMessage.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onOpen = this.onOpen.bind(this)
        this.connect()
    }

    connect() {
        this.socket = new WebSocket(this.url)
        this.socket.onerror = this.onError.bind(this)
        this.socket.onmessage = this.onMessage.bind(this)
        this.socket.onclose = this.onClose.bind(this)
        this.socket.onopen = this.onOpen.bind(this)
    }

    emit(event, params, callback) {
        if (typeof params === 'function') {
            callback = params
            params = undefined
        }
        const payload = {ev: event, p: params}
        if (typeof callback === 'function') {
            const id = uniqueId()
            this.pushResponseCallback(id, callback)
            payload.id = id
        }

        this.send(0, payload)
    }

    notify(event, params) {
        this.emit(event, params)
    }

    request(event, params) {
        return new Promise((resolve, reject) => {
            this.emit(event, params, (error, result) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve(result)
            })
        })
    }

    flushMessageBuffer() {
        while (this.messageBuffer.length !== 0) {
            const message = this.messageBuffer.shift()
            this.socket.send(message)
        }
    }

    enqueueMessage(message) {
        this.messageBuffer.push(message)
    }

    send(channel, payload) {
        try {
            payload.ch = channel
            const message = JSON.stringify(payload)
            this.enqueueMessage(message)
            if (this.socket !== null && this.socket.readyState === WebSocket.OPEN) {
                this.flushMessageBuffer();
            }
        } catch (error) {
            super.emit('error', error)
        }
    }

    onOpen() {
        this.flushMessageBuffer();
        super.emit('open')
    }

    onError(event) {
        super.emit('error', event)
    }

    onMessage({data}) {
        try {
            const payload = JSON.parse(data)
            const {ch: channel, ev: event, id, p: params, e: error} = payload
            switch (channel) {
                case 1:
                    this.handleResponse(id, error, params)
                    return
                case 0:
                    const replyCallback = id === undefined
                        ? () => {
                            throw new Error('Reply not expected')
                        }
                        : (error, params) => {
                            this.send(1, {
                                id,
                                e: error,
                                p: params
                            })
                        }
                    super.emit(event, params, replyCallback)
                    return
                default:
                    throw new Error('Invalid channel')
            }
        } catch (error) {
            super.emit('error', error)
        }
    }

    onClose(event) {
        this.socket = null
        if (this.keepAlive) {
            this.reconnectTimeout = setTimeout(() => {
                this.connect();
            }, this.reconnectionBackoff.duration());
        }
    }

    pushResponseCallback(id, callback) {
        this.responseCallbacks[id] = {
            callback,
            timeout: setTimeout(() => {
                callback(null, new Error('Timeout'))
                delete this.responseCallbacks[id]
            }, this.responseTimeoutMs)
        }
    }

    handleResponse(id, error, params) {
        const {callback, timeout} = this.responseCallbacks[id]
        if (!callback) {
            return
        }
        clearTimeout(timeout)
        delete this.responseCallbacks[id]
        callback(error, params)
    }

    close() {
        this.keepAlive = false
        clearTimeout(this.reconnectTimeout)
        this.socket.close(1000)
    }
}