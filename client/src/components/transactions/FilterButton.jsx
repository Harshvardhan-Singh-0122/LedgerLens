import { SlidersHorizontal } from "lucide-react";

const FilterButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        w-12
        h-12
        rounded-2xl
        bg-[#141C28]
        border
        border-[#232B3B]
        flex
        items-center
        justify-center
        text-white
        hover:border-violet-500
        transition
      "
    >
      <SlidersHorizontal size={20} />
    </button>
  );
};

export default FilterButton;