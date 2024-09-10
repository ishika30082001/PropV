const responseHandler = require("./responseHandler");
// creating token and saving in cookie 
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnlyTrue: true,
  };

  // responseHandler.success(res, token, "user registered successfully");

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
