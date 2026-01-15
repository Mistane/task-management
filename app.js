const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const app = express();
app.use(cors());

require("dotenv").config();
app.use(express.json());

const port = process.env.PORT;
db.connect();

//routes
const route = require("./api/v1/routes/index.route");
route(app);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
