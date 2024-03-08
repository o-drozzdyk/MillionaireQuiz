import React from 'react';
import './App.css';
import { useAppSelector } from './store/hooks';
import GamePage from './pages/GamePage/GamePage';
import MainPage from './pages/MainPage/MainPage';

function App() {
  const { stage } = useAppSelector((state) => state.game);

  return (
    <div className="App">
      {
        stage === 'end' || stage === 'start'
          ? <MainPage />
          : <GamePage />
      }
    </div>
  );
}

export default App;
