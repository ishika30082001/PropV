const responseHandler = require("../utils/responseHandler");
const validator = require("validator");
const userModel = require("../models/UserModel.js");
const sendToken = require("../utils/JwtToken.js");

// signUp api
exports.SignUp = async (req, res, next) => {
  // console.log(req.body);
  try {
    const { email, name, password } = req.body;
    const userExist = await userModel.findOne({ email });
    // console.log(userExist);

    if (userExist) {
      return responseHandler.error(res, "Email already exists", 401);
    }
    // console.log("user");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!validator.isEmail(email) || !emailRegex.test(email)) {
      // console.log("Invalid email format detected");
      return responseHandler.error(res, "Invalid email format", 400);
    }

    if (!email.endsWith("@gmail.com")) {
      return responseHandler.error(
        res,
        "Only Gmail addresses are allowed",
        400
      );
    }
    const user = await userModel.create({
      name,
      email,
      password,
    });
    sendToken(user, 201, res);
    // responseHandler.success(res, token, "user registered successfully");
  } catch (error) {
    console.log(error);
  }
};

//login user
exports.loginUser = async (req, res, next) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("email and password");
      return responseHandler.error(res, "email and password must be filled");
    }
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return responseHandler.error(res, "Invalid email or password");
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return responseHandler.error(res, "Invalid email or password");
    }

    sendToken(user, 201, res);
    // responseHandler.success(res, token, "login succesfully");
  } catch (error) {
    console.log(error);
  }
};

//logout
exports.LogOut = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  responseHandler.success(res, "logout successfully");
};

// getDetails
exports.userLogin = async (req, res, next) => {
  console.log(req.user);
  try {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};



//update profile
// exports.updateProfile = async (req, res, next) => {
//   try {
//     const user = await userModel.findById(req.user.id).select("+password");
//     console.log(user);
//     const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

//     if(!)

//   } catch (error) {
//     console.log(error);
//   }
// };

// getSingle user
// exports.Singleuser = async (req, res, next) => {
//   try {
//     const user = await userModel.findById(req.params.id);

//     console.log(user);
//     res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
