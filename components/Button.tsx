import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'large';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  let baseStyles = "transition-all duration-300 font-nav uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed";
  let variantStyles = '';
  
  switch(variant) {
    case 'primary':
      variantStyles = 'glass-yellow text-charcoal-950 hover:bg-mustard-400 font-bold';
      break;
    case 'secondary':
      variantStyles = 'glass-button text-cream-100 hover:text-white hover:bg-white/15';
      break;
    case 'ghost':
      variantStyles = 'bg-transparent text-sage-400 hover:text-mustard-400';
      break;
    case 'large':
      variantStyles = 'btn-large';
      break;
  }

  const sizeStyles = variant === 'large' ? '' : {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }[size];

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
