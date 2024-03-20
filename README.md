## RESTful API

This project implements a RESTful API, providing a way to perform CRUD (Create, Read, Update, Delete) operations on resources like users, accounts, and transactions. The API follows REST principles with stateless request handling and structured endpoints.

## API Endpoints

The application provides a RESTful API with the following endpoints:

### /users

- `POST /register`: Register a new user.
- `POST /login`: Authenticate and log in a user.
- `GET /logout`: Log out the current user.
- `PUT /update`: Update the profile of the currently logged-in user.

### /accounts

- `POST /create`: Create a new financial account (Authenticated users only).
- `GET /`: List all accounts for the currently logged-in user.
- `GET /:accountId`: Get details of a specific account (Authenticated user and account owner only).
- `PATCH /:accountId`: Update a specific account (Authenticated user and account owner only).
- `DELETE /:accountId`: Delete a specific account (Authenticated user and account owner only).
- `GET /:accountId/transactions`: Retrieve transactions for a specific account (Authenticated user and account owner only).

### /transactions

- `POST /create`: Record a new transaction in an account (Authenticated user and account owner only).
- `GET /`: Retrieve all transactions for the currently logged-in user.
- `GET /:transactionId`: Retrieve details of a specific transaction (Authenticated user and account owner only).

## Built With

This project leverages several key technologies and frameworks:

- [Node.js](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine, used for building scalable network applications.
- [Express.js](https://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [MySQL](https://www.mysql.com/) - An open-source relational database management system, used for storing and managing the application's data.
- [Passport](http://www.passportjs.org/) - An authentication middleware for Node.js, simplifying the process of handling user authentication.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - A library for hashing and comparing passwords in Node.js.
- [dotenv](https://www.npmjs.com/package/dotenv) - A module for loading environment variables from a .env file into `process.env`, helping manage configuration settings securely.
