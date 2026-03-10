const express = require("express");
const app = express();
const userRoutes = require("./app/routes/userRoutes");

app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("DevOps CI/CD Running 🚀");
});

module.exports = app;

// start server only when running directly
if (require.main === module) {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}
