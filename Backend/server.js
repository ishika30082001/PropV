const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./DB/connectDb");



//config
dotenv.config({path: "backend/config/.env"})

connectDB(); //always call database after dotenv rather it unable to find mongodb file


app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});








