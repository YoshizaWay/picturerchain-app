import React, { useState } from 'react';
import { Users, RotateCw } from 'lucide-react';

type PlayerSetupProps = {
  onStart: (players: number, turns: number) => void;
};

function PlayerSetup({ onStart }: PlayerSetupProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<number>(2);
  const [selectedTurns, setSelectedTurns] = useState<number>(3);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            プレイヤー数を選択
          </h2>
          
          <div className="grid grid-cols-3 gap-4">
            {[2, 3, 4].map((count) => (
              <button
                key={count}
                onClick={() => setSelectedPlayers(count)}
                className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all duration-200
                          ${selectedPlayers === count 
                            ? 'border-indigo-500 bg-indigo-50' 
                            : 'border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50'}`}
              >
                <Users className="w-8 h-8 text-indigo-600 mb-2" />
                <span className="text-lg font-medium text-gray-700">{count}人</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            ターン数
          </h2>
          
          <div className="grid grid-cols-3 gap-4">
            {[3, 4, 5].map((count) => (
              <button
                key={count}
                onClick={() => setSelectedTurns(count)}
                className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all duration-200
                          ${selectedTurns === count 
                            ? 'border-indigo-500 bg-indigo-50' 
                            : 'border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50'}`}
              >
                <RotateCw className="w-8 h-8 text-indigo-600 mb-2" />
                <span className="text-lg font-medium text-gray-700">{count}ターン</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onStart(selectedPlayers, selectedTurns)}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          ゲームを開始
        </button>
      </div>
    </div>
  );
}

export default PlayerSetup;