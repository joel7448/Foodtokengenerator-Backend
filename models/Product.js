const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema(
    {
       
        Productname : { type: String, required: true, unique:true},
        category: { type: String, required: true },
        ratings : { type: Number, required: true},
        description : { type: String, required: true},
        price : { type: Number, required: true},
        isable : { type: Boolean, required: true,},
        image : { type: String, required: true},

    },
    {
      timestamps: true,
    }
  );

  module.exports = mongoose.model("Products", ProductSchema);