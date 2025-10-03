import React, { useState } from 'react';
import { authAPI } from '../services/api';

const LoginTestPage: React.FC = () => {
  const [email, setEmail] = useState('admin@drinfantil.com.br');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      console.log('Tentando login com:', { email, password });
      const response = await authAPI.login(email, password);
      console.log('Resposta do login:', response);
      setResult(response);
    } catch (err: any) {
      console.error('Erro no login:', err);
      setError(err.message || 'Erro no login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      setResult(null);
      alert('Logout realizado com sucesso!');
    } catch (err: any) {
      setError(err.message || 'Erro no logout');
    }
  };

  const checkProfile = async () => {
    try {
      const profile = await authAPI.getProfile();
      setResult({ profile });
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar perfil');
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '0 auto', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      <h1>Teste de Login - DR Infantil</h1>
      
      <form onSubmit={handleLogin} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '4px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>Senha:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '4px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Fazendo login...' : 'Fazer Login'}
        </button>
      </form>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleLogout}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Logout
        </button>
        
        <button 
          onClick={checkProfile}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Verificar Perfil
        </button>
      </div>

      {error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          marginBottom: '10px'
        }}>
          <strong>Erro:</strong> {error}
        </div>
      )}

      {result && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#d4edda', 
          color: '#155724', 
          border: '1px solid #c3e6cb',
          borderRadius: '4px'
        }}>
          <strong>Resultado:</strong>
          <pre style={{ marginTop: '10px', fontSize: '12px' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
        <h3>Credenciais de Teste:</h3>
        <ul>
          <li><strong>Admin:</strong> admin@drinfantil.com.br / admin123</li>
          <li><strong>Moderador:</strong> moderador@drinfantil.com.br / mod123</li>
          <li><strong>Usuário:</strong> teste@exemplo.com / teste123</li>
          <li><strong>Pediatra:</strong> pediatra@drinfantil.com.br / pediatra123</li>
        </ul>
      </div>
    </div>
  );
};

export default LoginTestPage;