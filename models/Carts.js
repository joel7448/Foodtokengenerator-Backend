const mongoose = require('mongoose');


// const CartSchema = new mongoose.Schema(
//     {
//        customer:{type:String},
//        cart:[{
//         Productname : { type: String },
//         category: { type: String },
//         ratings : { type: Number},
//         description : { type: String},
//         price : { type: Number},
//        image : { type: String},
//        quantity : { type: Number},
//        total : { type: Number},
//        }]
        
      
//       },
//     {
//       timestamps: true,
//     }
//   );

const CartSchema = new mongoose.Schema({

customer : { type: String, required: true},
Productname : { type: String, required: true},
category : { type: String, required: true},
ratings : { type: String, required: true},
description : { type: String, required: true},
price: { type: Number, required: true},
image: { type: String, required: true},
quantity: { type: Number, required: true},
total: { type: Number, required: true},

},
{
  timestamps:true,
});

  module.exports = mongoose.model("Carts", CartSchema);