import express from "express";
require("dotenv").config();
const app = express();
app.listen(process.env.PORT, () => {
  console.log(`listen in http://localhost:${process.env.PORT}`);
});
