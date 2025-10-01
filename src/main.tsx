import React from 'react';
import ReactDOM from 'react-dom/client';

console.log('🎯 INÍCIO - main.tsx executando...');
console.log('� Document:', document);
console.log('📍 Body:', document.body);

// Adicionar indicador visual imediato
document.body.style.background = 'linear-gradient(to right, #f093fb 0%, #f5576c 100%)';
document.body.innerHTML += '<div id="debug" style="position: fixed; top: 0; left: 0; background: yellow; color: black; padding: 10px; z-index: 9999; font-size: 14px;">⏳ JavaScript carregando...</div>';

console.log('🔍 Procurando elemento root...');
const rootElement = document.getElementById('root');
console.log('📍 Root element:', rootElement);

if (!rootElement) {
  console.error('❌ ERRO: Elemento root não encontrado!');
  document.body.innerHTML = '<div style="padding: 50px; background: red; color: white; font-size: 24px; text-align: center;"><h1>❌ ERRO</h1><p>Elemento #root não encontrado no HTML!</p></div>';
  throw new Error('Failed to find the root element');
}

console.log('✅ Root encontrado!');
const debugEl = document.getElementById('debug');
if (debugEl) debugEl.textContent = '✅ Root encontrado, criando React...';

console.log('🔧 Criando React root...');
const root = ReactDOM.createRoot(rootElement as HTMLElement);
console.log('✅ React root criado!');

if (debugEl) debugEl.textContent = '🎨 Renderizando React...';

console.log('🎨 Renderizando conteúdo...');
root.render(
  React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      padding: '40px',
      textAlign: 'center'
    }
  }, [
    React.createElement('h1', {
      key: 'title',
      style: { fontSize: '64px', margin: '0 0 20px 0' }
    }, '🎉 REACT FUNCIONANDO! 🎉'),
    React.createElement('p', {
      key: 'message',
      style: { fontSize: '24px', margin: '10px 0' }
    }, 'Se você vê isso, o React está renderizando corretamente!'),
    React.createElement('div', {
      key: 'info',
      style: {
        marginTop: '30px',
        padding: '20px',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '10px',
        fontSize: '18px'
      }
    }, '✅ Tudo funcionando perfeitamente!')
  ])
);

console.log('✅ SUCESSO - Renderização completa!');
if (debugEl) debugEl.remove();