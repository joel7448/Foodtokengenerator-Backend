const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Mail = require("../models/Mail");
const authenticate = require("../verifytoken")
const nodemailer = require("nodemailer");
const MailMessage = require("nodemailer/lib/mailer/mail-message");



//User register route
router.post("/token/:id",async function (req, res){

  const find = await Mail.find();
console.log(req.body);

if(find.length==0){
    var element = 1;
}
else{
    element = find[find.length-1].order_token+1;
}
console.log(element);
const months = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
const month = new Date().getMonth();
    const newMail = new Mail({
       email : req.params.id,
       id:element,
       status:"not ready",
       Amount:req.body.amt,
       order_token:element,
       month:months[month]
      });
    
   

  

    
    
    
      try {
        const mailer = await newMail.save();

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'joel.joel52@gmail.com',
              pass: process.env.PASS
            }
          });

          var mailOptions = {
            from: 'joel.joel52@gmail.com',
            to: `${req.params.id}`,
            subject: 'AMIGOS Order Token no.',
            html:`<h1>Your Order Token :${element}</h1> <p>Payable amount :$ ${req.body.amt}</p>`
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              res.json({
                message:"Error"
            })
            } else {
              console.log('Email sent: ' + info.response);
              res.json({
                message: "Verification code has been sent to your mail"
               
            })
            }
          });
        


        res.status(201).json(mailer);
      } 
      catch (err) {
        res.status(500).json(err);
      }
})


router.get("/token/:id",authenticate,async function(req,res){
  try{
      const menu = await Mail.find({email:req.params.id});
      res.status(200).json(menu);
    

  }
  catch(err){
  
res.status(500).json(err);
  }
})


//for admin dashboard
router.get("/token",authenticate,async function(req,res){
  try{
    const orders = await Mail.find();
    res.status(200).json(orders);
  }
  catch(err){
    res.status(500).json(err);
  }
})


router.get("/token/filter/:id",authenticate,async function(req,res){
  try{
const token = await Mail.findOne({order_token:req.params.id});
res.status(200).json(token);
  }
  catch(err){
    res.status(500).json(err);
  }
})

//Order token ready
router.put("/token/:id",async function(req, res){
  try{
    const result = await Mail.findOneAndUpdate({order_token:req.params.id},{
      $set:{status:"ready"}
    }
    );
    res.status(200).json(result);
  }
  catch(err){
    res.status(500).json(err);
  }
})

//Delete order

router.delete("/token/:id",async function(req, res){
  try{
    const result = await Mail.findOneAndDelete({order_token:req.params.id});
    res.status(200).json(result);
  }
  catch(err){
    res.status(500).json(err);
  }

    })
 module.exports = router