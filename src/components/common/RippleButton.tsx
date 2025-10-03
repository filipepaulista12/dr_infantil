import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  rippleColor?: string;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  rippleColor,
  className = '',
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    const newRipple: Ripple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remover ripple após animação
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    // Chamar onClick original
    if (onClick) {
      onClick(e);
    }
  };

  const variantClasses = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-500 hover:bg-purple-50 dark:hover:bg-gray-700',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const defaultRippleColor = rippleColor || (variant === 'primary' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(124, 58, 237, 0.3)');

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`
        relative overflow-hidden rounded-lg font-semibold
        transition-all duration-200 transform hover:scale-105
        focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {/* Conteúdo do botão */}
      <span className="relative z-10">{children}</span>

      {/* Ripples */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{
            width: 0,
            height: 0,
            opacity: 0.6,
          }}
          animate={{
            width: ripple.size,
            height: ripple.size,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            borderRadius: '50%',
            backgroundColor: defaultRippleColor,
            pointerEvents: 'none',
          }}
        />
      ))}
    </button>
  );
};

export default RippleButton;
