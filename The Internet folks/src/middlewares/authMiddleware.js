// authMiddleware.js
const jwt = require("jsonwebtoken");
const { userModel } = require("../models");

const secretKey = "6$3eae566878f32c8faf05a80#";

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader && authHeader.split(' ')[1];

    jwt.verify(bearerToken, secretKey, async (err, tokenData) => {
      if (err) {
        res.send("You have no access.");
      } else {
        try {
          const user = await userModel.findOne({ id: tokenData });

          if (user) {
            req.user = user; // Attach user object to request for later use
            next();
          } else {
            res.send("User not found.");
          }
        } catch (err) {
          console.error(err);
          res.send("Something went wrong.");
        }
      }
    });
  },
};

module.exports = authMiddleware;
