const express = require("express")
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const ejs = require('ejs')
const app = express();
const URI = "mongodb+srv://favouradebanjo603:oluyomiadebanjo@cluster0.ae47tji.mongodb.net/nodework_db?retryWrites=true&w=majority"
mongoose.connect(URI)

.then(()=>{
  console.log("Mongoose HandShake Approved");
  console.log("Mongoose Activated Connected");
})
.catch((err)=>{
  console.log("Mongoose Handshake Disconnected");
 //console.log(err);
})
app.use(bodyParser.urlencoded({extended: true}))

let userSchema = {
    firstname:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
  }
let userModel = mongoose.model("Users_Details", userSchema)
app.get("/signin",(req,res)=>{
  res.render("signin",{message:""})
})
   //storing into the database 
  app.post("/user",(req,res)=>{
  console.log(req.body);
  let form = new userModel(req.body)
  console.log(form);
  form.save()
  .then((response)=>{
      res.send("index",{message:"Registration Completed"})
      console.log("successfully saved");
      console.log(response)
      // res.render("index",{message:"Registration Completed"})
      res.redirect("/signin")
  })
  .catch((err)=>{
      console.log(err);
      if (err.code === 11000) {
          console.log(err.code);
          res.render("index",{message:"Email already exist"})
      } else {
          res.render("index", {message:"Please fill in all fields"})
      }
  })
})

// app.post("/user", async (req,res)=>{
//   try {
//       const user = await userModel.create(req.body) 
//       if(user) {
//         res.render("index",{message:"Registered SuccessFully"})
//         console.log(user)
//         res.redirect("/signin")
//               if (error.code === 11000) {
//         res.render("index",{message:"Email already exist"})
//         console.log(error.email);
//      } else {
//       res.render("index", {message:"Please fill in all fields"})
//       // console.log("User Didnt fill all fields");
//         }
//     }   
//     } catch (error) {
//       console.log(error)
//     }
// })

        // set ejs as your view engine
app.set('view engine','ejs')
        // creating a route 
app.get("/index",(req,res)=>{
    console.log("Thanks FOR VISTING ME<<<<>>>>")
    // res.send('Hello coming from the backend')
    res.render('index', {message: ''})
})
    // calling on body parser

    // creating a server code
app.listen("3500",()=>{
    console.log("Server Has Started<<<<<<<<>>>>>>>>")
    console.log("Server Started on port 3500")
})

