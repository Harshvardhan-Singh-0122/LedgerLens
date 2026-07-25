import Header from "../../components/dashboard/Header";
import SummaryCards from "../../components/dashboard/SummaryCards";
import MonthlyChart from "../../components/dashboard/MonthlyChart";
import CategoryChart from "../../components/dashboard/CategoryChart";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import BottomNavigation from "../../components/dashboard/BottomNavigation";
import FloatingButton from "../../components/dashboard/FloatingButton";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#0B1120]">
      <div className="max-w-[1600px] mx-auto">
        <div className="min-h-screen w-full max-w-[390px] mx-auto bg-[#0D111B] relative overflow-hidden md:max-w-[900px] lg:max-w-[1280px]">

          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-[140px]"></div>

          <main className="relative z-10 pb-32">
            <Header />

            <SummaryCards />

            <MonthlyChart />

            <CategoryChart />

            <RecentTransactions />
          </main>

          <FloatingButton />

          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;