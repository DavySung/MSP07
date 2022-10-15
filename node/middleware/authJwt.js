const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config.js");
verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers.authorization || req.headers['Authorization'];
  if (!authHeader) {
    return res.status(403).send({
      status: false,
      headers: req.headers,
      errors: {
        unauthorized: "No authorization provided!",
      },
    });
  }

  let token = authHeader.split(" ")[1];
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        status: false,
        errors: {
          unauthorized: err.message,
        },
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
