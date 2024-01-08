const userModel = require('../../models/userModel');
const roleModel = require('../../models/roleModel');
const memberModel = require('../../models/memberModel');


const membersOfCommunity = async(req, res) => {
    const communityId = req.params.id;
    let data = [];
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const members = await memberModel.find({ "community": communityId }).skip(skip).limit(limit);;
      for (let i = 0; i < members.length; i++) {
        const user = await userModel.findOne({ "id": members[i].user });
        const user_name = user.name;
        const role = await roleModel.findOne({ "id": members[i].role });
        const role_name = role.name;
        const x = {
          "id": members[i].id,
          "community": members[i].community,
          "user": {
            "id": members[i].user,
            "name": user_name
          },
          "role": {
            "id": members[i].role,
            "name": role_name
          },
          "created_at": members[i].created_at
        }
        data.push(x);
      }
      const total = await memberModel.countDocuments();
      const pages = Math.ceil(total / limit);
      data = {
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
      res.send(data);
    } catch (err) {
      console.log(err);
      res.send("Somethings went wrong.")
    }
  }

  module.exports = membersOfCommunity;