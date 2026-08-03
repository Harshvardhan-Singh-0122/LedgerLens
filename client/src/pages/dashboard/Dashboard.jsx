// import { useEffect, useState } from "react";

// import Header from "../../components/dashboard/Header";
// import SummaryCards from "../../components/dashboard/SummaryCards";
// import MonthlyChart from "../../components/dashboard/MonthlyChart";
// import CategoryChart from "../../components/dashboard/CategoryChart";
// import RecentTransactions from "../../components/dashboard/RecentTransactions";
// import BottomNavigation from "../../components/dashboard/BottomNavigation";
// import FloatingButton from "../../components/dashboard/FloatingButton";

// import { getDashboard } from "../../services/dashboard.service";

// const Dashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const fetchDashboard = async () => {
//     try {
//       const response = await getDashboard();

//       setDashboardData(response.data);

//       console.log(response.data.monthlyStats);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0B1120]">
//       <div className="relative max-w-[1440px] mx-auto">
//         <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-[140px]" />

//         <main className="relative z-10 pb-28">
//           <Header />

//           <SummaryCards summary={dashboardData?.summary} />

//           <div className="block lg:hidden">
//             <MonthlyChart
//               monthlyTrend={dashboardData?.monthlyTrend}
//               monthlyStats={dashboardData?.monthlyStats}
//             />
//             <CategoryChart
//               categoryDistribution={dashboardData?.categoryDistribution}
//             />
//           </div>

//           <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6 lg:px-8 lg:mt-6">
//             <div className="col-span-8">
//               <MonthlyChart
//                 monthlyTrend={dashboardData?.monthlyTrend}
//                 monthlyStats={dashboardData?.monthlyStats}
//               />
//             </div>

//             <div className="col-span-4">
//               <CategoryChart
//                 categoryDistribution={dashboardData?.categoryDistribution}
//               />
//             </div>
//           </div>

//           <RecentTransactions
//             transactions={dashboardData?.recentTransactions}
//           />
//         </main>

//         <FloatingButton />

//         <BottomNavigation />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

//-----------------For updating the dashboard from Month wise button----------------

// import { useContext, useEffect, useState } from "react";

// import Header from "../../components/dashboard/Header";
// import SummaryCards from "../../components/dashboard/SummaryCards";
// import MonthlyChart from "../../components/dashboard/MonthlyChart";
// import CategoryChart from "../../components/dashboard/CategoryChart";
// import RecentTransactions from "../../components/dashboard/RecentTransactions";
// import BottomNavigation from "../../components/dashboard/BottomNavigation";
// import FloatingButton from "../../components/dashboard/FloatingButton";

// import { DashboardFilterContext } from "../../context/DashboardFilterContext";

// import { getDashboard } from "../../services/dashboard.service";

// const Dashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const {
//     selectedMonth,
//     setSelectedMonth,
//     selectedYear,
//     setSelectedYear,
//   } = useContext(DashboardFilterContext);

//   useEffect(() => {
//     fetchDashboard();
//   }, [selectedMonth, selectedYear]);

//   const fetchDashboard = async () => {
//     try {
//       setLoading(true);

//       const response = await getDashboard(
//         selectedMonth,
//         selectedYear
//       );

//       setDashboardData(response.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0B1120]">
//       <div className="relative max-w-[1440px] mx-auto">
//         <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-[140px]" />

//         <main className="relative z-10 pb-28">
//           <Header />

//           <SummaryCards summary={dashboardData?.summary} />

//           {dashboardData && (
//             <div className="block lg:hidden">
//               <MonthlyChart
//                 monthlyTrend={dashboardData?.monthlyTrend}
//                 monthlyStats={dashboardData?.monthlyStats}
//                 loading={loading}
//                 selectedMonth={selectedMonth}
//                 selectedYear={selectedYear}
//                 setSelectedMonth={setSelectedMonth}
//                 setSelectedYear={setSelectedYear}
//               />

//               <CategoryChart
//                 categoryDistribution={dashboardData?.categoryDistribution}
//               />
//             </div>
//           )}

