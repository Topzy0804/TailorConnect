import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { BrowseTailors } from './components/BrowseTailors';
import { TailorProfile } from './components/TailorProfile';
import { CustomerDashboard } from './components/CustomerDashboard';
import { TailorDashboard } from './components/TailorDashboard';
import { Chat } from './components/Chat';
import { Checkout } from './components/Checkout';

function AppContent() {
  const { currentView, userType } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'browse':
        return <BrowseTailors />;
      case 'tailor-profile':
        return <TailorProfile />;
      case 'customer-dashboard':
        return <CustomerDashboard />;
      case 'tailor-dashboard':
        return <TailorDashboard />;
      case 'chat':
        return <Chat />;
      case 'checkout':
        return <Checkout />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {renderView()}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
