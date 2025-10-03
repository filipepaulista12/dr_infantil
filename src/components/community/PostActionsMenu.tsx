import React from 'react';
import { Edit3, Trash2, MoreVertical, Clock } from 'lucide-react';

interface PostActionsMenuProps {
  isAuthor: boolean;
  isEdited?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

const PostActionsMenu: React.FC<PostActionsMenuProps> = ({
  isAuthor,
  isEdited = false,
  onEdit,
  onDelete,
  className = ''
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Fechar menu ao clicar fora
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAuthor) {
    return isEdited ? (
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <Clock className="w-3 h-3" />
        editado
      </div>
    ) : null;
  }

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
        title="Opções do post"
      >
        <MoreVertical className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          {/* Edit Option */}
          <button
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900"
          >
            <Edit3 className="w-4 h-4" />
            <span className="text-sm">Editar publicação</span>
          </button>

          {/* Delete Option */}
          <button
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-red-50 transition-colors text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Excluir publicação</span>
          </button>

          {/* Edited Indicator */}
          {isEdited && (
            <div className="px-4 py-2 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>Publicação editada</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostActionsMenu;