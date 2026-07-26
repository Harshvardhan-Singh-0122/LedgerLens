const FilterChip = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4
        py-2
        rounded-full
        text-sm
        font-medium
        transition

        ${
          active
            ? "bg-violet-600 text-white"
            : "bg-[#202A38] text-gray-300 hover:bg-[#283344]"
        }
      `}
    >
      {label}
    </button>
  );
};

export default FilterChip;