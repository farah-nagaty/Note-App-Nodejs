const User = require("../models/User.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//1- sign => login Authentication
//2- verify => Access -> end Protect

const { registerSchema, loginSchema } = require("./validation/authValidation.js");

const register = async (req, res) => {
    try {
        // Get Data Frontend
        // Validate Data --> layers => 3 layer 1-Frontend 2-Backend 3-DB

        const { error, value } = registerSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })
        // req.body -> username, email, password
        if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message)
            })
        }
        //Get Data From Value
        const { username, email, password } = value;
        // User Found Or not
        const existUser = await User.findOne({ email });
        if (existUser) return res.status(400).json({ msg: "User Already Exist" });
        //Hash Password
        const hashPassword = await bcrypt.hash(password, 10);
        //Operation Database "Insert into DB"
        const newUser = await User.create({
            username,
            email,
            password: hashPassword
        })
        // Response
        res.status(201).json({ msg: "Done Create Account" });

    } catch (error) {
        res.status(500).json({ msg: "Server Error" });

    }
}
const login = async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });
        if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message)
            })
        }

        //Get Data From Value
        const { email, password } = value;
        //Check User Found Or not
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Please Create Account First" });
        //Compare password & Hashing Password
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) return res.status(400).json({ msg: "Invalid Password" });
        //Generate Token
        const token = jwt.sign({
            id: user._id,
        },
            process.env.JWT_SK,
            { expiresIn: "1d" });
        //Response
        res.status(200).json({ msg: "Login Success", token });
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }

}
const logout = async (req, res) => {
    try {
        res.status(200).json({ msg: "Logout Success" });
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }

}
module.exports = {
    register,
    login,
    logout
}