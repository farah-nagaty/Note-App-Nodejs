// Dot Env
require ("dotenv").config();
// Express
const express = require ("express");
const app = express();
// Middleware
app.use(express.json());
// Port
const port = process.env.PORT || 5000;
// Datbase Connection
 const mongoose = require("mongoose");

async function dbconnection() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected!");
    } catch (error) {
        console.log(error);
    }
    
}

const authRoutes = require ("./routes/authRoutes");

app.use("/api", authRoutes);


dbconnection();
// Run Server "Listen"

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
});