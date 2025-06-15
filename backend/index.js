require("dotenv").config();
const express = require("express");
const analyticsRoutes = require("./routes/analyticsRoutes");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/api", analyticsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
