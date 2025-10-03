import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import FeedbackForm from './FeedbackForm';

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Feedback Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transform transition-all z-40 flex items-center gap-2 group"
        aria-label="Abrir formulário de feedback"
        title="Envie seu feedback!"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden group-hover:inline-block font-semibold whitespace-nowrap pr-2">
          Feedback
        </span>
      </button>

      {/* Feedback Form Modal */}
      <FeedbackForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
