const uuid = require("uuid");
const roleModel = require('../../models/roleModel');

const updateRole = async(req, res) => {
    const name = req.body.name;
    if (name.length < 2) {
      res.send("name shoud contain min 2 characters");
    } else {
      const currentDate = new Date();
      // const dateString = currentDate.toISOString();
      // const snowflake = new Snowflake();
      // const id = Snowflake.generate;
      const id = uuid.v4();
      let new_role = {
        'id': id,
        'name': name,
        'created_at': currentDate,
        'updated_at': currentDate
      }
      let _role = new roleModel(new_role);
  
      _role.save().then(result => res.send({
        "status": true,
        "content": {
          "data": result
        }
      })).catch(err => res.send("something wents wrong."));
  
    }
  }

  module.exports = updateRole;
  