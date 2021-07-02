import Stage from "../components/stage";
import Canvas from "../components/canvas";
import Table from "../components/table";

export default function GameOfPoker({ size, tableId }) {
    const { width, height } = size

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