import React, { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Auth: React.FC = () => {
  const [pin, setPin] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const { masterPin, setMasterPin, setAuthenticated } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNewUser) {
      setMasterPin(pin);
      setAuthenticated(true);
    } else if (pin === masterPin) {
      setAuthenticated(true);
    } else {
      alert('Invalid PIN');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <div className="flex flex-col items-center mb-6">
          <KeyRound className="w-12 h-12 text-blue-500 mb-2" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">PassVault</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {isNewUser ? 'Create PIN' : 'Enter PIN'}
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isNewUser ? 'Create Vault' : 'Unlock'}
          </button>
        </form>
        <button
          onClick={() => setIsNewUser(!isNewUser)}
          className="mt-4 text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400"
        >
          {isNewUser ? 'Already have a PIN?' : 'New user?'}
        </button>
      </div>
    </div>
  );
};