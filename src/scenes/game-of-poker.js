import Stage from "../components/stage";
import Canvas from "../components/canvas";
import Table from "../components/table";
import {useEffect, useCallback, useRef} from "react";
import ClientSocketEmitter from "../lib/client-socket-emitter";

// TODO: Put in env aware config
const realTimeMessagingServiceUrl = 'ws://localhost:3000/ws/poker'

export default function GameOfPoker({ size, tableId }) {
    const { width, height } = size

    const socket = useRef(null)

    const onSocketOpen = useCallback(async () => {
        await fetch('/api/me', {
            credentials: 'same-origin'
        })
        const { table } = await socket.current?.request('join', {id: tableId})
        console.log(table)

    },[tableId])

    const onSocketError = useCallback((error) => {
        console.error('Socket error', error)
    }, [])

    useEffect(() => {
        socket.current = new ClientSocketEmitter(realTimeMessagingServiceUrl)
        socket.current.on('open', onSocketOpen)
        socket.current.on('error', onSocketError)
        // this.socket.on('reserveSeat', this.onReserveSeat)
        // this.socket.on('cancelReservation', this.onCancelReservation)

        return () => {
            socket.current.off('open', onSocketOpen)
            socket.current.off('error', onSocketError)
            socket.current.close()
            socket.current = null
        }

    }, [onSocketOpen, onSocketError])

    return (
        <Stage width={width} height={height}>
            {/*Background layer*/}
            <Canvas width={width} height={height}>
                <Table
                    x={width / 2 - 600 / 2}
                    y={120}
                    width={600}
                    height={300}
                    borderWidth={16}
                />
            </Canvas>
        </Stage>
    )
}