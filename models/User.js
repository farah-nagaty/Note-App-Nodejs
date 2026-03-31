// Call Mongoose
const mongoose = require ("mongoose");
// Create Schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type:String,
        required: true
    }

},{timestamps:true});
// Create Model
const User = mongoose.model("User", userSchema);
// Export Module
module.exports = User;