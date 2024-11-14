import React from 'react';
import type { Round } from '../App';

type ResultsProps = {
  rounds: Round[];
  playerCount: number;
};

function Results({ rounds }: ResultsProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          ゲーム結果
        </h2>

        <div className="space-y-6">
          {rounds.map((round, index) => (
            <div
              key={index}
              className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="aspect-square bg-white rounded-lg overflow-hidden">
                  <img
                    src={round.drawing}
                    alt={`ターン ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      ターン {index + 1}
                    </h3>
                    <p className="text-gray-600">
                      プレイヤー {round.playerId + 1}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-600 mb-1">
                      回答
                    </h4>
                    <p className="text-lg font-medium text-gray-800">
                      {round.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results;