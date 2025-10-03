// APIs adicionais para o sistema mock

// Simular delay de rede (500ms a 1.5s)
const simulateNetworkDelay = (min = 500, max = 1500) => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Helper para obter sessão armazenada
const getStoredSession = () => {
  const token = localStorage.getItem('dr_infantil_token');
  const userStr = localStorage.getItem('dr_infantil_user');
  const user = userStr ? JSON.parse(userStr) : null;
  
  return { token, user };
};

// Mock Favorites API
export const mockFavoritesAPI = {
  list: async (type?: string) => {
    await simulateNetworkDelay();
    const userSession = getStoredSession();
    if (!userSession.user) {
      throw new Error('Não autenticado');
    }

    // Simular favoritos do usuário
    const favorites = [
      {
        id: '1',
        item_type: 'disease',
        item_id: '1',
        user_id: userSession.user.id,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        item_type: 'post',
        item_id: '1',
        user_id: userSession.user.id,
        created_at: new Date().toISOString()
      }
    ];

    const filtered = type ? favorites.filter(f => f.item_type === type) : favorites;
    return { success: true, data: filtered };
  },

  add: async (item_type: string, item_id: string) => {
    await simulateNetworkDelay();
    const userSession = getStoredSession();
    if (!userSession.user) {
      throw new Error('Não autenticado');
    }

    const favorite = {
      id: Date.now().toString(),
      item_type,
      item_id,
      user_id: userSession.user.id,
      created_at: new Date().toISOString()
    };

    return { 
      success: true, 
      data: favorite,
      message: 'Item adicionado aos favoritos!'
    };
  },

  remove: async (id: string) => {
    await simulateNetworkDelay();
    const userSession = getStoredSession();
    if (!userSession.user) {
      throw new Error('Não autenticado');
    }

    console.log(`Removing favorite with id: ${id}`);
    
    return { 
      success: true, 
      message: 'Item removido dos favoritos!'
    };
  },

  check: async (itemType: string, itemId: string) => {
    await simulateNetworkDelay();
    const userSession = getStoredSession();
    if (!userSession.user) {
      return { success: true, data: { isFavorited: false } };
    }

    // Simular verificação de favorito (algumas combinações são favoritas)
    const isFavorited = (itemType === 'disease' && itemId === '1') || 
                       (itemType === 'post' && itemId === '1');
    
    return { 
      success: true, 
      data: { isFavorited }
    };
  }
};

// Mock Resources API
export const mockResourcesAPI = {
  list: async (params?: { type?: string; category?: string; search?: string }) => {
    await simulateNetworkDelay();
    
    const resources = [
      {
        id: '1',
        title: 'Cartilha de Primeiros Socorros Infantis',
        description: 'Guia completo para situações de emergência com crianças',
        type: 'pdf',
        category: 'emergencia',
        url: '/resources/primeiros-socorros.pdf',
        size: '2.5 MB',
        downloads: 1250,
        created_at: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        title: 'Vídeo: Desenvolvimento Motor Infantil',
        description: 'Marcos do desenvolvimento motor de 0 a 2 anos',
        type: 'video',
        category: 'desenvolvimento',
        url: '/resources/desenvolvimento-motor.mp4',
        size: '15.2 MB',
        downloads: 875,
        created_at: '2024-01-10T14:30:00Z'
      },
      {
        id: '3',
        title: 'Checklist de Vacinação',
        description: 'Calendário completo de vacinação infantil',
        type: 'pdf',
        category: 'prevencao',
        url: '/resources/calendario-vacinas.pdf',
        size: '1.8 MB',
        downloads: 2100,
        created_at: '2024-01-05T09:15:00Z'
      }
    ];

    let filtered = resources;
    if (params?.type) {
      filtered = filtered.filter(r => r.type === params.type);
    }
    if (params?.category) {
      filtered = filtered.filter(r => r.category === params.category);
    }
    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(search) ||
        r.description.toLowerCase().includes(search)
      );
    }

    return { success: true, data: filtered };
  },

  getById: async (id: string) => {
    await simulateNetworkDelay();
    
    const resource = {
      id,
      title: 'Cartilha de Primeiros Socorros Infantis',
      description: 'Guia completo para situações de emergência com crianças',
      type: 'pdf',
      category: 'emergencia',
      url: '/resources/primeiros-socorros.pdf',
      size: '2.5 MB',
      downloads: 1250,
      created_at: '2024-01-15T10:00:00Z',
      content: 'Conteúdo detalhado do recurso...'
    };

    return { success: true, data: resource };
  },

  create: async (resource: any) => {
    await simulateNetworkDelay();
    const userSession = getStoredSession();
    if (!userSession.user || userSession.user.role !== 'admin') {
      throw new Error('Permissão negada');
    }

    const newResource = {
      id: Date.now().toString(),
      ...resource,
      downloads: 0,
      created_at: new Date().toISOString()
    };

    return { 
      success: true, 
      data: newResource,
      message: 'Recurso criado com sucesso!'
    };
  },

  update: async (id: string, resource: any) => {
    await simulateNetworkDelay();
    const userSession = getStoredSession();
    if (!userSession.user || userSession.user.role !== 'admin') {
      throw new Error('Permissão negada');
    }

    const updatedResource = {
      id,
      ...resource,
      updated_at: new Date().toISOString()
    };

    return { 
      success: true, 
      data: updatedResource,
      message: 'Recurso atualizado com sucesso!'
    };
  },

  delete: async (id: string) => {
    await simulateNetworkDelay();
    const userSession = getStoredSession();
    if (!userSession.user || userSession.user.role !== 'admin') {
      throw new Error('Permissão negada');
    }

    console.log(`Deleting resource with id: ${id}`);

    return { 
      success: true, 
      message: 'Recurso excluído com sucesso!'
    };
  },

  trackDownload: async (id: string) => {
    await simulateNetworkDelay();
    
    console.log(`Tracking download for resource id: ${id}`);
    
    return { 
      success: true, 
      message: 'Download registrado!'
    };
  }
};