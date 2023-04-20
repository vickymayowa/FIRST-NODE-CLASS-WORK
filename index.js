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
  console.log(form)
  form.save()
  .then((response)=>{
    res.redirect("/signin")
    res.render("index",{message:"Registration Completed"})
    console.log("SuccessFully Saved into the Database");
    console.log(response)
    res.render("index",{message:"Registration Completed"})
  })
  .catch((error)=>{
      if (error.code === 11000) {
          console.log(error.code);
          res.render("index",{message:"Email already exist"})
      } else {
          res.render("index", {message:"Please fill in all fields"})
      }
  })
})

app.get("/dashboard", (req, res) => {
  userModel.find()
      .then((response) => {
          console.log(response);
          console.log("User Accessed the DashBoard")
          res.render("dashboard", {response})
      })
      .catch((err) => {
      console.log(err)
  })
})
          // Edit User
app.post("/edit",(req,res)=>{
  userModel.findOne({email:req.body.userEmail})
  .then((response)=>{
      console.log(response);
      res.render("editUser", {userDetails:response})
  })
})

app.post("/update", (req,res)=>{
  let id = req.body.id
  userModel.findByIdAndUpdate(id, req.body)
  .then((response)=>{
      console.log(response);
      res.redirect("dashboard")
  })
  .catch((err)=>{
      console.log(err);
  });
})


app.post("/delete",(req,res)=>{
  userModel.findOneAndDelete({email:req.body.userEmail})
  .then((response)=>{
    console.log(response);
    res.redirect("dashboard")
    console.log("Deleted SuccessFully");
    console.log("Admin Deleted A User")
  })
  .catch((error)=>{
    console.log(error);
  })
})

app.post("/signin", async (req,res) =>{
  const { email, password } = req.body
    const user = await userModel.findOne({ email })
  if(user.password === password ){
    res.render("signin", {message: "LOGIN SUCCESSFULLY"})
    console.log("User Entered Valid Email And Password")
    res.redirect("/dashboard")
  } else {
    res.render("signin", {message: "invalid Email or Password"})
    console.log("User entered Wrong Details")
  }
})

app.get("/dashboard",(req,res)=>{
  res.render("/dashboard")
  console.log("User Valid the DashBoard")
})

        // set ejs as your view engine
app.set('view engine','ejs')
        // creating a route 
app.get("/index",(req,res)=>{
    console.log("Thanks FOR VISTING ME<<<<>>>>")
    // res.send('Hello coming from the backend')
    res.render('index', {message: ''})
})

    // creating a server code
app.listen("3500",()=>{
    console.log("Server Has Started<<<<<rs>>>>>")
    console.log("Server Started on port 3500")
})

