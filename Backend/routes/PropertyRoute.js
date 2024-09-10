const express = require("express");
const route = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleWare/auth");
const {
  propertyListing,
  getProperty,
  deleteProperty,
  getParticularProduct_of_User,
  adminDeleteProperty,
} = require("../Controllers/PropertyController");

route.post("/property/newSubmit", isAuthenticatedUser, propertyListing);
route.get("/totalProperty", getProperty);
route.delete("/property/:id/remove", isAuthenticatedUser, deleteProperty);
route.get("/user/property", isAuthenticatedUser, getParticularProduct_of_User);
route.delete("/admin/delProperty/:id", isAuthenticatedUser, authorizeRoles('admin'), adminDeleteProperty);
  
module.exports = route;
