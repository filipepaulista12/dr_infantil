// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Storage keys
const TOKEN_KEY = 'dr_infantil_token';
const USER_KEY = 'dr_infantil_user';

// Get stored token
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// Save token
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Remove token
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// Get stored user
export const getUser = (): any | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Save user
export const setUser = (user: any): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// API request helper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erro na requisição');
  }

  return data;
}

// Auth API
export const authAPI = {
  getUser,
  
  register: async (email: string, password: string, name: string) => {
    const data = await apiRequest<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    
    if (data.success && data.data.token) {
      setToken(data.data.token);
      setUser(data.data.user);
    }
    
    return data;
  },

  login: async (email: string, password: string) => {
    const data = await apiRequest<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (data.success && data.data.token) {
      setToken(data.data.token);
      setUser(data.data.user);
    }
    
    return data;
  },

  logout: async () => {
    try {
      await apiRequest<any>('/auth/logout', { method: 'POST' });
    } finally {
      removeToken();
    }
  },

  getProfile: async () => {
    return apiRequest<any>('/auth/me');
  },
};

// Diseases API
export const diseasesAPI = {
  list: async (params?: { category?: string; search?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return apiRequest<any>(`/diseases${query ? `?${query}` : ''}`);
  },

  getBySlug: async (slug: string) => {
    return apiRequest<any>(`/diseases/${slug}`);
  },

  create: async (disease: any) => {
    return apiRequest<any>('/diseases', {
      method: 'POST',
      body: JSON.stringify(disease),
    });
  },

  update: async (slug: string, disease: any) => {
    return apiRequest<any>(`/diseases/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(disease),
    });
  },

  delete: async (slug: string) => {
    return apiRequest<any>(`/diseases/${slug}`, {
      method: 'DELETE',
    });
  },
};

// Posts API
export const postsAPI = {
  list: async (params?: { category?: string; search?: string; limit?: number; offset?: number }) => {
    const query = new URLSearchParams(params as any).toString();
    return apiRequest<any>(`/posts${query ? `?${query}` : ''}`);
  },

  getById: async (id: string) => {
    return apiRequest<any>(`/posts/${id}`);
  },

  create: async (post: any) => {
    return apiRequest<any>('/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  },

  update: async (id: string, post: any) => {
    return apiRequest<any>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
    });
  },

  delete: async (id: string) => {
    return apiRequest<any>(`/posts/${id}`, {
      method: 'DELETE',
    });
  },

  like: async (id: string) => {
    return apiRequest<any>(`/posts/${id}/like`, {
      method: 'POST',
    });
  },
};

// Comments API
export const commentsAPI = {
  list: async (postId: string) => {
    return apiRequest<any>(`/comments?postId=${postId}`);
  },

  create: async (comment: any) => {
    return apiRequest<any>('/comments', {
      method: 'POST',
      body: JSON.stringify(comment),
    });
  },

  update: async (id: string, content: string) => {
    return apiRequest<any>(`/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });
  },

  delete: async (id: string) => {
    return apiRequest<any>(`/comments/${id}`, {
      method: 'DELETE',
    });
  },

  like: async (id: string) => {
    return apiRequest<any>(`/comments/${id}/like`, {
      method: 'POST',
    });
  },
};

// Favorites API
export const favoritesAPI = {
  list: async (type?: string) => {
    return apiRequest<any>(`/favorites${type ? `?type=${type}` : ''}`);
  },

  add: async (item_type: string, item_id: string) => {
    return apiRequest<any>('/favorites', {
      method: 'POST',
      body: JSON.stringify({ item_type, item_id }),
    });
  },

  remove: async (id: string) => {
    return apiRequest<any>(`/favorites/${id}`, {
      method: 'DELETE',
    });
  },

  check: async (itemType: string, itemId: string) => {
    return apiRequest<any>(`/favorites/check/${itemType}/${itemId}`);
  },
};

// Resources API
export const resourcesAPI = {
  list: async (params?: { type?: string; category?: string; search?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return apiRequest<any>(`/resources${query ? `?${query}` : ''}`);
  },

  getById: async (id: string) => {
    return apiRequest<any>(`/resources/${id}`);
  },

  create: async (resource: any) => {
    return apiRequest<any>('/resources', {
      method: 'POST',
      body: JSON.stringify(resource),
    });
  },

  update: async (id: string, resource: any) => {
    return apiRequest<any>(`/resources/${id}`, {
      method: 'PUT',
      body: JSON.stringify(resource),
    });
  },

  delete: async (id: string) => {
    return apiRequest<any>(`/resources/${id}`, {
      method: 'DELETE',
    });
  },

  trackDownload: async (id: string) => {
    return apiRequest<any>(`/resources/${id}/download`, {
      method: 'POST',
    });
  },
};

// Analytics API
export const analyticsAPI = {
  trackEvent: async (event_type: string, event_data?: any, page_path?: string) => {
    return apiRequest<any>('/analytics/event', {
      method: 'POST',
      body: JSON.stringify({ event_type, event_data, page_path }),
    });
  },

  getDashboard: async (startDate?: string, endDate?: string) => {
    const query = new URLSearchParams({ startDate, endDate } as any).toString();
    return apiRequest<any>(`/analytics/dashboard${query ? `?${query}` : ''}`);
  },

  getTimeline: async (days?: number) => {
    return apiRequest<any>(`/analytics/events-timeline${days ? `?days=${days}` : ''}`);
  },

  getUserStats: async (userId: string) => {
    return apiRequest<any>(`/analytics/user/${userId}`);
  },
};

export default {
  auth: authAPI,
  diseases: diseasesAPI,
  posts: postsAPI,
  comments: commentsAPI,
  favorites: favoritesAPI,
  resources: resourcesAPI,
  analytics: analyticsAPI,
};
