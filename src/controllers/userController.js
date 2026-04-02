const userService = require("../services/userService");

exports.register = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await userService.loginUser(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};