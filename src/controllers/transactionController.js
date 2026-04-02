const service = require("../services/transactionService");

exports.add = async (req, res, next) => {
  try {
    if (!req.body.amount || !req.body.type) {
      return res.status(400).json({
        message: "Amount and type are required"
      });
    }
    if (!["income", "expense"].includes(req.body.type)) {
      return res.status(400).json({
        message: "Type must be income or expense"
      });
    }

    const transaction = await service.addTransaction(req.body, req.user.id);
    res.status(201).json({
  message: "Transaction added successfully",
  data: transaction
});
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const data = await service.getTransactions(req.user.id);
    res.json({
  count: data.length,
  data
});
  } catch (err) {
    next(err);
  }
};
exports.summary = async (req, res, next) => {
  try {
    const data = await service.getSummary(req.user.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};