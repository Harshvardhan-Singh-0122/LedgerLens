// import { Search, SlidersHorizontal } from "lucide-react";
// import FilterButton from "./FilterButton";

// const SearchBar = ({ search, setSearch, onFilterClick }) => {
//   return (
//     <div className="mt-6 flex items-center gap-3">
//       <div className="flex-1 relative">
//         <Search
//           size={18}
//           className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
//         />

//         <input
//           type="text"
//           placeholder="Search transactions..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="
//             w-full
//             bg-[#141C28]
//             border
//             border-[#232B3B]
//             rounded-2xl
//             pl-11
//             pr-4
//             py-3
//             text-white
//             placeholder:text-gray-500
//             outline-none
//           "
//         />
//       </div>

//       <FilterButton onClick={onFilterClick} />
//     </div>
//   );
// };

// export default SearchBar;


//----------For adding the Month button in the Transaction page----------------
import { Search } from "lucide-react";

import FilterButton from "./FilterButton";
import MonthSelector from "../dashboard/MonthSelector";

const SearchBar = ({
  search,
  setSearch,
  onFilterClick,

  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
}) => {
  return (
    <>
      {/* Search */}
      <div className="mt-6">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              bg-[#141C28]
              border
              border-[#232B3B]
              rounded-2xl
              pl-11
              pr-4
              py-3
              text-white
              placeholder:text-gray-500
              outline-none
            "
          />
        </div>
      </div>

      {/* Filter + Month */}
      <div className="mt-3 flex items-center justify-between gap-3">

        <FilterButton onClick={onFilterClick} />

        <MonthSelector
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
        />

      </div>
    </>
  );
};

export default SearchBar;