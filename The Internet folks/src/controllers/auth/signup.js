const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const sha256 = require('sha256');
const userModel = require('../../models/userModel.js');
const secretKey = "6$3eae566878f32c8faf05a80#";

const signUp = async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (name.length < 2) {
        res.send("name shoud contain min 2 characters");
    }
    else if (email.length < 1) { res.send("email is required."); }
    else if (password.length < 6) { res.send("password shoud contain min 6 characters"); }
    else {
        const id = uuid.v4();
        const new_user = new userModel({
        'id': id,
        'name': name,
        'email': email,
        'password': sha256(password),
        'created_at': new Date(),
        });

    const access_token = jwt.sign(id, secretKey);

    userModel.findOne({ 'email': email }).then(result => {
      if (result) {
        res.send("Email is already registerd.");
      }
      else {
        new_user.save().then(result => {
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
                "access_token": access_token
              }
            }
          }
          res.send(response);
        }).catch(err => {
          res.send("Something went wrong.");
        })
      }
    }).catch(error => {
      res.send("Something went wrong.")
    })

  }
}

module.exports = signUp;