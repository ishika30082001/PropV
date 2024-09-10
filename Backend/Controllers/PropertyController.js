const propertyModel = require("../models/PropertyModel.js");
const responseHandler = require("../utils/responseHandler.js");
const userModel = require("../models/UserModel.js");

exports.propertyListing = async (req, res, next) => {
  let { facilities } = req.body;

  facilities[0].name = req.user.name;
  console.log(req.user._id);
  req.body.user = req.user._id;

  // console.log(req.body);
  try {
    const property = await propertyModel.create(req.body);
    res.status(200).json({
      message: "Property Listed",
    });
  } catch (error) {
    console.log(error);
  }
};

// all property
exports.getProperty = async (req, res, next) => {
  try {
    const property = await propertyModel.find();
    console.log(property);

    if (property) return responseHandler.success(res, property, "success");
  } catch (error) {
    console.log(error);
  }
};

//delete property
exports.deleteProperty = async (req, res, next) => {
  try {
    const property = await propertyModel.findById(req.params.id);
    // console.log(property);
    // console.log(property.user);
    // console.log("property");

    // console.log(req.user._id);

    if (property.user.toString() === req.user._id.toString()) {
      await propertyModel.findByIdAndDelete(req.params.id, req.body);
      return responseHandler.success(res, "property deleted successfully");
    } else {
      return responseHandler.error(
        res,
        "You are not authorized to delete this property"
      );
    }
  } catch (error) {
    console.log(error);
    console.log("error");
    responseHandler.error(res, "you are not owner of this api");
  }
};

// fetch particular product associated with user
exports.getParticularProduct_of_User = async (req, res, next) => {
  try {
    let userId = req.user._id;
    console.log(userId);

    // Find all products where the user field matches req.user._id
    const products = await propertyModel.find({ user: userId });

    if (products.length > 0) {
      // console.log(products);
      return responseHandler.success(res, products, "all products of yours");
    }
  } catch (error) {
    console.log(error);
  }
};
exports.adminDeleteProperty = async (req, res, next) => {
  try {
    let delprop = await propertyModel.findById(req.params.id);
    console.log(delprop);

    if (!delprop) {
      return next(responseHandler.error(res, "product not found"));
    }

    await propertyModel.findByIdAndDelete(req.params.id, req.body);

    responseHandler.success(res, "property deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
