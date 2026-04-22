import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NeoButton = ({ 
  children, 
  className, 
  variant = 'flat', // flat, convex, concave, pressed
  onClick,
  disabled = false,
  isLoading = false,
  ...props 
}) => {
  const variantClasses = {
    flat: 'neo-flat',
    convex: 'neo-convex',
    concave: 'neo-concave',
    pressed: 'neo-pressed',
    primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-premium',
    secondary: 'glass text-slate-700 dark:text-slate-200',
    ghost: 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98, y: 0 }}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        "relative flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {isLoading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
        />
      )}
      <span className={clsx(isLoading && "opacity-0")}>
        {children}
      </span>
      
      {/* Premium Glow Effect on Hover */}
      {!disabled && variant !== 'ghost' && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      )}
    </motion.button>
  );
};

export default NeoButton;
