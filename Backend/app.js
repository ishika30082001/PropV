const express = require("express");
const app = express();
const Product = require("./routes/ProductRoute");
const User = require("./routes/UserRoute");
const cookieParser = require("cookie-parser");
const Property = require("./routes/PropertyRoute");



app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", Product);
app.use("/api/v1", User);
app.use("/api/v1", Property);
module.exports = app;
