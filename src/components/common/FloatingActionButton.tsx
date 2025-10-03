import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FloatingActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  label: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  color?: 'purple' | 'pink' | 'blue' | 'green';
  badge?: number;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon: Icon,
  onClick,
  label,
  position = 'bottom-right',
  color = 'purple',
  badge,
}) => {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const colorClasses = {
    purple: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/50',
    pink: 'bg-pink-600 hover:bg-pink-700 text-white shadow-pink-500/50',
    blue: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/50',
    green: 'bg-green-600 hover:bg-green-700 text-white shadow-green-500/50',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`
        fixed z-40 p-4 rounded-full shadow-2xl
        transition-all duration-300
        group
        ${positionClasses[position]}
        ${colorClasses[color]}
      `}
      aria-label={label}
      title={label}
    >
      <Icon className="w-6 h-6" />

      {/* Badge de notificação */}
      {badge !== undefined && badge > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900"
        >
          {badge > 99 ? '99+' : badge}
        </motion.div>
      )}

      {/* Tooltip no hover */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-gray-900 dark:bg-gray-700 text-white text-sm px-3 py-2 rounded-lg shadow-lg">
          {label}
          <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-900 dark:border-l-gray-700" />
        </div>
      </div>

      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-current" />
    </motion.button>
  );
};

export default FloatingActionButton;
