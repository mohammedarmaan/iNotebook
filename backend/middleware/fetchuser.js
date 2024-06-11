var jwt = require("jsonwebtoken");
const jwt_secret = "Armaanisagoodboy";

const fetchuser = (req, res, next) => {
  // Get the user from auth token and add id to req object
  const token = req.header("auth-token"); // auth token

  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, jwt_secret);
    req.user = data.user;
    next(); // next function is called
  } catch (error) {
    res.status(401).send({ error: error });
  } 
};
module.exports = fetchuser;
