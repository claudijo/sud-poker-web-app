import './app.css';
import {useState, useRef, useEffect} from 'react';
import CanvasCircle from "./components/canvas-circle";
import Canvas from "./components/canvas";
import CanvasRectangle from "./components/canvas-rectangle";

function App() {
    const [count, setCount] = useState(100);

    return (
        <div>
            <button onClick={() => setCount(count + 10)}>{count}</button>
            <div id="stage">
                <Canvas width={400} height={400} interactive={true}>
                    <CanvasCircle x={0} y={0} radius={50} fillStyle="#666">
                        <CanvasCircle
                            x={10}
                            y={10}
                            radius={20}
                            fillStyle="#999"
                            onClick={event => console.log('Click', event.target)}
                            onMouseOver={event => console.log('Mouse over', event.target)}
                            onMouseOut={event => console.log('Mouse out', event.target)}
                        />
                    </CanvasCircle>
                    <CanvasRectangle x={150} y={150} height={100} width={100} fillStyle="#aaa"/>
                </Canvas>
            </div>
        </div>
    );
}

export default App;
