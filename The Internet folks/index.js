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
const{ communitySchema}=require('./src/models/communityModel.js');
const {userSchema}=require('./src/models/userModel.js');
const {roleSchema}=require('./src/models/roleModel.js');
const {memberSchema}=require('./src/models/memberModel.js');
const mongoose=require('mongoose');
const router = express.Router();
const userController = require("./src/controllers/userController.js");
const authMiddleware = require("./src/middlewares/authMiddleware");

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


router.post("/auth/signup", userController.signup);
router.post("/auth/signin", userController.signin);
router.get("/auth/me", authMiddleware.verifyToken, userController.me);


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});