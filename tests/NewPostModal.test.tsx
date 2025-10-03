import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewPostModal from '../src/components/community/NewPostModal';

const mockOnSubmit = vi.fn();
const mockOnClose = vi.fn();

describe('NewPostModal Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    isLoading: false
  };

  it('should render modal when open', () => {
    render(<NewPostModal {...defaultProps} />);
    
    expect(screen.getByText('Nova Publicação')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite um título chamativo...')).toBeInTheDocument();
  });

  it('should not render when closed', () => {
    render(<NewPostModal {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByText('Nova Publicação')).not.toBeInTheDocument();
  });

  it('should validate title length', async () => {
    render(<NewPostModal {...defaultProps} />);
    
    const titleInput = screen.getByPlaceholderText('Digite um título chamativo...');
    const submitButton = screen.getByText('Publicar');
    
    // Título muito curto
    fireEvent.change(titleInput, { target: { value: 'abc' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Título deve ter pelo menos 5 caracteres')).toBeInTheDocument();
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should validate content length', async () => {
    render(<NewPostModal {...defaultProps} />);
    
    const titleInput = screen.getByPlaceholderText('Digite um título chamativo...');
    const contentTextarea = screen.getByPlaceholderText('Compartilhe sua experiência, tire dúvidas ou ofereça ajuda...');
    const submitButton = screen.getByText('Publicar');
    
    fireEvent.change(titleInput, { target: { value: 'Título válido' } });
    fireEvent.change(contentTextarea, { target: { value: 'Muito curto' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Conteúdo deve ter pelo menos 20 caracteres')).toBeInTheDocument();
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should require category selection', async () => {
    render(<NewPostModal {...defaultProps} />);
    
    const titleInput = screen.getByPlaceholderText('Digite um título chamativo...');
    const contentTextarea = screen.getByPlaceholderText('Compartilhe sua experiência, tire dúvidas ou ofereça ajuda...');
    const submitButton = screen.getByText('Publicar');
    
    fireEvent.change(titleInput, { target: { value: 'Título válido com mais de 5 caracteres' } });
    fireEvent.change(contentTextarea, { target: { value: 'Conteúdo válido com mais de 20 caracteres para passar na validação' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Categoria é obrigatória')).toBeInTheDocument();
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should submit valid form', async () => {
    render(<NewPostModal {...defaultProps} />);
    
    const titleInput = screen.getByPlaceholderText('Digite um título chamativo...');
    const contentTextarea = screen.getByPlaceholderText('Compartilhe sua experiência, tire dúvidas ou ofereça ajuda...');
    const categorySelect = screen.getByDisplayValue('Selecione uma categoria...');
    const tagsInput = screen.getByPlaceholderText('pediatria, saúde infantil, desenvolvimento...');
    const submitButton = screen.getByText('Publicar');
    
    fireEvent.change(titleInput, { target: { value: 'Título válido com mais de 5 caracteres' } });
    fireEvent.change(contentTextarea, { target: { value: 'Conteúdo válido com mais de 20 caracteres para passar na validação' } });
    fireEvent.change(categorySelect, { target: { value: 'pergunta' } });
    fireEvent.change(tagsInput, { target: { value: 'pediatria, saúde' } });
    
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Título válido com mais de 5 caracteres',
        content: 'Conteúdo válido com mais de 20 caracteres para passar na validação',
        category: 'pergunta',
        tags: ['pediatria', 'saúde']
      });
    });
  });

  it('should show loading state', () => {
    render(<NewPostModal {...defaultProps} isLoading={true} />);
    
    expect(screen.getByText('Publicando...')).toBeInTheDocument();
    expect(screen.getByText('Publicar')).toBeDisabled();
  });

  it('should close modal when close button clicked', () => {
    render(<NewPostModal {...defaultProps} />);
    
    const closeButton = screen.getByRole('button', { name: /fechar/i });
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should show character count for title', () => {
    render(<NewPostModal {...defaultProps} />);
    
    const titleInput = screen.getByPlaceholderText('Digite um título chamativo...');
    
    fireEvent.change(titleInput, { target: { value: 'Teste' } });
    
    expect(screen.getByText('5/200')).toBeInTheDocument();
  });

  it('should show character count for content', () => {
    render(<NewPostModal {...defaultProps} />);
    
    const contentTextarea = screen.getByPlaceholderText('Compartilhe sua experiência, tire dúvidas ou ofereça ajuda...');
    
    fireEvent.change(contentTextarea, { target: { value: 'Conteúdo de teste' } });
    
    expect(screen.getByText('17/5000')).toBeInTheDocument();
  });
});