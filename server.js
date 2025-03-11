const express = require("express");
const router = require("./src/routes/router");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/api", router);

const port = process.env.PORT || 5000; 
app.listen(port, () => {
    console.log(`Server is running on http://localhost: ${port}.`)
});