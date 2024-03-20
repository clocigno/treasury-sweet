import express, { json } from "express";
import passport from "passport";
import sessionConfig from "./session-config.mjs";
import initializePassport from "./passport-config.mjs";

import userRoutes from "./routes/users.mjs";
import accountRoutes from "./routes/accounts.mjs";
import transactionRoutes from "./routes/transactions.mjs";

initializePassport();

const app = express();

app.use(json());
app.use(sessionConfig());
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRoutes);
app.use("/accounts", accountRoutes);
app.use("/transactions", transactionRoutes);

const port = process.env.PORT || 8080;

app.listen(port, (err, res) => {
  if (err) {
    console.log(err);
    return res.status(500).send(err.message);
  } else {
    console.log("[INFO] Server Running on port:", port);
  }
});
