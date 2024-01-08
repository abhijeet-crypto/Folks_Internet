const jwt = require('jsonwebtoken');
const memberModel = require('../../models/memberModel');
const communityModel = require('../../models/communityModel');
const userModel = require('../../models/userModel');


const communityMember = async (req, res) => {
    const authHeader = req.headers.authorization;
    const bearer_token = authHeader && authHeader.split(' ')[1];
    jwt.verify(bearer_token, secretKey, async (err, tokenData) => {
      if (err) {
        res.send("You have not access.");
      } else {
        try {
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const skip = (page - 1) * limit;
  
          const myMembership = await memberModel.find({ "user": tokenData }).skip(skip).limit(limit);;
          let data = [];
          for (let i = 0; i < myMembership.length; i++) {
            const community_data = await communityModel.findOne({ "id": myMembership[i].community });
            let owner_name = await userModel.findOne({ "id": community_data.owner });
            owner_name = owner_name.name;
            const x = {
              "id": community_data.id,
              "name": community_data.name,
              "slug": community_data.slug,
              "owner": {
                "id": community_data.owner,
                "name": owner_name,
              },
              "created_at": community_data.created_at,
              "updated_at": community_data.updated_at
            }
            data.push(x);
          }
          const total = await memberModel.countDocuments();
          const pages = Math.ceil(total / limit);
          const response = {
            "status": true,
            "content": {
              "meta": {
                "total": total,
                "pages": pages,
                "page": page
              },
              "data": data
            }
          }
          res.send(response);
        } catch (err) {
          console.lof(err);
          res.send("Somethings wents wrong");
        }
      }
    })
  }


  module.exports = communityMember;
  
