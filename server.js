const express = require("express");
const userRoutes = require("./app/routes/userRoutes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "DevOps CI/CD Project Running 🚀" });
});

app.use("/users", userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;