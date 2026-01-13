const mongoose = require("mongoose");

module.exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connect to db successfully");
    })
    .catch((err) => {
      console.log("Failed to connect to db");
    });
};
