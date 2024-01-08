const express =require('express');
const dotenv = require("dotenv");
dotenv.config();
const bodyParser=require('body-parser');
const app=express();
const port =5000;
const {connectDB} = require('./src/config/database.js');
const ejs =require('ejs');
const cors=require('cors');
const sha256= require('sha256');
const jwt = require('jsonwebtoken');
const uuid =require('uuid');
const mongoose=require('mongoose');
const router = express.Router();
const routes = require('./src/routes');

connectDB();



// Middleware 
app.use(cors());
app.set('view engine','ejs','cors');
app.use(bodyParser.json());

app.use(express.static('public'));





// // Routes

// const roleRoutes=require('./src/routes/roleRoutes');
// const userRoutes=require('./src/routes/userRoutes');
// const communityRoutes=require('./src/routes/communityRoutes');
// const memberRoutes =require('./src/routes/memberRoutes');


// app.use('/v1/role',roleRoutes);
// app.use('v1/auth',userRoutes);
// app.use('v1/community',communityRoutes);
// app.use('v1/member',memberRoutes);


//---Authentication--
app.use('/v1/auth',routes.auth);

//---CommunityRelated---
app.use('/v1/community',routes.community);

//---MemberRelated---
app.use('/v1/member',routes.member);

//--RoleRelated--
app.use('/v1/role',routes.role);


// router.post("/auth/signup", userController.signup);
// router.post("/auth/signin", userController.signin);
// router.get("/auth/me", authMiddleware.verifyToken, userController.me);


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});




