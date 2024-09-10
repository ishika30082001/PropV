const ProductModel = require("../models/ProductModels");
const responseHandler = require("../utils/responseHandler");

exports.createProducts = async (req, res) => {
  // console.log(req.body);
  try {
    const product = await ProductModel.create(req.body);
    res.status(200).json({
      message: "working",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const { keyword, price } = req.query;

    // console.log(keyword);
    let query = {};

    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    // filter
    if (price) {
      let priceStr = JSON.stringify(price);
      priceStr = priceStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

      const priceObj = JSON.parse(priceStr);
      query.price = priceObj;
    }

    const products = await ProductModel.find(query);
    
    if (products.length == 0) {
      responseHandler.success(
        res,
        products,
        "there is no product in such range"
      );
    } else {
      responseHandler.success(res, products, "products retrieved successfully");
    }

    // console.log(data);
  } catch (error) {
    responseHandler.error(res, error);
  }
};


// if (category) {
//   query.category = { $regex: category, $options: "i" };
// }