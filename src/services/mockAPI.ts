import { mockUsers, mockPosts, mockComments, mockDiseases, simulateNetworkDelay } from './mockData';
import { mockFavoritesAPI, mockResourcesAPI } from './mockAPIsupplement';

// Função para verificar se deve usar mock (quando backend não estiver disponível)
const shouldUseMock = () => {
  return import.meta.env.VITE_USE_MOCK === 'true' || import.meta.env.MODE === 'development';
};

// Mock API para autenticação
export const mockAuthAPI = {
  getUser() {
    const user = localStorage.getItem('dr_infantil_user');
    return user ? JSON.parse(user) : null;
  },

  async login(email: string, password: string) {
    await simulateNetworkDelay();
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Credenciais inválidas');
    }
    
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    };
    
    // Simular salvamento no localStorage
    localStorage.setItem('dr_infantil_token', 'mock-jwt-token');
    localStorage.setItem('dr_infantil_user', JSON.stringify(userData));
    
    return {
      token: 'mock-jwt-token',
      user: userData
    };
  },

  async register(userData: { name: string; email: string; password: string }) {
    await simulateNetworkDelay();
    
    // Verificar se email já existe
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }
    
    const newUser = {
      id: String(mockUsers.length + 1),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'user',
      avatar: '👤',
      created_at: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    
    const responseUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar
    };
    
    localStorage.setItem('dr_infantil_token', 'mock-jwt-token');
    localStorage.setItem('dr_infantil_user', JSON.stringify(responseUser));
    
    return {
      token: 'mock-jwt-token',
      user: responseUser
    };
  },

  logout() {
    localStorage.removeItem('dr_infantil_token');
    localStorage.removeItem('dr_infantil_user');
  }
};

// Mock API para posts
export const mockPostsAPI = {
  async list(filters: any = {}) {
    await simulateNetworkDelay();
    
    let filteredPosts = [...mockPosts];
    
    if (filters.category && filters.category !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === filters.category);
    }
    
    // Ordenar por data (mais recentes primeiro)
    filteredPosts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    return {
      data: filteredPosts,
      total: filteredPosts.length
    };
  },

  async create(postData: any) {
    await simulateNetworkDelay();
    
    const user = mockAuthAPI.getUser();
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    const newPost = {
      id: String(mockPosts.length + 1),
      title: postData.title,
      content: postData.content,
      category: postData.category,
      author_id: user.id,
      author_name: user.name,
      author_avatar: user.avatar,
      likes_count: 0,
      comments_count: 0,
      views_count: 0,
      is_pinned: false,
      is_edited: false,
      created_at: new Date().toISOString(),
      tags: postData.tags || []
    };
    
    mockPosts.unshift(newPost); // Adicionar no início da lista
    
    return { data: newPost };
  },

  async update(postId: string, postData: any) {
    await simulateNetworkDelay();
    
    const user = mockAuthAPI.getUser();
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    const postIndex = mockPosts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      throw new Error('Post não encontrado');
    }
    
    const post = mockPosts[postIndex];
    if (post.author_id !== user.id && user.role !== 'admin') {
      throw new Error('Sem permissão para editar este post');
    }
    
    mockPosts[postIndex] = {
      ...post,
      title: postData.title,
      content: postData.content,
      category: postData.category,
      tags: postData.tags || [],
      is_edited: true
    };
    
    return { data: mockPosts[postIndex] };
  },

  async delete(postId: string) {
    await simulateNetworkDelay();
    
    const user = mockAuthAPI.getUser();
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    const postIndex = mockPosts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      throw new Error('Post não encontrado');
    }
    
    const post = mockPosts[postIndex];
    if (post.author_id !== user.id && user.role !== 'admin') {
      throw new Error('Sem permissão para deletar este post');
    }
    
    mockPosts.splice(postIndex, 1);
    
    return { success: true };
  },

  async like(postId: string) {
    await simulateNetworkDelay();
    
    const user = mockAuthAPI.getUser();
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    const post = mockPosts.find(p => p.id === postId);
    if (!post) {
      throw new Error('Post não encontrado');
    }
    
    post.likes_count += 1;
    
    return { data: post };
  }
};

// Mock API para comentários
export const mockCommentsAPI = {
  async list(postId: string) {
    await simulateNetworkDelay();
    
    const comments = mockComments.filter(c => c.post_id === postId);
    
    return {
      data: comments,
      total: comments.length
    };
  },

  async create(commentData: { post_id: string; content: string }) {
    await simulateNetworkDelay();
    
    const user = mockAuthAPI.getUser();
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    const newComment = {
      id: String(mockComments.length + 1),
      post_id: commentData.post_id,
      content: commentData.content,
      author_id: user.id,
      author_name: user.name,
      author_avatar: user.avatar,
      likes_count: 0,
      created_at: new Date().toISOString(),
      is_edited: false
    };
    
    mockComments.push(newComment);
    
    // Atualizar contador de comentários do post
    const post = mockPosts.find(p => p.id === commentData.post_id);
    if (post) {
      post.comments_count += 1;
    }
    
    return { data: newComment };
  }
};

// Mock API para doenças
export const mockDiseasesAPI = {
  async list(filters: any = {}) {
    await simulateNetworkDelay();
    
    let filteredDiseases = [...mockDiseases];
    
    if (filters.category && filters.category !== 'all') {
      filteredDiseases = filteredDiseases.filter(disease => disease.category === filters.category);
    }
    
    return {
      data: filteredDiseases,
      total: filteredDiseases.length
    };
  },

  async getBySlug(slug: string) {
    await simulateNetworkDelay();
    
    const disease = mockDiseases.find(d => d.slug === slug);
    if (!disease) {
      throw new Error('Doença não encontrada');
    }
    
    // Incrementar views
    disease.views_count += 1;
    
    return disease;
  }
};

// Mock API para analytics
export const mockAnalyticsAPI = {
  async trackEvent(event: string, data: any, page: string) {
    await simulateNetworkDelay(100, 300);
    
    console.log(`[Analytics Mock] Event: ${event}`, { data, page });
    
    return { success: true };
  }
};

// Função para verificar se o backend está disponível
export const checkBackendConnection = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch('http://localhost:3001/health', {
      method: 'GET',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Wrapper para APIs que usa mock quando backend não está disponível
export const createAdaptiveAPI = (realAPI: any, mockAPI: any) => {
  return new Proxy(realAPI, {
    get(target, prop) {
      return async (...args: any[]) => {
        if (shouldUseMock()) {
          console.log(`[Mock API] Using mock for ${String(prop)}`);
          return mockAPI[prop](...args);
        }
        
        try {
          return await target[prop](...args);
        } catch (error) {
          console.warn(`[API Fallback] Real API failed for ${String(prop)}, using mock:`, error);
          return mockAPI[prop](...args);
        }
      };
    }
  });
};

// Exportar APIs mock adicionais
export { mockFavoritesAPI, mockResourcesAPI };