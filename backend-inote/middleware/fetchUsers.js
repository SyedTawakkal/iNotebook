const jwt = require("jsonwebtoken");
const secretKey = "Secretkey";
const fetchUser = (req, res, next) => {
  //get the user from jwt token and add id to the request object.
  const token = req.header("auth-token");
  //   console.log(token);
  //   console.log(typeof process.env.JWT_SECRET_STRING);
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please validate Using a valid token" });
  }
  try {
    console.log("fetching");
    const data = jwt.verify(token, secretKey);
    console.log(data);
    req.user = data;
    next();
  } catch (err) {
    return res
      .status(401)
      .send({ error: "Please validate using a valid token" });
  }
};

module.exports = fetchUser;
