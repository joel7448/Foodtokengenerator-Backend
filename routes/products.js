const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Product = require("../models/Product");
const authenticate = require("../verifytoken")


router.post("/menu",authenticate,async function(req,res){

    const newproduct = new Product({
     
        Productname : req.body.Productname,
        category : req.body.category,
        ratings : req.body.ratings,
        description:req.body.description,
        price : req.body.price,
        isable : false,
        image : req.body.image
    })
    try{
        const product = await newproduct.save();
        console.log(product);
        res.status(201).json(product);

    }
    catch(err){
        console.log(err);
    res.status(500).json(err);
    }
})

//get
router.get("/menu",authenticate,async function(req,res){
    try{
        const menu = await Product.find();
        res.status(200).json(menu);
      

    }
    catch(err){
    
res.status(500).json(err);
    }
})


router.delete("/menu/:id",authenticate,async function(req,res){
    try{
await Product.findByIdAndDelete({_id:req.params.id})
res.status(200).json("deleted")
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

router.put("/menu/:id",async function(req,res){
    try{
const product = await Product.findByIdAndUpdate({_id:req.params.id},{
    $set:{ Productname : req.body.Productname,
        category : req.body.category,
        ratings : req.body.ratings,
        description:req.body.description,
        price : req.body.price,
        isable : false,
        image : req.body.image}
});
res.status(200).json(product);
    }
    catch(err){
res.status(500).json(err);
console.log(err);
    }
})



module.exports = router