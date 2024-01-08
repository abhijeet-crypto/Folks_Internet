const jwt = require('jsonwebtoken');
const communityModel = require('../../models/communityModel');

const communityOwner = async (req, res) => {
    const authHeader = req.headers.authorization;
    const bearer_token = authHeader && authHeader.split(' ')[1];
    jwt.verify(bearer_token, secretKey, async (err, tokenData) => {
      if (err) {
        res.send("You have not access.");
      } else {
  
        try {
          // console.log(tokenData);
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const skip = (page - 1) * limit;
          const myOwnedCommunity = await communityModel.find({ "owner": tokenData }).skip(skip).limit(limit);;
          let data = [];
          for (let i = 0; i < myOwnedCommunity.length; i++) {
            const x = {
              "id": myOwnedCommunity[i].id,
              "name": myOwnedCommunity[i].name,
              "slug": myOwnedCommunity[i].slug,
              "owner": myOwnedCommunity[i].owner,
              "created_at": myOwnedCommunity[i].created_at,
              "updated_at": myOwnedCommunity[i].updated_at
            }
            data.push(x);
          }
          const total = await communityModel.countDocuments();
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
          console.log(err);
          res.send("Something wents wrong.");
        }
  
      }
    });
  
  }

  module.exports = communityOwner;
  