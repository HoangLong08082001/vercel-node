const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const createJwtWebsite = () => {};
const createJwtApp = (payload) => {
  let key = process.env.SECRET_KEY;
  let token = null;
  try {
    token = jwt.sign(payload, "apec-global-0827778666", {
      expiresIn: 2629800,
    });
  } catch (error) {
    console.log(error);
  }
  return token;
};

module.exports = { createJwtApp, createJwtWebsite };
