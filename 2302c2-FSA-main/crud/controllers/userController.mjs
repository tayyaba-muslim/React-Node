import User from "../models/user.mjs";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

const getAllUsers=async(req,res)=>{
try {
    const users= await User.find();
if(users.length > 0){
    res.json({msg:"Showing our users!", users:users})   
}else{   
    res.status(404).json({msg:"No users found"})
}  
} catch (error) {
    res.status(500).json({msg:error})
}
}

//Registration / Signup
const Signup=async(req,res)=>{
try {
    const checkUser= await User.findOne({email:req.body.email});
if(checkUser){
    res.json({msg:"User already exists!"}) 
}else{  
    //hashing
    bcrypt.hash(req.body.password, 15).then(async function(hash) {

    // Store hash in your password DB.
     const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:hash,
        profilePicture:req.body.profilePicture,
    })
    
    const addUser= await User.insertOne(newUser);
    if (addUser) {
        res.json({msg:"Signup Successfull!", user: addUser}) 
        
} else {
    
    res.status(400).json({msg:"Failed to register user right now..!"})
}

});
   
}  
} catch (error) {
    res.status(500).json({msg:error})
}
}


// login 
let Login= async(req, res) => {

const checkUser= await User.findOne({email:req.body.email});

if(!checkUser){
  res.json({msg:"User does not exists. Please register first."}).status(200);

}else{
  const match = await bcrypt.compare(req.body.password, checkUser.password);

    if(match) {

      const token= await jwt.sign({email:checkUser.email,role:checkUser.role},process.env.JWT_SECRET,{ expiresIn: '2h'})

      res.json({msg:"User Logged in successfully.", user :checkUser,token:token}).status(200);
    }

else{
  res.json({msg:"Invalid Credentials."}).status(400);

}
};

}

 //through Authorization headers bearer
    const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    

    // Optionally attach decoded data to request for downstream use
    req.user = decoded;
    console.log(decoded)


    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: 'Invalid or expired token' });
  }
};



//Node Mailer (User Verification)
const sendVerification=async (req,res)=>{
  try {
  
     const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let sendMailStatus= await transporter.sendMail({
    from: `"Verify Email" <${process.env.EMAIL_USER}>`,
  to:req.body.email,
 html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify Your Account</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 6px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #007BFF;
      color: white;
      padding: 15px;
      text-align: center;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
    .content {
      padding: 20px;
      font-size: 16px;
      color: #333333;
    }
    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 24px;
      background-color: #007BFF;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }
    .footer {
      margin-top: 30px;
      font-size: 13px;
      color: #777777;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Verify Your Account</h2>
    </div>
    <div class="content">
      <p>Dear User,</p>
      <p>Thank you for signing up. To complete your registration, please verify your account by clicking the button below:</p>
      
      <a href="http://localhost:3000/verify?token=YOUR_VERIFICATION_TOKEN" class="btn">Verify My Account</a>

      <p>If you did not create this account, you can ignore this email.</p>
    </div>
    <div class="footer">
      &copy; 2025 Your Company. All rights reserved.
    </div>
  </div>
</body>
</html>
`,
    subject:`Verify your email..!`,
  });
  if(sendMailStatus){
    res.status(200).json({message:"Email sent successfully"})
}else{
      res.status(400).json({message:"Email sending failed"})

  }

} catch (error) {
    res.status(500).json({msg:error})
}
}

//Change Activation Status of User (Admin route)

let ChangeActivationStatus= async(req, res) => {
try {
    const id =req.params.id;
  let newStatus =req.params.status;
  console.log(newStatus);

  if(newStatus =="active"){
    newStatus=true;
  }else if(newStatus =="deactive"){
    newStatus=false;
  }else{
    newStatus=true
  }
const changeActivationStatus= await User.updateOne({_id:id},{isActive:newStatus});
if(!changeActivationStatus){
  res.json({msg:"Failed to update status right now."}).status(200);
  
}else{
  res.json({msg:"User status updated successfully."}).status(200);  
};
} catch (error) {
  console.log(error)
  res.json({msg:error})
}
}

const userController= {getAllUsers,Signup,Login,auth,sendVerification, ChangeActivationStatus}
export default userController