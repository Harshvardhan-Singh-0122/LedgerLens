import FilterChip from "./FilterChip";
import { useState } from "react";

import {
  TRANSACTION_TYPES,
  TRANSACTION_CATEGORIES,
  SORT_OPTIONS,
} from "../../constants/transaction.constants";

const FilterModal = ({ isOpen,
  onClose,

  type,
  setType,

  category,
  setCategory,

  sortBy,
  setSortBy,

  onApply,
  onReset, }) => {
  if (!isOpen) return null;


  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          bg-[#141C28]
          rounded-t-3xl
          p-6
          border-t
          border-[#232B3B]
        "
      >
        {/* Handle */}
        <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-5" />

        <h2 className="text-white text-2xl font-semibold">Filters</h2>

        {/* Type */}

        <div className="mt-7">
          <h3 className="text-white font-medium mb-3">Type</h3>

          <div className="flex flex-wrap gap-3">
  {TRANSACTION_TYPES.map((item) => (
    <FilterChip
      key={item}
      label={item}
      active={type === item}
      onClick={() => setType(item)}
    />
  ))}
</div>
        </div>

        {/* Category */}

        <div className="mt-7">
          <h3 className="text-white font-medium mb-3">Category</h3>
         <div className="flex flex-wrap gap-3">
  {TRANSACTION_CATEGORIES.map((item) => (
    <FilterChip
      key={item}
      label={item}
      active={category === item}
      onClick={() => setCategory(item)}
    />
  ))}
</div>
        </div>

        {/* Sort */}

        <div className="mt-7">
          <h3 className="text-white font-medium mb-3">Sort By</h3>

          <div className="flex flex-wrap gap-3">
  {SORT_OPTIONS.map((item) => (
    <FilterChip
      key={item}
      label={item}
      active={sortBy === item}
      onClick={() => setSortBy(item)}
    />
  ))}
</div>
        </div>

        {/* Buttons */}

        <div className="flex gap-3 mt-10">
          <button
  onClick={onReset}
  className="
    flex-1
    py-3
    rounded-2xl
    border
    border-[#2A3444]
    text-white
  "
>
  Reset
</button>

          <button
  onClick={onApply}
  className="
    flex-1
    py-3
    rounded-2xl
    bg-violet-600
    text-white
  "
>
  Apply
</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
