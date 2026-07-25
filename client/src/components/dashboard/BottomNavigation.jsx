import {
  House,
  ChartColumn,
  ReceiptText,
  User,
} from "lucide-react";

const BottomNavigation = () => {
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
      <button className="flex flex-col items-center gap-1 text-violet-500">
        <House size={22} />
        <span className="text-xs">Home</span>
      </button>

      <button className="flex flex-col items-center gap-1 text-gray-500">
        <ChartColumn size={22} />
        <span className="text-xs">Analytics</span>
      </button>

      {/* Space for Floating Button */}
      <div className="w-16"></div>

      <button className="flex flex-col items-center gap-1 text-gray-500">
        <ReceiptText size={22} />
        <span className="text-xs">History</span>
      </button>

      <button className="flex flex-col items-center gap-1 text-gray-500">
        <User size={22} />
        <span className="text-xs">Profile</span>
      </button>
    </div>
  );
};

export default BottomNavigation;