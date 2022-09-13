const express = require('express');
const ErrorHandler = require('../utils/errorhandler');
const catchSyncErrors = require('../utils/catchAsyncErrors');
const router = express.Router();
const User = require('../models/User');
const sendToken = require('../utils/jwtToken');
const { isAuthenticatedUser , authorizeRoles } = require('../middleware/isAuthenticatedUser');
const cloudinary = require("cloudinary");

//Register a user
router.post('/register' , catchSyncErrors(async( req , res , next )=>{

    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar , {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale",
    // });

    const {name , email , password , role} = req.body;
    const user = await User.create({
        name , email , password , role ,
        // avatar:{
        //     public_id: myCloud.public_id,
        //     url: myCloud.secure_url,
        // },
    });

    sendToken(user , 200 , res);
})
)

//Login User
router.post('/login' , catchSyncErrors(async( req , res , next )=>{

    const {email , password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please enter Email and Password" , 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password" , 401));
    }
    
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password" , 401))
    }

    sendToken(user , 201 , res);
})
)


// Logout User
router.get('/logout' , catchSyncErrors(async( req , res , next )=>{

    res.cookie("token" , null , {
        expires: new Date(Date.now()),
        httpOnly: true,
    }); 

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})
)

// Update Attendance
router.put('/admin/update/attendance/:id' , isAuthenticatedUser , authorizeRoles("admin") , catchSyncErrors(async( req , res , next )=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("User not found" , 404));
    }

    let attendance = "";
    if(user.attendance === "Present"){
        attendance = "Absent";
    } else {
        attendance = "Present";
    }

    user.attendance = attendance;
    
    await user.save();
    res.status(200).json({
        success: true,
        message: "Attendance Updated"
    })
}));

// Get User Details
router.get('/me' , isAuthenticatedUser, catchSyncErrors( async( req , res , next )=>{
    const user = await User.findById(req.user.id);

     res.status(200).json({
        success: true,
        user,
    });
})
)

// Get All Users                        --> Admin
router.get('/admin/get/users',isAuthenticatedUser , authorizeRoles("admin"), catchSyncErrors( async (req , res) => {

    const userCount = await User.countDocuments();
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
      userCount
    });
})
)



// Get Single User                      --> Admin
router.get('/admin/get/user/:id',isAuthenticatedUser , authorizeRoles("admin"), catchSyncErrors( async (req , res , next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(
            new ErrorHandler(`User does not exixts with id ${req.params.id}` , 404)
        )
    }

    res.status(200).json({
      success: true,
      user
    });
})
)

module.exports = router;