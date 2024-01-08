const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

const me = async(req, res) => {
    const authHeader = req.headers.authorization;
    const bearer_token = authHeader && authHeader.split(' ')[1];
    jwt.verify(bearer_token, secretKey, (err, tokenData) => {
      if (err) {
        res.send("You have not access.");
      } else {
        const id = tokenData;
        userModel.findOne({ "id": id }).then(result => {
          if (result) {
            const response = {
              "status": true,
              "content": {
                "data": {
                  "id": result['id'],
                  "name": result['name'],
                  "email": result['email'],
                  "created_at": result['created_at']
                }
              }
            }
            res.send(response);
          } else {
            res.send("user not found.");
          }
        }).catch(err => {
          console.log(err);
          res.send("Something went wrong");
        })
      }
    })
  }

  module.exports =me;
  