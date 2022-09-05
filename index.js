const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/users")
const productRoute = require("./routes/products");
const CartRoute = require("./routes/cart");
const adminRoute = require("./routes/adminroute");
const MailRoute = require("./routes/mail");
dotenv.config();

app.use(cors({
    origin:"*"
}))

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });


//middleware
app.use(express.json());

app.use("/server/users",userRoute);
app.use("/server/products",productRoute);
app.use("/server/addtocart",CartRoute);
app.use("/server/admin",adminRoute)
app.use("/sever/nodemailer",MailRoute);
app.get("/", (req, res) =>
  res.send(`Server Running`)
)

  app.listen (process.env.PORT||8800  ,()=>{
    console.log("Backend server is runing");
  })


