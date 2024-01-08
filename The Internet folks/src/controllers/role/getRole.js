const roleModel = require('../../models/roleModel');

const getRole = async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    roleModel.find().skip(skip)
      .limit(limit)
      .then(result => {
        let data = [];
        for (let i = 0; i < result.length; i++) {
          const x = {
            "id": result[i].id,
            "name": result[i].name,
            "created_at": result[i].created_at,
            "updated_at": result[i].updated_at,
          }
          data.push(x);
        }
        const total = result.length;
      const pages = Math.ceil(total / limit);
        const response = {
          "status": true,
          "content": {
            "meta": {
              "total": total,
              "pages": pages,
              "page":page
            },
            "data": data
          }
        }
  
        res.send(response)
  
      }).catch(err => res.send("data not found"));
  }

  module.exports = getRole;
  