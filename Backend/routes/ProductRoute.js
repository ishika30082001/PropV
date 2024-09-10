const express = require("express");
const {
  getAllProducts,
  createProducts,
} = require("../Controllers/ProductController");
const { isAuthenticatedUser } = require("../middleWare/auth");
const route = express.Router();

route.get("/", getAllProducts);
route.post("/products/new", isAuthenticatedUser,createProducts);
module.exports = route;
