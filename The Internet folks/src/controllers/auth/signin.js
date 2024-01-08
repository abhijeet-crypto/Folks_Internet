const sha256 = require("sha256");
const jwt = require("jsonwebtoken");
const userModel = require('../../models/userModel');
const secretKey = "6$3eae566878f32c8faf05a80#";

const signIn = async(req,res)=>{
    const email = req.body.email;
  const password = req.body.password;

  userModel.findOne({ "email": email, "password": sha256(password) }).then(result => {
    if (result) {
      const response = {
        "status": true,
        "content": {
          "data": {
            "id": result['id'],
            "name": result['name'],
            "email": result['email'],
            "created_at": result['created_at']
          },
          "meta": {
            "access_token": jwt.sign(result['id'], secretKey)
          }
        }
      }
      res.send(response);
    } else {
      res.send("User not found.")
    }
  }).catch(err => { res.send("Something wet wrong.") })
}


module.exports = signIn;