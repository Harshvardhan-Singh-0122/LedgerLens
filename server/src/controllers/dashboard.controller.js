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
