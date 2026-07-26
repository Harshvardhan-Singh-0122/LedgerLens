import { House, ChartColumn, ReceiptText, User } from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="
        fixed
        bottom-0
        left-1/2
        -translate-x-1/2
        w-full
        max-w-md
        h-20
        bg-[#111827]
        border-t
        border-[#232B3B]
        flex
        items-center
        justify-around
        z-40

        md:max-w-full
      "
    >
      {/* // <div className="fixed bottom-0 left-0 right-0 md:hidden" > */}
      <button
        onClick={() => navigate("/")}
        className={`flex flex-col items-center gap-1 ${
          location.pathname === "/" ? "text-violet-500" : "text-gray-500"
        }`}
      >
        <House size={22} />
        <span className="text-xs">Home</span>
      </button>

      <button className="flex flex-col items-center gap-1 text-gray-500">
        <ChartColumn size={22} />
        <span className="text-xs">Analytics</span>
      </button>

      {/* Space for Floating Button */}
      <div className="w-16"></div>

      <button
        onClick={() => navigate("/transactions")}
        className={`flex flex-col items-center gap-1 ${
          location.pathname === "/transactions"
            ? "text-violet-500"
            : "text-gray-500"
        }`}
      >
        <ReceiptText size={22} />
        <span className="text-xs">Transactions</span>
      </button>

      <button className="flex flex-col items-center gap-1 text-gray-500">
        <User size={22} />
        <span className="text-xs">Profile</span>
      </button>
    </div>
  );
};

export default BottomNavigation;
