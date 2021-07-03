import './app.css';
import GameOfPoker from "./scenes/game-of-poker";
import {
    RecoilRoot,
} from 'recoil';

export default function App() {
    return (
        <RecoilRoot>
            <GameOfPoker
                tableId="sandbox"
                size={{width: 1280, height: 720}}
            />
        </RecoilRoot>
    );
}