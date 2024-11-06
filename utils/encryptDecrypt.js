const CryptoJS = require('crypto-js');
const { User } = require('../models/models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv').config();


async function encryptPassword(password){
    if(!password) return console.error("please provide valid password");
    
    const doc = CryptoJS.AES.encrypt(
        password,
        process.env.PASS_SEC
      ).toString()
    
    return doc;
}


async function authenticateUser(email, password){

    const user = await User.findOne({
        where:{
            email:{
                [Op.eq]: email
            }
        }
    });

    if (!user) return false;

    const hashedPassword = CryptoJS.AES.decrypt(
        user.passwordHash,
        process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    console.log("decrepted password:", originalPassword);

    if (password !== originalPassword) return false; 

    const userToken = jwt.sign({ email: user.email }, process.env.PASS_SEC, {
        expiresIn: "1d",
    });

    let userInfo = {
        "token": userToken,
        "id": user.get({ plain: true }).userId,
        "username": user.get({ plain: true }).username,
        "email": user.get({ plain: true }).email
    }

    return userInfo;
}


module.exports = {
    encryptPassword,
    authenticateUser
}