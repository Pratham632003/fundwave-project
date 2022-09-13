const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "PrathamKhandelwalIsAGoodBoy";
const JWT_EXPIRE = "2d";
const crypto = require("crypto")

const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: [true , "Please Enter Your Name"],
        maxlength: [30 , "Name cannot exceed 30 characters"],
        minlength: [3 , "Name should have more than 3 characters"]
    },
    email:{
        type: String,
        required: [true , "Please Enter Your Emain"],
        unique: true,
        validate: [validator.isEmail , "Please Enter a valid Email"]
    },
    password:{
        type: String,
        required: [true , "Please Enter Your Password"],
        minlength: [4 , "Password should be greater than 4 characters"],
        select: false
    },
    attendance:{
      type: String,
      default: "Absent"
    },
    // avatar:{
    //   public_id:{
    //     type: String,
    //     required: true,
    //   },
    //   url:{
    //     type: String,
    //     default: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
    //     required: true,
    //   },
    // },
    role: {
        default: "user",
        type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    
    resetPasswordToken: String,
    resetPasswordExpire: Date,

  });

  UserSchema.pre("save" , async function(next){

    if(!this.isModified("password")){
      next();
    }
    this.password = await bcrypt.hash(this.password , 10);
  })

  // JWT TOKEN
  UserSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id} , JWT_SECRET,{
      expiresIn: JWT_EXPIRE,
    });
  }

  // Compare Password
  UserSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
  }

  // Generating Password Reset Token
  UserSchema.methods.getResetPasswordToken = function(){

    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
    
    // Hashing and adding resetPasswordToken to UserSchema
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

    this.resetPasswordExpire = Date.now() + 15*60*1000;
    
    return resetToken;
  }

  const user = mongoose.model('User', UserSchema);
  module.exports = user;