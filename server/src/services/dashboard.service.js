import Transaction from "../models/transaction.model.js";

export const getDashboardSummary = async (userId) => {
    const summary = await Transaction.aggregate([
        {
            //-It filters transactions so only the logged-in user's records continue.---
            $match: {  
                userId,
            },
        },
        {   
            //----heart of the aggregation pipeline.---
            $group: {
                _id: "$type",      //---Group everything having the same type.---
                total: {
                    $sum: "$amount",       //---Sum the amount field for each group.---
                },
            },
        },
    ]);

    /* 
    in summary we will get the data in this format:
        [
            {
                _id:"Income",
                total:3000
            },
            {
                _id:"Expense",
                total:800
            }
        ]

    */

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


export const getMonthlyExpenseTrend = async (userId) => {
    return await Transaction.aggregate([
        {
            $match: {
                userId,
                type: "Expense",
            },
        },
        {

            //----Group by year and month of the transactionDate field Instead of grouping by category or type.---
            /* 
                Jan 2026
                Jan 2026
                Feb 2026
                Feb 2026
            
            */

            $group: {
                _id: {
                    year: { $year: "$transactionDate" },           
                    month: { $month: "$transactionDate" },
                },
                totalExpense: {
                    $sum: "$amount",
                },
            },
        },
        {
            //----Ascending.----
            $sort: {  
                "_id.year": 1,
                "_id.month": 1,
            },
        },
    ]);

    /* 
        Example output:

            [
                {
                _id:{
                year:2026,
                month:1
                },
                totalExpense:2300
                },
                {
                _id:{
                year:2026,
                month:2
                },
                totalExpense:4100
                }
            ]
    
    */
};

export const getCategoryDistribution = async (userId) => {
    return await Transaction.aggregate([
        {
            $match: {
                userId,
                type: "Expense",
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
            //----LARGEST CATEGORY FIRST.---
            $sort: {   
                totalAmount: -1,
            },
        },
    ]);

    /* 

        [
            {
            _id:"Food",
            totalAmount:2200
            },
            {
            _id:"Shopping",
            totalAmount:1600
            }
        ]
    
    */
};


//-------------Addded after making frontend-------

export const getMonthlyStats = async (userId) => {
  const currentDate = new Date();

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
    23,
    59,
    59
  );

  const dailyExpenses = await Transaction.aggregate([
    {
      $match: {
        user: userId,
        type: "expense",
        transactionDate: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      },
    },
    {
      $group: {
        _id: {
          day: { $dayOfMonth: "$transactionDate" },
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

  if (dailyExpenses.length === 0) {
    return {
      highestDay: 0,
      averageDaily: 0,
      lowestDay: 0,
    };
  }

  const amounts = dailyExpenses.map((item) => item.totalExpense);

  const highestDay = Math.max(...amounts);
  const lowestDay = Math.min(...amounts);

  const total = amounts.reduce((sum, value) => sum + value, 0);

  const averageDaily = Math.round(total / dailyExpenses.length);

  return {
    highestDay,
    averageDaily,
    lowestDay,
  };
};

export const getRecentTransactions = async (userId, limit = 5) => {
    return await Transaction.find({ userId })
        .sort({ transactionDate: -1 })
        .limit(limit);
};