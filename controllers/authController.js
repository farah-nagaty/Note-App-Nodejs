const User = require ("../models/User.js");

const {registerSchema,loginSchema } = require("./validation/authValidation.js");

const register = async (req, res) => {
    try {
        // Get Data Frontend
        // Validate Data --> layers => 3 layer 1-Frontend 2-Backend 3-DB
        
        const{error, value} = registerSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        }) 
        // req.body -> username, email, password
        //Operation Database
        // Response

    } catch (error) {
        
    }
}
const login = async (req, res) => {
    try {
         const{error, value} = loginSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })
    } catch (error) {
        
    }
    
}
const logout = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
    
}
module.exports = {
    register,
    login,
    logout
}