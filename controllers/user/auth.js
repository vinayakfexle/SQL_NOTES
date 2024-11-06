const { User } = require('../../models/models');
const { authenticateUser, encryptPassword } = require('../../utils/encryptDecrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.PASS_SEC;


async function handleRegister(req, res){
    console.log('register user');try{
        const {username, email, password} = req.body;
        if (!username || !email || !password){
            return res.status(400).json("bad request, Please provide valid data..!");
        }

        let encryptedPwd = await encryptPassword(password);

        const token = jwt.sign({
            "email": email
        }, secret);

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


module.exports = {
    handleRegister,
    handleLogin
}