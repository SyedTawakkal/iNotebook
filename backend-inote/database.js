const mongoose = require("mongoose");
const mongoUrl = "mongodb://localhost:27017/inotes";
const connectToMongo = () => {
  mongoose.connect(mongoUrl, () => {
    console.log("connected to mongoDB");
  });
};
module.exports = connectToMongo;
