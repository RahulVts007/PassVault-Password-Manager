import React, { useMemo } from 'react';
import { Trash2, Copy, Globe, Star, Edit, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../store/useStore';
import { calculatePasswordStrength, getStrengthColor, getStrengthLabel } from '../utils/passwordStrength';
import { PasswordCategory } from '../types/password';

export const PasswordList: React.FC = () => {
  const { passwords, removePassword, toggleFavorite, searchQuery, selectedCategory } = useStore();
  const [showPassword, setShowPassword] = React.useState<Record<string, boolean>>({});

  const filteredPasswords = useMemo(() => {
    return passwords
      .filter((p) => {
        const matchesSearch = 
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.website?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (a.favorite !== b.favorite) return b.favorite ? 1 : -1;
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      });
  }, [passwords, searchQuery, selectedCategory]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (filteredPasswords.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No passwords found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredPasswords.map((password) => {
        const strength = calculatePasswordStrength(password.password);
        const strengthColor = getStrengthColor(strength);
        const strengthLabel = getStrengthLabel(strength);

        return (
          <div
            key={password.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all hover:shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleFavorite(password.id)}
                  className={`${
                    password.favorite ? 'text-yellow-400' : 'text-gray-400'
                  } hover:text-yellow-500 transition-colors`}
                >
                  <Star className="w-5 h-5" fill={password.favorite ? 'currentColor' : 'none'} />
                </button>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {password.title}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {password.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => removePassword(password.id)}
                  className="text-red-500 hover:text-red-600 p-1"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Username
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{password.username}</span>
                  <button
                    onClick={() => copyToClipboard(password.username)}
                    className="text-gray-500 hover:text-gray-600 p-1"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Password
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">
                    {showPassword[password.id] ? password.password : '••••••••'}
                  </span>
                  <button
                    onClick={() => togglePasswordVisibility(password.id)}
                    className="text-gray-500 hover:text-gray-600 p-1"
                  >
                    {showPassword[password.id] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => copyToClipboard(password.password)}
                    className="text-gray-500 hover:text-gray-600 p-1"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Strength
                  </span>
                  <span className={`text-sm font-medium text-${strengthColor}`}>
                    {strengthLabel}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-${strengthColor} transition-all`}
                    style={{ width: `${(strength / 5) * 100}%` }}
                  />
                </div>
              </div>

              {password.website && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Website
                  </span>
                  <a
                    href={password.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-500 hover:text-blue-600"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">Visit</span>
                  </a>
                </div>
              )}

              {password.notes && (
                <div className="mt-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Notes
                  </span>
                  <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                    {password.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};