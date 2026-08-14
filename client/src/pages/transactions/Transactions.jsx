// import { useEffect, useState } from "react";

// import BottomNavigation from "../../components/dashboard/BottomNavigation";
// import FloatingButton from "../../components/dashboard/FloatingButton";

// import SearchBar from "../../components/transactions/SearchBar";
// import TransactionGroup from "../../components/transactions/TransactionGroup";
// import FilterModal from "../../components/transactions/FilterModal";

// import { getAllTransactions } from "../../services/transaction.service";

// import {
//   formatDate,
//   groupTransactionsByDate,
// } from "../../utils/transaction.utils";

// const Transactions = () => {

//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [showFilters, setShowFilters] = useState(false);

//   const [type, setType] = useState("All");

// const [category, setCategory] = useState("");

// const [sortBy, setSortBy] = useState("Newest");

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     try {
//       const response = await getAllTransactions({
//   type,
//   category,
//   sortBy,
// });

//       setTransactions(response.transactions);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const applyFilters = () => {
//   fetchTransactions();

//   setShowFilters(false);
// };

// const resetFilters = () => {
//   setType("All");
//   setCategory("");
//   setSortBy("Newest");

//   fetchTransactions();

//   setShowFilters(false);
// };

//   const groupedTransactions = groupTransactionsByDate(transactions);

//   return (
//     <div className="min-h-screen bg-[#0B1120]">
//       <div className="relative max-w-[1440px] mx-auto">
//         {/* Background Glow */}
//         <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-[140px]" />

//         <main className="relative z-10 pb-28">
//           <div className="px-4 md:px-6 lg:px-8 pt-5">
//             <h1 className="text-white text-[28px] font-bold">Transactions</h1>

//             <p className="text-gray-400 text-sm mt-2">
//               Manage all your income and expenses
//             </p>

//             <SearchBar
//               search={search}
//               setSearch={setSearch}
//               onFilterClick={() => setShowFilters(true)}
//             />

//             <div className="mt-6 space-y-5">
//               {Object.entries(groupedTransactions).map(([date, items]) => (
//                 <TransactionGroup
//                   key={date}
//                   date={date}
//                   items={items}
//                   formatDate={formatDate}
//                 />
//               ))}

//               {loading && (
//                 <p className="text-center text-gray-400">Loading...</p>
//               )}
//             </div>
//           </div>
//         </main>

// <FilterModal
//   isOpen={showFilters}
//   onClose={() => setShowFilters(false)}

//   type={type}
//   setType={setType}

//   category={category}
//   setCategory={setCategory}

//   sortBy={sortBy}
//   setSortBy={setSortBy}

//   onApply={applyFilters}
//   onReset={resetFilters}
// />
//         {!showFilters && <FloatingButton />}

//         <BottomNavigation />
//       </div>
//     </div>
//   );
// };

// export default Transactions;

//-----------------For updating the Transaction from Month wise button----------------

import { useContext, useEffect, useState } from "react";

import BottomNavigation from "../../components/dashboard/BottomNavigation";
import FloatingButton from "../../components/dashboard/FloatingButton";

import SearchBar from "../../components/transactions/SearchBar";
import TransactionGroup from "../../components/transactions/TransactionGroup";
import FilterModal from "../../components/transactions/FilterModal";
import DeleteMonthButton from "../../components/transactions/DeleteMonthButton";

import { DashboardFilterContext } from "../../context/DashboardFilterContext";
import { TransactionModalContext } from "../../context/TransactionModalContext";
import { AppRefreshContext } from "../../context/AppRefreshContext";

import { getAllTransactions } from "../../services/transaction.service";

import {
  formatDate,
  groupTransactionsByDate,
} from "../../utils/transaction.utils";

const Transactions = () => {
  const { selectedMonth, setSelectedMonth, selectedYear, setSelectedYear } =
    useContext(DashboardFilterContext);

  const {
    showTransactionModal,
    setShowTransactionModal,
    setSelectedTransaction,
  } = useContext(TransactionModalContext);

  const { refreshKey } = useContext(AppRefreshContext);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [type, setType] = useState("All");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("Newest");

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, selectedYear, type, category, sortBy, refreshKey]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const response = await getAllTransactions({
        month: selectedMonth,
        year: selectedYear,

        type,
        category,
        sortBy,
      });

      setTransactions(response.transactions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setShowFilters(false);
  };

  const resetFilters = () => {
    setType("All");
    setCategory("");
    setSortBy("Newest");
    setShowFilters(false);
  };

  const groupedTransactions = groupTransactionsByDate(transactions);

  const openAddTransaction = () => {
    setSelectedTransaction(null);
    setShowTransactionModal(true);
  };

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <div className="relative max-w-[1440px] mx-auto">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-[140px]" />

        <main className="relative z-10 pb-28">
          {/* <main className="relative z-[100] pb-28"> */}
          <div className="px-4 md:px-6 lg:px-8 pt-5">
            <h1 className="text-white text-[28px] font-bold">Transactions</h1>

            <p className="text-gray-400 text-sm mt-2">
              Manage all your income and expenses
            </p>

            <SearchBar
              search={search}
              setSearch={setSearch}
              onFilterClick={() => setShowFilters(true)}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              setSelectedMonth={setSelectedMonth}
              setSelectedYear={setSelectedYear}
            />

            <DeleteMonthButton
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
            />

            <div className="mt-6 space-y-5">
              {Object.entries(groupedTransactions).map(([date, items]) => (
                <TransactionGroup
                  key={date}
                  date={date}
                  items={items}
                  formatDate={formatDate}
                />
              ))}

              {loading && (
                <p className="text-center text-gray-400">Loading...</p>
              )}
            </div>
          </div>
        </main>

        <FilterModal
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          type={type}
          setType={setType}
          category={category}
          setCategory={setCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onApply={applyFilters}
          onReset={resetFilters}
        />

        {!showFilters && !showTransactionModal && (
          <FloatingButton onClick={openAddTransaction} />
        )}

        <BottomNavigation />
      </div>
    </div>
  );
};

export default Transactions;
