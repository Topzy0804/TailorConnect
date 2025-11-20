import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedTailorId, setSelectedTailorId] = useState(null);
  const [selectedDesignId, setSelectedDesignId] = useState(null);
  const [userType, setUserType] = useState('customer');

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
