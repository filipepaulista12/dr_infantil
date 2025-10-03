import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../stores/useAppStore';

interface Breadcrumb {
  label: string;
  page?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbNavProps {
  items: Breadcrumb[];
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items }) => {
  const { setCurrentPage } = useAppStore();

  const allItems: Breadcrumb[] = [
    { label: 'Início', page: 'home', icon: <Home className="w-4 h-4" /> },
    ...items,
  ];

  return (
    <nav aria-label="Navegação estrutural" className="mb-6">
      <ol className="flex items-center gap-2 flex-wrap text-sm">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isClickable = !isLast && item.page;

          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-600" aria-hidden="true" />
              )}

              {isClickable ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => item.page && setCurrentPage(item.page)}
                  className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline transition-colors"
                  aria-label={`Ir para ${item.label}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.button>
              ) : (
                <span
                  className={`flex items-center gap-1.5 ${
                    isLast
                      ? 'text-gray-900 dark:text-gray-100 font-semibold'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNav;
