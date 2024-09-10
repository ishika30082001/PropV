const userModel = require("../models/UserModel");
const responseHandler = require("../utils/responseHandler");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = async (req, res, next) => {
  //   console.log(req.cookies);
  const { token } = req.cookies;
  //   console.log(token);

  if (!token) {
    return responseHandler.error(res, "Please Login to access this resource");
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedData);

  req.user = await userModel.findById(decodedData.id);
  // console.log(req.user);
  next();
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        responseHandler.success(
          res,
          `Role ${req.user.role} is not allowed to access this resource`
        )
      );
    }
    next();
  };
};
