import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useFavorites } from '../src/hooks/useFavorites';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Wrapper component para testar o hook
function TestComponent() {
  const { favorites, addToFavorites, removeFromFavorites, isFavorite, favoritesCount } = useFavorites();
  
  return (
    <div>
      <div data-testid="favorites-count">{favoritesCount}</div>
      <div data-testid="favorites-list">
        {favorites.map(fav => (
          <div key={fav.id} data-testid={`favorite-${fav.id}`}>
            {fav.title}
          </div>
        ))}
      </div>
      <button 
        data-testid="add-favorite"
        onClick={() => addToFavorites({
          id: 'test-1',
          type: 'disease',
          title: 'Test Disease',
          description: 'Test description'
        })}
      >
        Add Favorite
      </button>
      <button 
        data-testid="remove-favorite"
        onClick={() => removeFromFavorites('test-1')}
      >
        Remove Favorite
      </button>
      <div data-testid="is-favorite">
        {isFavorite('test-1') ? 'true' : 'false'}
      </div>
    </div>
  );
}

describe('useFavorites Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('should initialize with empty favorites', () => {
    render(<TestComponent />);
    
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('false');
  });

  it('should add favorite item', async () => {
    render(<TestComponent />);
    
    fireEvent.click(screen.getByTestId('add-favorite'));
    
    await waitFor(() => {
      expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');
      expect(screen.getByTestId('is-favorite')).toHaveTextContent('true');
      expect(screen.getByTestId('favorite-test-1')).toHaveTextContent('Test Disease');
    });
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'dr_infantil_favorites',
      expect.stringContaining('Test Disease')
    );
  });

  it('should remove favorite item', async () => {
    // Primeiro adiciona um favorito
    localStorageMock.getItem.mockReturnValue(JSON.stringify([
      {
        id: 'test-1',
        type: 'disease',
        title: 'Test Disease',
        description: 'Test description',
        addedAt: new Date().toISOString()
      }
    ]));

    render(<TestComponent />);
    
    await waitFor(() => {
      expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');
    });

    fireEvent.click(screen.getByTestId('remove-favorite'));
    
    await waitFor(() => {
      expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');
      expect(screen.getByTestId('is-favorite')).toHaveTextContent('false');
    });
  });

  it('should load favorites from localStorage on init', () => {
    const mockFavorites = [
      {
        id: 'stored-1',
        type: 'disease',
        title: 'Stored Disease',
        description: 'Stored description',
        addedAt: new Date().toISOString()
      }
    ];
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockFavorites));
    
    render(<TestComponent />);
    
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');
    expect(screen.getByTestId('favorite-stored-1')).toHaveTextContent('Stored Disease');
  });

  it('should handle localStorage errors gracefully', () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });
    
    // Deve renderizar sem erros mesmo com localStorage falhando
    expect(() => render(<TestComponent />)).not.toThrow();
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');
  });
});