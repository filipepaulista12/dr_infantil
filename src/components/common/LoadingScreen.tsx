const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center">
      <div className="text-center relative">
        {/* Main Loading Message */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Preparando algo especial...
          </h1>
          <p className="text-xl md:text-2xl text-yellow-200 font-body">
            Carregando conteúdo educativo sobre doenças raras 🌟
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center items-center space-x-2">
          <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>

      {/* Decorative Stars */}
      <div className="absolute top-20 left-20 text-yellow-200 text-2xl animate-pulse">✨</div>
      <div className="absolute top-32 right-32 text-yellow-200 text-xl animate-pulse" style={{ animationDelay: '1s' }}>⭐</div>
      <div className="absolute bottom-32 left-32 text-yellow-200 text-xl animate-pulse" style={{ animationDelay: '2s' }}>🌟</div>
      <div className="absolute bottom-20 right-20 text-yellow-200 text-2xl animate-pulse" style={{ animationDelay: '3s' }}>✨</div>
    </div>
  );
};

export default LoadingScreen;