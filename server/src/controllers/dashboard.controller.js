import {
  getDashboardSummary,
  getMonthlyExpenseTrend,
  getCategoryDistribution,
  getRecentTransactions,
} from "../services/dashboard.service.js";

export const getDashboardController = async (req, res) => {
  try {
    const userId = req.user._id;

    const [summary, monthlyTrend, categoryDistribution, recentTransactions] =
      await Promise.all([
        getDashboardSummary(userId),
        getMonthlyExpenseTrend(userId),
        getCategoryDistribution(userId),
        getRecentTransactions(userId),
      ]);

      /* 

      Without Promise.all()
        const summary = await getDashboardSummary(userId);

        const monthlyTrend = await getMonthlyExpenseTrend(userId);

        const categoryDistribution = await getCategoryDistribution(userId);

        const recentTransactions = await getRecentTransactions(userId);
      
      With Promise.all()

        All four queries start at the same time (in parallel).
        much faster because these queries are independent

      */

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully.",
      data: {
        summary,
        monthlyTrend,
        categoryDistribution,
        recentTransactions,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data.",
    });
  }
};
