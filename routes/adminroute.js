const router = require("express").Router();
const jwt = require("jsonwebtoken");
const adminUser = require("../models/admin");
const bcrypt = require("bcryptjs");




//admin register route
router.post("/register",async function (req, res){
 
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  req.body.password = hash;
    const newadminUser = new adminUser({
        firstname: req.body.firstname,
        lastname:req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        address:req.body.address,
      });
      try {
        const user = await newadminUser.save();
        res.status(201).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
})


//Admin login route
router.post("/signin",async(req, res) => {
    try{
  const user = await adminUser.findOne({email:req.body.email});
  
  if(user){
    // console.log(req.body.password);
   
   const bytes = await bcrypt.compare(req.body.password, user.password);
   console.log(bytes);
   if(bytes){
  
    const token = jwt.sign({_id:user._id},process.env.SECRET,{expiresIn:"5d"});
 
    res.json({
      message : "Successfully logged in",
      userid : user._id,
      token
    })
    
   }
   else{
    res.status(401).json({
      message : "Invalid password"
    });
   }
  }
  else{
    res.status(401).json({
      message : "Invalid username"
    });
  }
  
    }
    catch(error){
      res.status(500).json({
        message : error
      });
    }
  })


module.exports = router;