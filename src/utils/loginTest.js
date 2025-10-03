// Teste rápido do sistema de login
console.log('=== TESTE DE LOGIN DO DR INFANTIL ===');

// Importar a API
import { authAPI } from '../services/api.js';

// Credenciais de teste
const testCredentials = [
  { email: 'admin@drinfantil.com.br', password: 'admin123', role: 'admin' },
  { email: 'moderador@drinfantil.com.br', password: 'mod123', role: 'moderator' },
  { email: 'teste@exemplo.com', password: 'teste123', role: 'user' },
  { email: 'pediatra@drinfantil.com.br', password: 'pediatra123', role: 'pediatra' }
];

// Função de teste
async function testLogin() {
  console.log('Iniciando testes de login...');
  
  for (const cred of testCredentials) {
    try {
      console.log(`\n--- Testando ${cred.email} ---`);
      
      // Fazer logout primeiro
      await authAPI.logout();
      
      // Tentar login
      const result = await authAPI.login(cred.email, cred.password);
      
      console.log('✅ Login bem-sucedido:', result);
      
      // Verificar perfil
      try {
        const profile = await authAPI.getProfile();
        console.log('👤 Perfil obtido:', profile);
      } catch (profileError) {
        console.log('⚠️ Erro ao obter perfil:', profileError.message);
      }
      
    } catch (error) {
      console.log('❌ Erro no login:', error.message);
    }
  }
  
  console.log('\n=== FIM DOS TESTES ===');
}

// Executar testes quando a página carregar
if (typeof window !== 'undefined') {
  window.testDrInfantilLogin = testLogin;
  console.log('Execute: window.testDrInfantilLogin() para testar o sistema');
}

export { testLogin };