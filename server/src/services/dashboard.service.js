// import Transaction from "../models/transaction.model.js";

// export const getDashboardSummary = async (userId) => {
//     const summary = await Transaction.aggregate([
//         {
//             //-It filters transactions so only the logged-in user's records continue.---
//             $match: {
//                 userId,
//             },
//         },
//         {
//             //----heart of the aggregation pipeline.---
//             $group: {
//                 _id: "$type",      //---Group everything having the same type.---
//                 total: {
//                     $sum: "$amount",       //---Sum the amount field for each group.---
//                 },
//             },
//         },
//     ]);

//     /*
//     in summary we will get the data in this format:
//         [
//             {
//                 _id:"Income",
//                 total:3000
//             },
//             {
//                 _id:"Expense",
//                 total:800
//             }
//         ]

//     */

//     let totalIncome = 0;
//     let totalExpense = 0;

//     summary.forEach((item) => {
//         if (item._id === "Income") {
//             totalIncome = item.total;
//         } else if (item._id === "Expense") {
//             totalExpense = item.total;
//         }
//     });

//     return {
//         totalIncome,
//         totalExpense,
//         currentBalance: totalIncome - totalExpense,
//     };
// };

// export const getMonthlyExpenseTrend = async (userId) => {
//     return await Transaction.aggregate([
//         {
//             $match: {
//                 userId,
//                 type: "Expense",
//             },
//         },
//         {

//             //----Group by year and month of the transactionDate field Instead of grouping by category or type.---
//             /*
//                 Jan 2026
//                 Jan 2026
//                 Feb 2026
//                 Feb 2026

//             */

//             $group: {
//                 _id: {
//                     year: { $year: "$transactionDate" },
//                     month: { $month: "$transactionDate" },
//                 },
//                 totalExpense: {
//                     $sum: "$amount",
//                 },
//             },
//         },
//         {
//             //----Ascending.----
//             $sort: {
//                 "_id.year": 1,
//                 "_id.month": 1,
//             },
//         },
//     ]);

//     /*
//         Example output:

//             [
//                 {
//                 _id:{
//                 year:2026,
//                 month:1
//                 },
//                 totalExpense:2300
//                 },
//                 {
//                 _id:{
//                 year:2026,
//                 month:2
//                 },
//                 totalExpense:4100
//                 }
//             ]

//     */
// };

// export const getCategoryDistribution = async (userId) => {
//     return await Transaction.aggregate([
//         {
//             $match: {
//                 userId,
//                 type: "Expense",
//             },
//         },
//         {
//             $group: {
//                 _id: "$category",
//                 totalAmount: {
//                     $sum: "$amount",
//                 },
//             },
//         },
//         {
//             //----LARGEST CATEGORY FIRST.---
//             $sort: {
//                 totalAmount: -1,
//             },
//         },
//     ]);

//     /*

//         [
//             {
//             _id:"Food",
//             totalAmount:2200
//             },
//             {
//             _id:"Shopping",
//             totalAmount:1600
//             }
//         ]

//     */
// };

// //-------------Addded after making frontend-------

// export const getMonthlyStats = async (userId) => {
//   const currentDate = new Date();

//   const startOfMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth(),
//     1
//   );

//   const endOfMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth() + 1,
//     0,
//     23,
//     59,
//     59
//   );

//   const dailyExpenses = await Transaction.aggregate([
//     {
//       $match: {
//         userId,
//         type: "Expense",
//         transactionDate: {
//           $gte: startOfMonth,
//           $lte: endOfMonth,
//         },
//       },
//     },
//     {
//       $group: {
//         _id: {
//           day: { $dayOfMonth: "$transactionDate" },
//         },
//         totalExpense: {
//           $sum: "$amount",
//         },
//       },
//     },
//     {
//       $sort: {
//         "_id.day": 1,
//       },
//     },
//   ]);

//   if (dailyExpenses.length === 0) {
//     return {
//       highestDay: 0,
//       averageDaily: 0,
//       lowestDay: 0,
//     };
//   }

//   const amounts = dailyExpenses.map((item) => item.totalExpense);

//   const highestDay = Math.max(...amounts);
//   const lowestDay = Math.min(...amounts);

