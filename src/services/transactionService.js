const Transaction = require("../models/transactionModel");

exports.addTransaction = async (data, userId) => {
  return await Transaction.create({
    ...data,
    user: userId
  });
};

exports.getTransactions = async (userId) => {
  return await Transaction.find({ user: userId });
};
exports.getSummary = async (userId) => {
  const transactions = await Transaction.find({ user: userId });

  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") {
      income += t.amount;
    } else {
      expense += t.amount;
    }
  });

  return {
    totalIncome: income,
    totalExpense: expense,
    balance: income - expense
  };
};