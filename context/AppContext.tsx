
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Portfolio, SiteSettings, AppState } from '../types';
import { INITIAL_PORTFOLIOS, INITIAL_SETTINGS } from '../constants';

interface AppContextType extends AppState {
  addPortfolio: (portfolio: Portfolio) => void;
  updatePortfolio: (portfolio: Portfolio) => void;
  deletePortfolio: (id: string) => void;
  updateSettings: (settings: SiteSettings) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>(() => {
    const saved = localStorage.getItem('kkoumi_portfolios');
    return saved ? JSON.parse(saved) : INITIAL_PORTFOLIOS;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('kkoumi_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('kkoumi_portfolios', JSON.stringify(portfolios));
  }, [portfolios]);

  useEffect(() => {
    localStorage.setItem('kkoumi_settings', JSON.stringify(settings));
  }, [settings]);

  const addPortfolio = (portfolio: Portfolio) => {
    setPortfolios(prev => [portfolio, ...prev]);
  };

  const updatePortfolio = (updated: Portfolio) => {
    setPortfolios(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const deletePortfolio = (id: string) => {
    setPortfolios(prev => prev.filter(p => p.id !== id));
  };

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
  };

  return (
    <AppContext.Provider value={{ portfolios, settings, addPortfolio, updatePortfolio, deletePortfolio, updateSettings }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
