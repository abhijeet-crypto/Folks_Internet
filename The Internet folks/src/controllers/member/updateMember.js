const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const communityModel = require('../../models/communityModel');
const memberModel = require('../../models/memberModel');

const updateMember = async(req, res) => {
    const authHeader = req.headers.authorization;
    const bearer_token = authHeader && authHeader.split(' ')[1];
    const community = req.body.community;
    const user = req.body.user;
    const role = req.body.role;
    jwt.verify(bearer_token, secretKey, async (err, tokenData) => {
      if (err) {
        res.send("You have not access.");
      } else {
        const new_member = new memberModel({
          'id': uuid.v4(),
          'community': community,
          'user': user,
          'role': role,
          'created_at': new Date()
        });
        try {
          const community_data = await communityModel.findOne({ "owner": tokenData });
          // console.log(tokenData);
          // res.send(community_data)
          if (community_data) {
            new_member.save().then(result => {
              const response = {
                "status": true,
                "content": {
                  "data": {
                    "id": result.id,
                    "community": result.community,
                    "user": result.user,
                    "role": result.role,
                    "created_at": result.created_at
                  }
                }
              }
              res.send(response);
            }).catch(err => {
              console.log(err);
              res.send("Something went wrong.")
            })
          } else {
            res.send("NOT_ALLOWED_ACCESS")
          }
  
        } catch (err) {
          console.log(err);
          res.send("Somthing wents wrong.")
        }
      }
    });
  }

  module.exports = updateMember;