const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User }  = require('../models/models.js');
require('dotenv').config();

console.log(User);
const secret = process.env.PASS_SEC;

async function restrictToAuthorisedUserOnly(req, res, next) {
    try{
        const authToken = req.headers.authorization?.split(" ")[1];
        
        if (!authToken) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const payload = await jwt.verify(authToken, secret);
        if (!payload) {
            return res.status(401).json({ error: "You must be Logged In" });
        }
        
        const email = payload.email;

        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user){
            return res.status(401).json({ error: "You must be Logged In" });
        }

        next();
    } catch (error) {
        console.error('error in middleware/auth.js', error);
        return res.status(401).json({ error: "You must be Logged In" });
    }
}

module.exports = restrictToAuthorisedUserOnly;
