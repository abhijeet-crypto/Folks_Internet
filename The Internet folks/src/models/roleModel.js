const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new mongoose.Schema({
    id: { 
     type: String, 
     unique: true, 
     required: true 
    },
    name: {
     type: String, 
     maxlength: 64 
    },
    created_at: {
     type: Date 
    },
    updated_at: {
     type: Date 
    },
  });

const roleModel= mongoose.model("role", roleSchema)
module.exports = roleModel;