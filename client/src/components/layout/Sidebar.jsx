import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCircle, 
  Calendar, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap,
  Bell,
  Search
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/students', icon: Users },
    { name: 'Attendance', path: '/attendance', icon: Calendar },
    { name: 'Profile', path: '/profile', icon: UserCircle },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <motion.div
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="relative h-screen flex flex-col glass border-r-0 rounded-r-3xl z-40 transition-all duration-300"
    >
      {/* Brand Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-brand-600 p-2 rounded-2xl shadow-lg shadow-brand-500/40">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white"
            >
              EduSync
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300",
                isActive 
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-500/30" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive ? "text-white" : "group-hover:text-brand-500")} />
              
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium"
                >
                  {item.name}
                </motion.span>
              )}

              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute right-2 w-1.5 h-6 bg-white/40 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer / Toggle */}
      <div className="p-4 mt-auto border-t border-slate-200/50 dark:border-slate-800/50">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
