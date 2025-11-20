import { createContext, useContext, useState, ReactNode } from 'react';

type View = 'home' | 'browse' | 'tailor-profile' | 'customer-dashboard' | 'tailor-dashboard' | 'chat' | 'checkout';

interface AppContextType {
  currentView: View;
  setCurrentView: (view: View) => void;
  selectedTailorId: string | null;
  setSelectedTailorId: (id: string | null) => void;
  selectedDesignId: string | null;
  setSelectedDesignId: (id: string | null) => void;
  userType: 'customer' | 'tailor';
  setUserType: (type: 'customer' | 'tailor') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedTailorId, setSelectedTailorId] = useState<string | null>(null);
  const [selectedDesignId, setSelectedDesignId] = useState<string | null>(null);
  const [userType, setUserType] = useState<'customer' | 'tailor'>('customer');

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedTailorId,
        setSelectedTailorId,
        selectedDesignId,
        setSelectedDesignId,
        userType,
        setUserType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
