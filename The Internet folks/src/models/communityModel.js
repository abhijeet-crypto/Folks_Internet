const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const communitySchema = new mongoose.Schema({
    id: { 
     type: String, 
     unique: true, 
     required: true 
    },
    name: { 
     type: String, 
     maxlength: 128 
    },
    slug: { 
     type: String,
      maxlength: 255 
    },
    owner: { 
     type: String 
    },
    created_at: { 
     type: Date 
    },
    updated_at: { 
     type: Date 
    },
  },
  {
    timestamps:true,
  });

const communityModel= mongoose.model("community", communitySchema)
module.exports = {communityModel};