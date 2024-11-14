import React, { useState } from 'react';
import { Users } from 'lucide-react';
import PlayerSetup from './components/PlayerSetup';
import GameBoard from './components/GameBoard';
import Results from './components/Results';

export type GameState = 'setup' | 'playing' | 'results';
export type Round = {
  playerId: number;
  drawing: string;
  answer: string;
};

function App() {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [turnsPerPlayer, setTurnsPerPlayer] = useState<number>(3);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [rounds, setRounds] = useState<Round[]>([]);

  const handleGameSetup = (players: number, turns: number) => {
    setPlayerCount(players);
    setTurnsPerPlayer(turns);
    setGameState('playing');
  };

  const handleRoundComplete = (drawing: string, answer: string) => {
    setRounds([...rounds, { playerId: currentPlayer, drawing, answer }]);
    
    if (currentPlayer === playerCount - 1) {
      if (currentTurn === turnsPerPlayer - 1) {
        setGameState('results');
      } else {
        setCurrentPlayer(0);
        setCurrentTurn(currentTurn + 1);
      }
    } else {
      setCurrentPlayer(currentPlayer + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">絵しりとり</h1>
          <div className="flex items-center justify-center gap-4 text-indigo-700">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{playerCount}人</span>
            </div>
            {gameState !== 'setup' && (
              <div className="flex items-center gap-2">
                <span>各{turnsPerPlayer}ターン</span>
              </div>
            )}
          </div>
        </header>

        {gameState === 'setup' && (
          <PlayerSetup onStart={handleGameSetup} />
        )}

        {gameState === 'playing' && (
          <GameBoard
            currentPlayer={currentPlayer}
            currentTurn={currentTurn}
            totalPlayers={playerCount}
            totalTurns={turnsPerPlayer}
            rounds={rounds}
            onRoundComplete={handleRoundComplete}
          />
        )}

        {gameState === 'results' && (
          <Results rounds={rounds} playerCount={playerCount} />
        )}
      </div>
    </div>
  );
}

export default App;