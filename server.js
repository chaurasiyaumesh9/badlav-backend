const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./backend/routes/auth");
const adminRoutes = require("./backend/routes/admin/auth");
const petitionTypeRoutes = require("./backend/routes/admin/petitionType");

env.config();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    `mongodb://su:${process.env.MONGO_DB_PASSWORD}@cluster0-shard-00-00.6mltl.mongodb.net:27017,cluster0-shard-00-01.6mltl.mongodb.net:27017,cluster0-shard-00-02.6mltl.mongodb.net:27017/${process.env.MONGO_DB_DATABASE}?ssl=true&replicaSet=atlas-ddimt8-shard-0&authSource=admin&retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
)
  .then(() => {
    console.log("Database connected");
});

app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", petitionTypeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
