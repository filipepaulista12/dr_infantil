import { LogOut, User, Settings, Heart, MessageSquare, BookOpen } from 'lucide-react';

interface UserMenuProps {
  user: any;
  onLogout: () => void;
}

export default function UserMenu({ user, onLogout }: UserMenuProps) {
  const getRoleBadge = (role: string) => {
    const badges: Record<string, { text: string; className: string }> = {
      admin: { text: '👑 Admin', className: 'bg-red-100 text-red-800' },
      moderator: { text: '🛡️ Moderador', className: 'bg-blue-100 text-blue-800' },
      user: { text: '👤 Usuário', className: 'bg-green-100 text-green-800' }
    };
    return badges[role] || badges.user;
  };

  const badge = getRoleBadge(user.role);

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="w-8 h-8" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg truncate">{user.name}</h3>
            <p className="text-white/80 text-sm truncate">{user.email}</p>
          </div>
        </div>
        <span className={`${badge.className} px-3 py-1 rounded-full text-xs font-bold`}>
          {badge.text}
        </span>
      </div>

      {/* Menu Items */}
      <div className="p-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left">
          <User className="w-5 h-5 text-purple-500" />
          <div>
            <p className="font-semibold text-gray-800">Meu Perfil</p>
            <p className="text-xs text-gray-500">Ver e editar informações</p>
          </div>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pink-50 transition-colors text-left">
          <Heart className="w-5 h-5 text-pink-500" />
          <div>
            <p className="font-semibold text-gray-800">Meus Favoritos</p>
            <p className="text-xs text-gray-500">Conteúdos salvos</p>
          </div>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors text-left">
          <MessageSquare className="w-5 h-5 text-blue-500" />
          <div>
            <p className="font-semibold text-gray-800">Minhas Publicações</p>
            <p className="text-xs text-gray-500">Posts e comentários</p>
          </div>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-50 transition-colors text-left">
          <BookOpen className="w-5 h-5 text-green-500" />
          <div>
            <p className="font-semibold text-gray-800">Histórico</p>
            <p className="text-xs text-gray-500">Conteúdos visitados</p>
          </div>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
          <Settings className="w-5 h-5 text-gray-500" />
          <div>
            <p className="font-semibold text-gray-800">Configurações</p>
            <p className="text-xs text-gray-500">Preferências e privacidade</p>
          </div>
        </button>

        <div className="my-2 h-px bg-gray-200"></div>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-left text-red-600"
        >
          <LogOut className="w-5 h-5" />
          <div>
            <p className="font-semibold">Sair</p>
            <p className="text-xs text-red-500">Fazer logout da conta</p>
          </div>
        </button>
      </div>
    </div>
  );
}
