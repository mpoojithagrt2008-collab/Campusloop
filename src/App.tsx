import { useState } from 'react';
import { AppProvider, useApp } from './store';
import { Navigation, type Page } from './components/Navigation';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { MyRentals } from './pages/MyRentals';
import { MyItems } from './pages/MyItems';
import { Profile } from './pages/Profile';

function AppContent() {
  const { user } = useApp();
  const [page, setPage] = useState<Page>('home');

  if (!user) return <Login />;

  const navigate = (p: Page) => setPage(p);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation current={page} navigate={navigate} />
      <main className="pb-20 md:pb-0">
        {page === 'home' && <Home navigate={navigate} />}
        {page === 'explore' && <Explore />}
        {page === 'rentals' && <MyRentals navigate={navigate} />}
        {page === 'items' && <MyItems />}
        {page === 'profile' && <Profile />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
