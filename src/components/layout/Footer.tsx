import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 via-pink-700 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white p-2 rounded-full">
                <Heart className="h-6 w-6 text-pink-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold">DR Infantil</h3>
                <p className="text-sm opacity-90">Mundo das Diferenças</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              Uma plataforma educativa dedicada a ajudar crianças e famílias a compreenderem as doenças raras 
              de forma carinhosa, respeitosa e inclusiva. Transformando conhecimento em amor e aceitação.
            </p>
          </div>

          {/* Links Úteis */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-white transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="#recursos" className="hover:text-white transition-colors">
                  Recursos Educativos
                </a>
              </li>
              <li>
                <a href="#apoio" className="hover:text-white transition-colors">
                  Centro de Apoio
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contato@drinfantil.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/80 text-sm mb-4 md:mb-0">
              © 2024 DR Infantil - Mundo das Diferenças. Feito com 💖 para crianças especiais.
            </p>
            
            <div className="flex space-x-6 text-sm text-white/80">
              <a href="#privacidade" className="hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#termos" className="hover:text-white transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>

        {/* Mensagem especial */}
        <div className="mt-8 text-center">
          <div className="bg-white/10 rounded-2xl p-6 max-w-2xl mx-auto">
            <h5 className="text-lg font-semibold mb-2">💝 Mensagem Especial</h5>
            <p className="text-white/90 text-sm leading-relaxed">
              "Cada criança é única e especial do seu jeito. Nossa missão é celebrar essas diferenças 
              e construir um mundo mais inclusivo e amoroso para todos."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;