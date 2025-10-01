import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function FavoriteButton({ 
  isFavorite, 
  onToggle, 
  size = 'md',
  className = '' 
}: FavoriteButtonProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const buttonSizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`
        ${buttonSizeClasses[size]}
        rounded-full transition-all duration-300 transform hover:scale-110
        ${isFavorite 
          ? 'text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100' 
          : 'text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50'
        }
        ${className}
      `}
      title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Heart 
        className={`${sizeClasses[size]} transition-all ${
          isFavorite ? 'fill-current' : ''
        }`} 
      />
    </button>
  );
}