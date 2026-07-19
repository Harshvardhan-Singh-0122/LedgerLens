const Loader = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-violet-500/20 rounded-full"></div>

        <div className="absolute inset-0 w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <h2 className="text-white text-lg font-medium mt-6">
        Loading...
      </h2>

      <p className="text-gray-400 text-sm mt-2">
        Please wait a moment
      </p>
    </div>
  );
};

export default Loader;