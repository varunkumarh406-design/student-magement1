import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  isLoading = false,
  className = '',
  ...props 
}) => {
  // Determine variant class based on our index.css custom classes
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    icon: 'btn-icon hover:bg-slate-100',
  }[variant];

  return (
    <button
      type={type}
      className={`flex items-center justify-center gap-2 ${variantClass} ${className} transition-all duration-200`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && children}
    </button>
  );
};

export default Button;
