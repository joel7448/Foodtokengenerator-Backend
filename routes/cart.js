const router = require("express").Router();
const jwt = require("jsonwebtoken");
const carts = require("../models/Carts");
const authenticate = require("../verifytoken")

// Add to cart

router.post("/cart",authenticate,async function (req, res) {
   const email = await carts.find({customer:req.body.email , Productname:req.body.Productname});
   console.log(email.length);

if(email.length==0){
    const newcart = new carts({
        customer : req.body.email,
        Productname : req.body.Productname,
        category : req.body.category,
        ratings : req.body.ratings,
        description : req.body.description,
        price : req.body.price,
        quantity : req.body.quantity,
        total : req.body.price * req.body.quantity,
        image : req.body.image
    })

    try{
    
    const carts = await newcart.save();
    res.status(200).json(carts);

}

catch(err){
    res.status(500).json(err)
    console.log(err);
}
}
else{
  console.log("already there");
}

})


//GET CART ITEMS
router.get("/cart/:id",authenticate,async function(req,res){

    try{

        const pipeline = await carts.aggregate( [
            {
              '$match': {
                'customer': `${req.params.id}`
              }
            }, {
              '$group': {
                '_id': '', 
                'Amount': {
                  '$sum': '$total'
                }
              }
            }, {
              '$project': {
                'Amount': 1, 
                '_id': 0
              }
            }
          ])
        


        const cart = await carts.find({customer:req.params.id});
        
        res.status(200).json({cart,pipeline});
      

    }
    catch(err){
    console.log(err);
res.status(500).json(err);
    }
})


//DELETE CART ITEMS 
router.delete("/cart/:id",authenticate,async function(req,res){
    try{
        
        const cartitems = await carts.findOne({_id:req.params.id});
        
       if(cartitems){
        await carts.deleteOne({_id:req.params.id});
        res.status(200).json("successfully deleted");
       }
       else{
        res.status(404).json("404 Not Found");
       }
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);

    }
})

//UPDATE INCREASE QUANTITY 
router.put("/cart/increase/:id",async function(req,res){
    try{
        const cartitems = await carts.findOne({_id:req.params.id});
        console.log(req.params.id)
        if(cartitems){
            const price = cartitems.price;
            console.log(price);
            await carts.updateOne({
_id : req.params.id
            },{
              $inc : {quantity:1,total:price}
           
            })

        }
        res.status(200).json(cartitems);
        console.log("added");
    }
    catch(err){

    }
})

//UPDATE DECREASE QUANTITY
router.put("/cart/decrease/:id",async function(req,res){
    try{
        const cartitems = await carts.findOne({_id:req.params.id});
        console.log(req.params.id)
        if(cartitems){
            const price = cartitems.price;
            if(cartitems.quantity!=1){
            await carts.updateOne({_id : req.params.id},{$inc : {quantity:-1,total:-price}})
            
            }
            else{
                await carts.deleteOne({_id:req.params.id});
            }
        }
        res.status(200).json(cartitems);
        console.log("added");
    }
    catch(err){

    }
})




module.exports = router