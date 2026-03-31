// Call Mongoose
const mongoose = require ("mongoose");
// Create Schema
const noteSchema = new mongoose.Schema({
    content:{
        type:String,
        required: true,
        trim: true
    },
    isComplete:{
        type: Boolean,
        default: false
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }

},{timestamps:true});
// Create Model
const Note = mongoose.model("Note", noteSchema);
// Export Module
module.exports = Note ;