//           {dashboardData && (
//             <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6 lg:px-8 lg:mt-6">
//               <div className="col-span-8">
//                 <MonthlyChart
//                   monthlyTrend={dashboardData?.monthlyTrend}
//                   monthlyStats={dashboardData?.monthlyStats}
//                   loading={loading}
//                   selectedMonth={selectedMonth}
//                   selectedYear={selectedYear}
//                   setSelectedMonth={setSelectedMonth}
//                   setSelectedYear={setSelectedYear}
//                 />
//               </div>

//               <div className="col-span-4">
//                 <CategoryChart
//                   categoryDistribution={dashboardData?.categoryDistribution}
//                 />
//               </div>
//             </div>
//           )}

//           <RecentTransactions
//             transactions={dashboardData?.recentTransactions}
//           />
//         </main>

//         <FloatingButton />

//         <BottomNavigation />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

//------------------------To add the feature of Upload CSV-----------------
import { useContext, useEffect, useState } from "react";

import Header from "../../components/dashboard/Header";
import SummaryCards from "../../components/dashboard/SummaryCards";
import MonthlyChart from "../../components/dashboard/MonthlyChart";
import CategoryChart from "../../components/dashboard/CategoryChart";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import BottomNavigation from "../../components/dashboard/BottomNavigation";
import FloatingButton from "../../components/dashboard/FloatingButton";
import CsvUploadModal from "../../components/dashboard/CsvUploadModal";
import CsvPreviewModal from "../../components/csv/CsvPreviewModal";

import { DashboardFilterContext } from "../../context/DashboardFilterContext";
import { TransactionModalContext } from "../../context/TransactionModalContext";
import { AppRefreshContext } from "../../context/AppRefreshContext";

import { getDashboard } from "../../services/dashboard.service";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const { selectedMonth, setSelectedMonth, selectedYear, setSelectedYear } =
    useContext(DashboardFilterContext);

  const { setShowTransactionModal, setSelectedTransaction } = useContext(
    TransactionModalContext,
  );

  const { refreshKey } = useContext(AppRefreshContext);

  useEffect(() => {
  fetchDashboard();
}, [
  selectedMonth,
  selectedYear,
  refreshKey,
]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await getDashboard(selectedMonth, selectedYear);

      setDashboardData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openAddTransaction = () => {
    setSelectedTransaction(null);
    setShowTransactionModal(true);
  };

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <div className="relative max-w-[1440px] mx-auto">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-[140px]" />

        <main className="relative z-10 pb-28">
          <Header onUploadClick={() => setIsUploadModalOpen(true)} />

          <SummaryCards summary={dashboardData?.summary} />

          {dashboardData && (
            <div className="block lg:hidden">
              <MonthlyChart
                monthlyTrend={dashboardData?.monthlyTrend}
                monthlyStats={dashboardData?.monthlyStats}
                loading={loading}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                setSelectedMonth={setSelectedMonth}
                setSelectedYear={setSelectedYear}
              />

              <CategoryChart
                categoryDistribution={dashboardData?.categoryDistribution}
              />
            </div>
          )}

          {dashboardData && (
            <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6 lg:px-8 lg:mt-6">
              <div className="col-span-8">
                <MonthlyChart
                  monthlyTrend={dashboardData?.monthlyTrend}
                  monthlyStats={dashboardData?.monthlyStats}
                  loading={loading}
                  selectedMonth={selectedMonth}
                  selectedYear={selectedYear}
                  setSelectedMonth={setSelectedMonth}
                  setSelectedYear={setSelectedYear}
                />
              </div>

              <div className="col-span-4">
                <CategoryChart
                  categoryDistribution={dashboardData?.categoryDistribution}
                />
              </div>
            </div>
          )}

          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
          />
        </main>

        <FloatingButton onClick={openAddTransaction} />

        <BottomNavigation />

        <CsvUploadModal
          open={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUploadSuccess={(data) => {
            setPreviewData(data);
            setIsPreviewOpen(true);
          }}
        />

        <CsvPreviewModal
          open={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          data={previewData}
          onImportSuccess={() => {
            fetchDashboard();
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
