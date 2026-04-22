import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Moon, Sun, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import NeoButton from '../ui/NeoButton';

const GlobalNavbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="h-20 glass border-t-0 border-x-0 rounded-b-3xl px-8 flex items-center justify-between z-30">
      {/* Search Bar */}
      <div className="relative max-w-md w-full hidden md:block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search for anything..."
          className="w-full bg-slate-100 dark:bg-slate-800/50 border-none rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/20 transition-all text-slate-700 dark:text-slate-200"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <button className="relative p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
        </button>

        {/* User Profile Summary */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{user?.name || 'Guest User'}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role || 'Student'}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center border border-brand-200 dark:border-brand-800 transition-all overflow-hidden group">
            {user?.photo ? (
              <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalNavbar;
