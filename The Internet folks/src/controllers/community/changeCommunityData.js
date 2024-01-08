const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const communityModel = require('../../models/communityModel');

const changeCommunityData = async(req, res) => {
    const authHeader = req.headers.authorization;
    const bearer_token = authHeader && authHeader.split(' ')[1];
    const name = req.body.name;
    jwt.verify(bearer_token, secretKey, (err, tokenData) => {
      if (err) {
        res.send("You have not access.");
      } else {
        if (name.length < 2) {
          res.send("name shoud contain min 2 characters");
        } else {
          const id = uuid.v4();
          const new_community = new communityModel({
            "id": id,
            "name": name,
            "slug": name + uuid.v4(),
            "owner": tokenData,
            "created_at": new Date(),
            "updated_at": new Date(),
          });
          new_community.save().then(result => {
            const response = {
              "status": true,
              "content": {
                "data": {
                  "id": result["id"],
                  "name": result["name"],
                  "slug": result["slug"],
                  "owner": result["owner"],
                  "created_at": result["created_at"],
                  "updated_at": result["updated_at"]
                }
              }
            }
            res.send(response);
          }).catch(err => {
            console.log(err);
            res.send("Something went wrong.")
          })
  
        }
      }
    })
  }
  

  module.exports = changeCommunityData;