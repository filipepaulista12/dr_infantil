import { useState } from 'react';
import { X, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { authAPI } from '../../services/api';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onLoginSuccess: (user: any) => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToRegister, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(email, password);
      console.log('✅ Login bem-sucedido:', response.user);
      onLoginSuccess(response.user);
      onClose();
      // Resetar form
      setEmail('');
      setPassword('');
    } catch (err: any) {
      console.error('❌ Erro no login:', err);
      setError(err.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (testEmail: string, testPassword: string) => {
    setEmail(testEmail);
    setPassword(testPassword);
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(testEmail, testPassword);
      console.log('✅ Login rápido bem-sucedido:', response.user);
      onLoginSuccess(response.user);
      onClose();
      setEmail('');
      setPassword('');
    } catch (err: any) {
      console.error('❌ Erro no login rápido:', err);
      setError(err.response?.data?.message || 'Erro ao fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-3xl font-bold mb-2">👋 Bem-vindo de volta!</h2>
          <p className="text-white/90">Entre para continuar sua jornada</p>
        </div>

        {/* Form */}
        <div className="p-6">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                📧 Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                🔒 Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  🚀 Entrar
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500 font-medium">ou</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Quick Login (Test Accounts) */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700 text-center mb-3">
              🧪 Contas de Teste (Desenvolvimento)
            </p>
            
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@drinfantil.com.br', 'admin123')}
              disabled={loading}
              className="w-full bg-red-50 border-2 border-red-200 text-red-700 py-2 px-4 rounded-xl font-semibold hover:bg-red-100 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
            >
              👑 Admin (todos os poderes)
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('moderador@drinfantil.com.br', 'mod123')}
              disabled={loading}
              className="w-full bg-blue-50 border-2 border-blue-200 text-blue-700 py-2 px-4 rounded-xl font-semibold hover:bg-blue-100 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
            >
              🛡️ Moderador (editar conteúdo)
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('teste@exemplo.com', 'teste123')}
              disabled={loading}
              className="w-full bg-green-50 border-2 border-green-200 text-green-700 py-2 px-4 rounded-xl font-semibold hover:bg-green-100 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
            >
              👤 Usuário Normal (explorar)
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Ainda não tem uma conta?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-purple-600 font-bold hover:text-purple-700 transition-colors"
              >
                Cadastre-se grátis
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
