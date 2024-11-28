import React from 'react';
import { KeyRound } from 'lucide-react';

export const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <KeyRound className="w-16 h-16 text-blue-500 animate-bounce" />
          <div className="absolute inset-0 animate-ping">
            <KeyRound className="w-16 h-16 text-blue-500 opacity-75" />
          </div>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white animate-pulse">
          PassVault
        </h1>
        <div className="mt-4 flex justify-center">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};