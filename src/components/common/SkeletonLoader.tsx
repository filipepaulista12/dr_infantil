import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'circle' | 'rectangle';
  count?: number;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  variant = 'card', 
  count = 1,
  className = '' 
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%]';

  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className={`${baseClasses} rounded-xl p-6 ${className}`}>
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className={`${baseClasses} w-12 h-12 rounded-full`} />
                <div className="flex-1 space-y-2">
                  <div className={`${baseClasses} h-4 w-3/4 rounded`} />
                  <div className={`${baseClasses} h-3 w-1/2 rounded`} />
                </div>
              </div>
              {/* Content */}
              <div className="space-y-2">
                <div className={`${baseClasses} h-3 w-full rounded`} />
                <div className={`${baseClasses} h-3 w-5/6 rounded`} />
                <div className={`${baseClasses} h-3 w-4/6 rounded`} />
              </div>
              {/* Footer */}
              <div className="flex gap-2">
                <div className={`${baseClasses} h-8 w-24 rounded-lg`} />
                <div className={`${baseClasses} h-8 w-24 rounded-lg`} />
              </div>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className={`space-y-2 ${className}`}>
            <div className={`${baseClasses} h-4 w-full rounded`} />
            <div className={`${baseClasses} h-4 w-5/6 rounded`} />
            <div className={`${baseClasses} h-4 w-4/6 rounded`} />
          </div>
        );

      case 'circle':
        return (
          <div className={`${baseClasses} w-16 h-16 rounded-full ${className}`} />
        );

      case 'rectangle':
        return (
          <div className={`${baseClasses} w-full h-48 rounded-xl ${className}`} />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          {renderSkeleton()}
        </motion.div>
      ))}
    </>
  );
};

export default SkeletonLoader;

// Skeleton específico para grid de doenças
export const DiseaseGridSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <SkeletonLoader key={i} variant="card" />
    ))}
  </div>
);

// Skeleton específico para detalhes de doença
export const DiseaseDetailSkeleton: React.FC = () => (
  <div className="space-y-6">
    <SkeletonLoader variant="rectangle" className="h-64" />
    <SkeletonLoader variant="text" />
    <SkeletonLoader variant="text" />
    <div className="grid grid-cols-2 gap-4">
      <SkeletonLoader variant="card" />
      <SkeletonLoader variant="card" />
    </div>
  </div>
);

// Skeleton para lista de vídeos
export const VideoListSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="space-y-3">
        <SkeletonLoader variant="rectangle" className="h-48" />
        <SkeletonLoader variant="text" />
      </div>
    ))}
  </div>
);
