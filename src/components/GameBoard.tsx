import React, { useState } from 'react';
import Canvas from './Canvas';
import type { Round } from '../App';

type GameBoardProps = {
  currentPlayer: number;
  currentTurn: number;
  totalPlayers: number;
  totalTurns: number;
  rounds: Round[];
  onRoundComplete: (drawing: string, answer: string) => void;
};

function GameBoard({ 
  currentPlayer, 
  currentTurn,
  totalPlayers, 
  totalTurns,
  rounds, 
  onRoundComplete 
}: GameBoardProps) {
  const [currentDrawing, setCurrentDrawing] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDrawing || !answer.trim()) return;
    onRoundComplete(currentDrawing, answer.trim());
    setAnswer('');
  };

  const lastRound = rounds[rounds.length - 1];
  const previousRounds = rounds.slice(0, -1).reverse();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            プレイヤー {currentPlayer + 1}
          </h2>
          <p className="text-gray-600">
            ターン {currentTurn + 1} / {totalTurns}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <Canvas onSave={setCurrentDrawing} />
            
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="描いたものの名前を入力"
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  送信
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700">これまでの絵</h3>
            
            {lastRound && (
              <div className="border-2 border-indigo-200 rounded-lg p-3 bg-indigo-50">
                <div className="aspect-square bg-white rounded-lg overflow-hidden mb-2">
                  <img
                    src={lastRound.drawing}
                    alt="直前の絵"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    プレイヤー {lastRound.playerId + 1}
                  </p>
                </div>
              </div>
            )}

            {previousRounds.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-600">履歴</h4>
                <div className="grid grid-cols-2 gap-2">
                  {previousRounds.map((round, index) => (
                    <div key={index} className="border rounded-lg p-2">
                      <img
                        src={round.drawing}
                        alt={`過去の絵 ${index + 1}`}
                        className="w-full h-20 object-contain bg-gray-50"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameBoard;