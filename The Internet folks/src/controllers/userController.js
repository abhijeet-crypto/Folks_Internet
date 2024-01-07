// userController.js
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const secretKey = "6$3eae566878f32c8faf05a80#";

const userController = {
  signup: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
        return res.send("Email is already registered.");
      }

      const newUser = new userModel({
        id: uuid.v4(),
        name,
        email,
        password: sha256(password),
        created_at: new Date(),
      });

      await newUser.save();

      const response = {
        status: true,
        content: {
          data: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            created_at: newUser.created_at,
          },
          meta: {
            access_token: jwt.sign(newUser.id, secretKey),
          },
        },
      };

      res.send(response);
    } catch (error) {
      console.error(error);
      res.send("Something went wrong.");
    }
  },

  signin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await userModel.findOne({ email, password: sha256(password) });

      if (user) {
        const response = {
          status: true,
          content: {
            data: {
              id: user.id,
              name: user.name,
              email: user.email,
              created_at: user.created_at,
            },
            meta: {
              access_token: jwt.sign(user.id, secretKey),
            },
          },
        };

        res.send(response);
      } else {
        res.send("User not found.");
      }
    } catch (error) {
      console.error(error);
      res.send("Something went wrong.");
    }
  },

  me: async (req, res) => {
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader && authHeader.split(' ')[1];

    jwt.verify(bearerToken, secretKey, async (err, tokenData) => {
      if (err) {
        res.send("You have no access.");
      } else {
        try {
          const user = await userModel.findOne({ id: tokenData });

          if (user) {
            const response = {
              status: true,
              content: {
                data: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  created_at: user.created_at,
                },
              },
            };

            res.send(response);
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

module.exports = userController;
