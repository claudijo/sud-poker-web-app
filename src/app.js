// import { Suspense } from 'react';
// import ErrorBoundary from './components/error-boundary';
import './app.css';
import GameOfPoker from './scenes/game-of-poker';

export default function App() {
  return (
    <GameOfPoker tableId="sandbox"/>
  );
}