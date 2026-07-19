const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-5 py-8 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl"></div>

      {/* Auth Card */}
      <div className="relative w-full max-w-md bg-[#111827]/90 border border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;