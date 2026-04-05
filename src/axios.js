import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8083',
  timeout: 60000,
  withCredentials: true
});

// ✅ Intercepteur request — ajout automatique du token JWT
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  console.log(`🌐 ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

// ✅ Intercepteur response — gestion auto du token expiré (401)
axiosInstance.interceptors.response.use(
  response => {
    console.log('✅ Réponse:', response.status);
    return response;
  },
  async error => {
    console.error('❌ Erreur:', error.response?.status, error.message);

    // Si token expiré → essayer de le rafraîchir
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (refreshToken) {
        try {
          const res = await axios.post('http://localhost:8083/api/token/refresh/', {
            refresh: refreshToken
          });
          
          // Sauvegarder le nouveau token
          localStorage.setItem('access_token', res.data.access);
          
          // Relancer la requête originale avec le nouveau token
          error.config.headers.Authorization = `Bearer ${res.data.access}`;
          return axiosInstance(error.config);
          
        } catch (refreshError) {
          // Refresh token expiré → déconnecter l'utilisateur
          console.error('🔴 Session expirée, déconnexion...');
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/';  // ← rediriger vers login
        }
      } else {
        // Pas de refresh token → rediriger vers login
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);


const axiosApi = axios.create({
  baseURL: 'http://localhost:8000/',  // Gateway
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosApi.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { axiosInstance ,axiosApi};

export default axiosInstance;