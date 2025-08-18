const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  FirstName:{
    type:String,
    required:[true,'fName is required'],
  },
  LastName:String,
  email:{
    type:String,
    required : [true,'email is required'],
  },
  password:{
    type:String,
    required : [true,'password is required'],

  },
  userType:{
    type:String,
    enum:['guest','host'],
    default:'guest',
  },
  favourites:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Home',
  }],
  bookings:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Home',
  }],
});


module.exports = mongoose.model("user", userSchema);
