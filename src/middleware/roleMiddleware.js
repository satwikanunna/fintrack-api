const permissions = {
  viewer: ["read"],
  analyst: ["read", "summary"],
  admin: ["create", "read", "update", "delete", "summary"]
};

module.exports = (action) => {
  return (req, res, next) => {
    const role = req.user.role;

    if (!permissions[role] || !permissions[role].includes(action)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions"
      });
    }

    next();
  };
};