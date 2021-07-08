import { Suspense } from 'react';
import ErrorBoundary from './components/error-boundary';
import './app.css';
import GameOfPoker from './scenes/game-of-poker';
import {
  RecoilRoot,
} from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <GameOfPoker
            tableId="sandbox"
            size={{ width: 1280, height: 720 }}
          />
        </Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}