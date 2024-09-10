class responseHandler {
  static success(res, data="true", message, statusCode = 200) {
    return res.status(statusCode).json({
      data,
      message,
    });
  }

  static error(res, error, statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      message: error,
    });
  }
}
module.exports = responseHandler;
