const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const createJwtWebsite = () => {};
const createJwtApp = (payload) => {
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
const createJwtReNew = ()=>{
  let token = null;
  try {
    token = jwt.sign(payload,"1332436432334",{
      expiresIn:11,
    });
  } catch (error) {
    
  }
}

module.exports = { createJwtApp, createJwtWebsite };
