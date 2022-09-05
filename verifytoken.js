const jwt = require("jsonwebtoken");

let authenticate = function (req, res, next) {

    if (req.headers.authorization) {
     try {
      let verify = jwt.verify(req.headers.authorization, process.env.SECRET);
    
      if (verify) {
        req.userid = verify._id;
        
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" }); 
      }
     } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
     }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  };

  module.exports = authenticate;