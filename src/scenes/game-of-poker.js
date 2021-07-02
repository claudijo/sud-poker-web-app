import Stage from "../components/stage";
import Canvas from "../components/canvas";
import Table from "../components/table";

const size = { width: 1280, height: 720 }

export default function GameOfPoker({ tableId }) {
    return (
        <Stage width={size.width} height={size.height}>
            {/*Background layer*/}
            <Canvas width={size.width} height={size.height}>
                <Table x={100} y={100} width={600} height={300} borderWidth={16}/>
            </Canvas>
        </Stage>
    )
}