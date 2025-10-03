import { useEffect } from 'react';

/**
 * Hook para smooth scroll ao topo quando a página muda
 */
export const usePageTransition = (currentPage: string) => {
  useEffect(() => {
    // Scroll suave ao topo quando a página muda
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Anunciar mudança de página para screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Navegou para: ${currentPage}`;
    document.body.appendChild(announcement);

    // Remover anúncio após 1 segundo
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, [currentPage]);
};

/**
 * Hook para adicionar meta tags dinâmicas baseadas na página
 */
export const usePageMeta = (title?: string, description?: string) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} - DR Infantil`;
    }

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    return () => {
      // Reset ao desmontar
      document.title = 'DR Infantil - Mundo das Diferenças';
    };
  }, [title, description]);
};

/**
 * Hook para preload de imagens críticas
 */
export const useImagePreload = (images: string[]) => {
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);
};

/**
 * Hook para detectar direção de scroll
 */
export const useScrollDirection = () => {
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      // Disparar evento customizado
      window.dispatchEvent(new CustomEvent('scrolldirection', { detail: direction }));
      
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
};
