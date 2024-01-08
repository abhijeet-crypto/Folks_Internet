const userModel = require('../../models/userModel');
const communityModel = require('../../models/communityModel');

const getCommunityData = async(req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      let data = await communityModel.find().skip(skip).limit(limit);;
      // res.send(data);
      let response = [];
      for (let i = 0; i < data.length; i++) {
        const owner = await userModel.findOne({ "id": data[i].owner });
        // res.send(data[i].owner);
        let x = {
          "id": data[i].id,
          "name": data[i].name,
          "slug": data[i].slug,
          "owner": {
            "id": data[i].owner,
            "name": owner['name']
          },
          "created_at": data[i].created_at,
          "updated_at": data[i].updated_at
        }
        response.push(x)
      }
      const total = await communityModel.countDocuments();
      const pages = Math.ceil(total / limit);
      response = {
        "status": true,
        "content": {
          "meta": {
            "total": total,
            "pages": pages,
            "page": page
          },
          "data": response
        }
      }
      res.send(response);
    } catch (err) {
      console.log(err);
      res.send("Somethings went wrong.");
    }
  }

  module.exports = getCommunityData;