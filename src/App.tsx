import React, { useEffect, useState } from 'react';
import { useStore } from './store/useStore';
import { Auth } from './components/Auth';
import { Header } from './components/Header';
import { SearchAndFilter } from './components/SearchAndFilter';
import { PasswordList } from './components/PasswordList';
import { AddPassword } from './components/AddPassword';
import { Loading } from './components/Loading';

function App() {
  const { isAuthenticated, theme } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {isAuthenticated ? (
        <>
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SearchAndFilter />
            <PasswordList />
            <AddPassword />
          </main>
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;