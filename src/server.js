const express = require("express");
const { userRouter } = require("./users/UserChecker");
const tokenRouter = require("./users/TokenGenerator");
const logger = require("./lib/Middleware/Logger");
const app = express();
const tokenAuth = require("./lib/Middleware/TokenAuth");
const cors = require('cors')

const mongoose = require("mongoose")
const mongoURL = "mongodb://127.0.0.1:27017/users";
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const dbConnection = mongoose.connection
dbConnection.on('error', err => console.error(err))
dbConnection.once('open', () => console.log("Connected to db"))


app.use(cors())
app.use(logger);
app.use("/newUser", userRouter);
app.use("/tokens", tokenRouter);

app.use(tokenAuth);


const port = 5000;
app.listen(port, () => console.log("Now listening on port:", port ));
