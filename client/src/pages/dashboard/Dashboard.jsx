import { useEffect, useState } from "react";

import Header from "../../components/dashboard/Header";
import SummaryCards from "../../components/dashboard/SummaryCards";
import MonthlyChart from "../../components/dashboard/MonthlyChart";
import CategoryChart from "../../components/dashboard/CategoryChart";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import BottomNavigation from "../../components/dashboard/BottomNavigation";
import FloatingButton from "../../components/dashboard/FloatingButton";

import { getDashboard } from "../../services/dashboard.service";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboard();

      setDashboardData(response.data);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <div className="relative max-w-[1440px] mx-auto">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-[140px]" />

        <main className="relative z-10 pb-28">
          <Header />

          <SummaryCards summary={dashboardData?.summary} />

          <div className="block lg:hidden">
            <MonthlyChart
              monthlyTrend={dashboardData?.monthlyTrend}
              monthlyStats={dashboardData?.monthlyStats}
            />
            <CategoryChart
              categoryDistribution={dashboardData?.categoryDistribution}
            />
          </div>

          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6 lg:px-8 lg:mt-6">
            <div className="col-span-8">
              <MonthlyChart
                monthlyTrend={dashboardData?.monthlyTrend}
                monthlyStats={dashboardData?.monthlyStats}
              />
            </div>

            <div className="col-span-4">
              <CategoryChart
                categoryDistribution={dashboardData?.categoryDistribution}
              />
            </div>
          </div>

          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
          />
        </main>

        <FloatingButton />

        <BottomNavigation />
      </div>
    </div>
  );
};

export default Dashboard;

// import Header from "../../components/dashboard/Header";
// import SummaryCards from "../../components/dashboard/SummaryCards";
// import MonthlyChart from "../../components/dashboard/MonthlyChart";
// import CategoryChart from "../../components/dashboard/CategoryChart";
// import RecentTransactions from "../../components/dashboard/RecentTransactions";
// import BottomNavigation from "../../components/dashboard/BottomNavigation";
// import FloatingButton from "../../components/dashboard/FloatingButton";

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-[#0B1120]">

//       <div className="relative max-w-[1440px] mx-auto">

//         {/* Background Glow */}
//         <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-[140px]" />

//         <main className="relative z-10 pb-28">

//           {/* Header */}
//           <Header />

//           {/* Summary Cards */}
//           <SummaryCards />

//           {/* Mobile Layout */}
//           <div className="block lg:hidden">

//             <MonthlyChart />

//             <CategoryChart />

//           </div>

//           {/* Desktop Layout */}
//           <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6 lg:px-8 lg:mt-6">

//             {/* Monthly Chart */}
//             <div className="col-span-8">
//               <MonthlyChart />
//             </div>

//             {/* Category */}
//             <div className="col-span-4">
//               <CategoryChart />
//             </div>

//           </div>

//           {/* Transactions */}
//           <RecentTransactions />

//         </main>

//         <FloatingButton />

//         <BottomNavigation />

//       </div>

//     </div>
//   );
// };

// export default Dashboard;

// import Header from "../../components/dashboard/Header";
// import SummaryCards from "../../components/dashboard/SummaryCards";
// import MonthlyChart from "../../components/dashboard/MonthlyChart";
// import CategoryChart from "../../components/dashboard/CategoryChart";
// import RecentTransactions from "../../components/dashboard/RecentTransactions";
// import BottomNavigation from "../../components/dashboard/BottomNavigation";
// import FloatingButton from "../../components/dashboard/FloatingButton";

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-[#0B1120]">
//       <div className="max-w-[1600px] mx-auto">
//         <div className="min-h-screen w-full max-w-[390px] mx-auto bg-[#0D111B] relative overflow-hidden md:max-w-[900px] lg:max-w-[1280px]">

//           <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-[140px]"></div>

//           <main className="relative z-10 pb-32">
//             <Header />

//             <SummaryCards />

//             <MonthlyChart />

//             <CategoryChart />

//             <RecentTransactions />
//           </main>

//           <FloatingButton />

//           <BottomNavigation />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
