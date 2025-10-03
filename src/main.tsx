import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext'

console.log('🚀 main.tsx carregado');

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('❌ Elemento root não encontrado');
  throw new Error('Failed to find the root element');
}

console.log('✅ Elemento root encontrado, renderizando App...');

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)

console.log('✅ App renderizado no DOM');
