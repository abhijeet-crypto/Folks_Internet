const jwt = require('jsonwebtoken');
const memberModel = require('../../models/memberModel');
const communityModel = require('../../models/communityModel');

const deleteMember = async(req, res) => {
    const memberId = req.params.id;
    const authHeader = req.headers.authorization;
    const bearer_token = authHeader && authHeader.split(' ')[1];
    jwt.verify(bearer_token, secretKey, async (err, tokenData) => {
      if (err) {
        res.send("You have not access.");
      } else {
        const member_data = await memberModel.findOne({ "id": memberId });
        if (member_data) {
          const communityId = member_data.community;
          const community_data = await communityModel.findOne({ "id": communityId });
          const community_owner = community_data.owner;
          if (community_owner === tokenData) {
            const result = await memberModel.deleteOne({ "id": memberId });
            if (result.deletedCount === 0) {
              return res.status(404).send('Member not found');
            }
            return res.status(200).send({
              "status": true
            });
          } else {
            res.send("NOT_ALLOWED_ACCESS")
          }
        } else {
          return res.status(404).send('Member not found');
        }
      }
    })
  
  }

  module.exports = deleteMember;