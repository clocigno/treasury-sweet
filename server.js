import express, { json } from "express";
import passport from "passport";
import sessionConfig from "./session-config.js";
import initializePassport from "./passport-config.js";

import userRoutes from "./routes/users.js";
import accountRoutes from "./routes/accounts.js";
import transactionRoutes from "./routes/transactions.js";

initializePassport();

const app = express();

app.use(json());
app.use(sessionConfig());
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRoutes);
app.use("/accounts", accountRoutes);
app.use("/transactions", transactionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
