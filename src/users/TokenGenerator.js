const express = require("express");
const bodyParser = require("../lib/Middleware/BodyParser");
const { confirmUser } = require("./UserChecker");
const jsonWebToken = require("jsonwebtoken");

const tokenSignature = "covid_is_hell_on_earth";

const createToken = (userId) => 
{
  return jsonWebToken.sign(
    {
      userId,
    },
    tokenSignature,
    { expiresIn: "1h" }
  );
};

const createTokenRoute = async (req, res) => 
{
  const { username, password } = req.body;

  const userExists = await confirmUser(username, password);

  console.log("user exists", userExists);

  if (userExists) 
  {
    const token = createToken(username);

    console.log("token?", token);
    res.status(201);
    res.send(token);
  } 
  else 
  {
    res.sendStatus(422);
  }
};

const tokenRouter = express.Router();

tokenRouter.post("/", bodyParser.json(), createTokenRoute);

module.exports = tokenRouter;