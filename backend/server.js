const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const axios = require("axios");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

cron.schedule("0 */23 * * *", () => {
  console.log("running a task every minute");
});

const fatsecretRouter = require("./routes/fatsecret");

app.use("/fatsecret", fatsecretRouter);

axios
  .get("http://localhost:5000/fatsecret/get-token/")
  .then(() => console.log('get token success'))
  .catch(function (error) {
    console.log(error);
  });
