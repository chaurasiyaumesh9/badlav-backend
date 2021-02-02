const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./backend/routes/auth");
const adminRoutes = require("./backend/routes/admin/auth");
const petitionTypeRoutes = require("./backend/routes/admin/petitionType");
const petitionRoutes = require("./backend/routes/petition");

env.config();
app.use(cors());
app.use(express.json());

const db_conn_string = process.env.MODE === 'LOCAL' ? process.env.LOCAL_DB_CONN_STRING : process.env.LIVE_DB_CONN_STRING;

mongoose
  .connect(
    db_conn_string,
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
app.use("/api", petitionRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
