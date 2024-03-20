const express = require("express");
const { json } = require("express");
const passport = require("passport");
const sessionConfig = require("./session-config.js");
const initializePassport = require("./passport-config.js");

const userRoutes = require("./routes/users.js");
const accountRoutes = require("./routes/accounts.js");
const transactionRoutes = require("./routes/transactions.js");

initializePassport();

const app = express();

app.use(json());
app.use(sessionConfig());
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRoutes);
app.use("/accounts", accountRoutes);
app.use("/transactions", transactionRoutes);

const port = process.env.PORT || 3000;

app.listen(port, (err, res) => {
  if (err) {
    console.log(err);
    return res.status(500).send(err.message);
  } else {
    console.log("[INFO] Server Running on port:", port);
  }
});
