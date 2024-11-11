const { Utils } = require('sequelize');
const { User } = require('../../models/models');
const { authenticateUser, encryptPassword } = require('../../utils/encryptDecrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../../utils/sendEmail');

const secret = process.env.PASS_SEC;


async function handleRegister(req, res){
    console.log('register user');try{
        const {username, email, password} = req.body;
        if (!username || !email || !password){
            return res.status(400).json("bad request, Please provide valid data..!");
        }

        let encryptedPwd = await encryptPassword(password);

        const token = jwt.sign({"email": email}, secret, { expiresIn: '1d' });

        let user = {
            'username':username, 
            'email': email, 
            'passwordHash': encryptedPwd, 
            'token': token
        }

        try {
            const result = await User.create(user);
            let userId = result.dataValues.id;
            let data = {'token': token, user_id: userId};
            return res.status(200).json({"response": data});
        } 
        catch (err) {
            console.error('Error creating user:', err);
            return res.status(400).json({ error: err});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({"error": "internal server error"});
    }
}


async function handleLogin(req, res){
    let { email, password } = req.body;

    const user = await authenticateUser(email, password);

    if (!user){
        return res.status(401).json({"response": "incorrect email id or password"});
    }
    return res.status(200).json(user);
}


async function sendResetPasswordMail(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Please provide a valid email ID." });
        }

        const user = await User.findOne({
            where: { email: email }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found! Please provide a registered email ID." });
        }

        const message = `Hi, please click on the link below to change your password:\n\nClick here: http://localhost:3002/auth/resetpassword`;

        const emailsent = await sendEmail(email, message);

        if (!emailsent) {
            return res.status(500).json({ error: "Internal server error while sending email." });
        }

        user.forgetpassword = true;
        user.save();

        return res.status(200).json({ message: "An email has been sent to reset your password." });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ error: "Internal server error." });
    }
}


async function handleResetPassword(req, res) {
    try{
        const { email, new_password, re_new_password } = req.body;

        if (!email || !new_password || !re_new_password){
            return res.status(404).json({ "error": "required fields missing!" });
        }

        if (new_password !== re_new_password){
            return res.status(404).json({"errer": "new password and re_new_password not matched!"});
        }

        const user = await User.findOne({
            where:{
                email: email
            }
        });

        if (!user) res.status(404).json({"errer": "please enter valid email!"}); 

        const encryptedPwd = await encryptPassword(new_password);

        await user.update({passwordHash: encryptedPwd});

        user.forgetpassword = false;
        await user.save();

        return res.status(200).json({"message": "password changed successfully."});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({"error": "internal server error"});
    }
}


async function handleChangePassword(req, res) {
    try{
        const { email, old_password, new_password } = req.body;

        if (!email || !old_password || !new_password){
            res.status(404).json({"error": "please provide all required fields!"});
        }

        const user = await User.findOne({
            where:{
                email: email
            }
        });

        if (!user) res.status(404).json({"errer": "please enter valid email!"});

        if (old_password === new_password ){
            res.status(400).json({"error": "old password and new password can not be same!"});
        }

        const encryptedPwd = await encryptPassword(new_password);

        await user.update({password: encryptedPwd});

        return res.status(200).json({"message": "password changed successfully."});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({"error": "internal server error"});
    }
}


module.exports = {
    handleRegister,
    handleLogin,
    sendResetPasswordMail,
    handleResetPassword,
    handleChangePassword
}
