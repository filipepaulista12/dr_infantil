import { useState, useEffect } from 'react';

interface FavoriteItem {
  id: string;
  type: 'disease' | 'resource' | 'story';
  title: string;
  description: string;
  image?: string;
  addedAt: string;
  category?: string;
  url?: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    try {
      const storedFavorites = localStorage.getItem('dr_infantil_favorites');
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };

  const saveFavorites = (newFavorites: FavoriteItem[]) => {
    try {
      localStorage.setItem('dr_infantil_favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  };

  const addToFavorites = (item: Omit<FavoriteItem, 'addedAt'>) => {
    const newItem: FavoriteItem = {
      ...item,
      addedAt: new Date().toISOString()
    };
    
    const updatedFavorites = [...favorites, newItem];
    saveFavorites(updatedFavorites);
  };

  const removeFromFavorites = (id: string) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    saveFavorites(updatedFavorites);
  };

  const isFavorite = (id: string) => {
    return favorites.some(fav => fav.id === id);
  };

  const toggleFavorite = (item: Omit<FavoriteItem, 'addedAt'>) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('dr_infantil_favorites');
  };

  const getFavoritesByType = (type: 'disease' | 'resource' | 'story') => {
    return favorites.filter(fav => fav.type === type);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearAllFavorites,
    getFavoritesByType,
    favoritesCount: favorites.length
  };
};

export type { FavoriteItem };