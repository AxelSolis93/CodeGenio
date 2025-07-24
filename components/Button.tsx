
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'light-on-dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out';
  
  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'font-semibold bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-500';
      break;
    case 'secondary':
      variantStyles = 'font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400';
      break;
    case 'ghost':
      variantStyles = 'font-semibold bg-transparent text-pink-500 hover:bg-pink-100 focus:ring-pink-500';
      break;
    case 'light-on-dark':
      variantStyles = 'font-bold bg-white/90 text-blue-600 hover:bg-white focus:ring-blue-500';
      break;
  }

  let sizeStyles = '';
  switch (size) {
    case 'sm':
      sizeStyles = 'px-3 py-1.5 text-sm';
      break;
    case 'md':
      sizeStyles = 'px-4 py-2 text-base';
      break;
    case 'lg':
      sizeStyles = 'px-6 py-3 text-lg';
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
