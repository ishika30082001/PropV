const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
  .connect(process.env.DB_URI)
  .then((data) => {
    console.log(`MongoDb connected with server: ${data.connection.host}`);
  })
  .catch((err) => {
    console.log(`${err.message} invalid mongoDb url`);
  }); 
};
    
module.exports = connectDB;
