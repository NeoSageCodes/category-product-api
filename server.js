const express = require('express');
const app = express();
const PORT = 1000;
const categoryRouter = require("./routers/categoryRouter");
const productRouter = require("./routers/productRouter");
const sequelize = require('./database/database');

app.use(express.json());

app.use(productRouter);
app.use(categoryRouter);

const dbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error.message);
    }
};

dbConnection();

app.listen(PORT, () => {
    console.log(`Server is listening at PORT: ${PORT}`)
});