//   const total = amounts.reduce((sum, value) => sum + value, 0);

//   const averageDaily = Math.round(total / dailyExpenses.length);

//   return {
//     highestDay,
//     averageDaily,
//     lowestDay,
//   };
// };

// export const getRecentTransactions = async (userId, limit = 5) => {
//     return await Transaction.find({ userId })
//         .sort({ transactionDate: -1 })
//         .limit(limit);
// };

//-----------------For updating the dashboard from Month wise button----------------
import Transaction from "../models/transaction.model.js";

const getMonthRange = (month, year) => {
  // 1st day 00:00:00 IST
  const startDate = new Date(Date.UTC(year, month - 1, 1));
  startDate.setUTCHours(-5, -30, 0, 0);

  // Last day 23:59:59.999 IST
  const endDate = new Date(Date.UTC(year, month, 1));
  endDate.setUTCHours(-5, -30, -1, 999);

  return {
    startDate,
    endDate,
  };
};

export const getDashboardSummary = async (userId, month, year) => {
  const { startDate, endDate } = getMonthRange(month, year);

  const summary = await Transaction.aggregate([
    {
      $match: {
        userId,
        transactionDate: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: "$type",
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

  let totalIncome = 0;
  let totalExpense = 0;

  summary.forEach((item) => {
    if (item._id === "Income") {
      totalIncome = item.total;
    } else if (item._id === "Expense") {
      totalExpense = item.total;
    }
  });

  return {
    totalIncome,
    totalExpense,
    currentBalance: totalIncome - totalExpense,
  };
};

export const getMonthlyExpenseTrend = async (userId, month, year) => {
  const { startDate, endDate } = getMonthRange(month, year);

  return await Transaction.aggregate([
    {
      $match: {
        userId,
        type: "Expense",
        transactionDate: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: {
          day: {
            $dayOfMonth: {
              date: "$transactionDate",
              timezone: "Asia/Kolkata",
            },
          },
        },
        totalExpense: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        "_id.day": 1,
      },
    },
  ]);
};

export const getCategoryDistribution = async (userId, month, year) => {
  const { startDate, endDate } = getMonthRange(month, year);

  return await Transaction.aggregate([
    {
      $match: {
        userId,
        type: "Expense",
        transactionDate: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: "$category",
        totalAmount: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        totalAmount: -1,
      },
    },
  ]);
};

export const getMonthlyStats = async (userId, month, year) => {
  const { startDate, endDate } = getMonthRange(month, year);

  const dailyExpenses = await Transaction.aggregate([
    {
      $match: {
        userId,
        type: "Expense",
        transactionDate: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: {
          day: {
            $dayOfMonth: {
              date: "$transactionDate",
              timezone: "Asia/Kolkata",
            },
          },
        },
        totalExpense: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        "_id.day": 1,
      },
    },
  ]);


  console.log(dailyExpenses);

  if (dailyExpenses.length === 0) {
    return {
      highestDay: 0,
      highestDayLabel: "--",

      averageDaily: 0,

      lowestDay: 0,
      lowestDayLabel: "--",
    };
  }

  let highest = dailyExpenses[0];
  let lowest = dailyExpenses[0];

  dailyExpenses.forEach((item) => {
    if (item.totalExpense > highest.totalExpense) {
      highest = item;
    }

    if (item.totalExpense < lowest.totalExpense) {
      lowest = item;
    }
  });

  const totalExpense = dailyExpenses.reduce(
    (sum, item) => sum + item.totalExpense,
    0,
  );

  const averageDaily = Math.round(totalExpense / dailyExpenses.length);

  const monthName = new Date(year, month - 1).toLocaleString("en-US", {
    month: "short",
  });

  return {
    highestDay: highest.totalExpense,
    highestDayLabel: `${highest._id.day} ${monthName}`,

    averageDaily,

    lowestDay: lowest.totalExpense,
    lowestDayLabel: `${lowest._id.day} ${monthName}`,
  };
};

export const getRecentTransactions = async (userId, limit = 5) => {
  return await Transaction.find({ userId })
    .sort({ transactionDate: -1 })
    .limit(limit);
};
