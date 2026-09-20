/**
 * Servicio centralizado de llamadas HTTP (Sesión 08)
 * Conecta el Frontend con la API REST de Flask y Supabase
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Función base para peticiones HTTP con inyección automática de Bearer Token
 */
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.error || data.message || `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (err) {
    console.error(`[API Error] ${config.method || 'GET'} ${url}:`, err.message);
    throw err;
  }
}

// Servicios de Autenticación
export const authService = {
  login: async (credentials) => {
    return await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (userData) => {
    return await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  getMe: async () => {
    return await apiRequest('/auth/me');
  },
};

// Servicios de Tareas
export const taskService = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.user_id) query.append('user_id', params.user_id);
    if (params.estado && params.estado !== 'todas') query.append('estado', params.estado);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    return await apiRequest(`/tasks${queryString}`);
  },

  getById: async (id) => {
    return await apiRequest(`/tasks/${id}`);
  },

  create: async (taskData) => {
    return await apiRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },

  update: async (id, taskData) => {
    return await apiRequest(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  },

  delete: async (id) => {
    return await apiRequest(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};

export default apiRequest;
