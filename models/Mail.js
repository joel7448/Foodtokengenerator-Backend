const mongoose = require('mongoose');


const NodeMailerSchema = new mongoose.Schema({


email : { type: String, required: true},
id:{type:Number, required: true},
status:{ type: String, required: true},
order_token:{type:Number, required: true},
Amount:{type:Number, required: true},
month:{type:String,required:true}

},
{
    timestamps:true
}
)

module.exports = mongoose.model("Mail", NodeMailerSchema);

