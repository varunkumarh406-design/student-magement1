import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '../ui/AnimatedBackground';
import { useLocation } from 'react-router-dom';
import GlobalNavbar from './GlobalNavbar';

const MainLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Pages where we don't want the sidebar/main layout (e.g., Landing, Login, Signup)
  const isAuthPage = ['/', '/login', '/signup'].includes(location.pathname);

  if (isAuthPage) {
    return (
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <main className="relative z-10">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <AnimatedBackground />
      
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div className="flex-1 flex flex-col relative overflow-hidden">
        <GlobalNavbar />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto relative z-10 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-7xl mx-auto w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
