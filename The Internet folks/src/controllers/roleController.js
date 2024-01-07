// roleController.js
const roleModel = require("../models/roleModel");

const roleController = {
  createRole: async (req, res) => {
    const { name } = req.body;

    try {
      if (name.length < 2) {
        return res.send("Name should contain a minimum of 2 characters");
      }

      const id = uuid.v4();
      const currentDate = new Date();
      
      const newRole = {
        id,
        name,
        created_at: currentDate,
        updated_at: currentDate,
      };

      const role = new roleModel(newRole);

      await role.save();

      const response = {
        status: true,
        content: {
          data: role,
        },
      };

      res.send(response);
    } catch (error) {
      console.error(error);
      res.send("Something went wrong.");
    }
  },

  getRoles: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const roles = await roleModel
        .find()
        .skip(skip)
        .limit(limit);

      const data = roles.map((role) => ({
        id: role.id,
        name: role.name,
        created_at: role.created_at,
        updated_at: role.updated_at,
      }));

      const total = roles.length;
      const pages = Math.ceil(total / limit);

      const response = {
        status: true,
        content: {
          meta: {
            total,
            pages,
            page,
          },
          data,
        },
      };

      res.send(response);
    } catch (error) {
      console.error(error);
      res.send("Data not found.");
    }
  },
};

module.exports = roleController;
