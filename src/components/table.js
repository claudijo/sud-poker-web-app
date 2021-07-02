import RoundedRectangle from "../canvas-shapes/rounded-rectangle";

export default function Table ({ x, y, width, height, borderWidth }) {
    return (
        <>
            <RoundedRectangle
                x={x + borderWidth * 0.5}
                y={y + borderWidth * 0.5}
                width={width - borderWidth}
                height={height - borderWidth}
                radius={Math.min(width - borderWidth, height - borderWidth) / 2}
                fillStyle="#3689b3"
            />
            <RoundedRectangle
                x={x + borderWidth * 1.5}
                y={y + borderWidth * 1.5}
                width={width - borderWidth * 2}
                height={height - borderWidth * 2}
                radius={Math.min(width - borderWidth * 2, height - borderWidth * 2) / 2}
                fillStyle="#45b0e6"
            />
            <RoundedRectangle
                x={x + borderWidth * 0.5}
                y={y + + borderWidth * 0.5}
                width={width - borderWidth}
                height={height - borderWidth}
                radius={Math.min(width - borderWidth, height - borderWidth) / 2}
                strokeStyle="#4dc3ff"
                lineWidth={borderWidth}
            />
        </>
    )
}