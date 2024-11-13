const { User } = require('../../models/models');
const { encryptPassword } = require('../../utils/encryptDecrypt');
const jwt = require('jsonwebtoken');
const Op = require('sequelize');

const secret = process.env.PASS_SEC;

async function handleCreateUser(req, res){
    try{
        const {username, email, password, roleId} = req.body;
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

        if(roleId) user['roleId'] = roleId;
 
        try {
            const result = await User.create(user);
            let data = {
                'token': token, 
                'userId:': result.userId,
                'username': result.username,
                'email': result.email,
                'roleId:': result.roleId
            };
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


async function handleDeleteUser(req, res){
    try{
        const userId = req.params.userId;

        console.log(userId);
        
        const result = await User.destroy({where: { userId } });

        return res.status(200).json({
            "success": true,
            "result": result
        });
    }
    catch (err) {
        console.error('Error in controller/user/user.js:', err);
        return res.status(400).json({ error: err });
    } 
}


async function handleUpdateUser(req, res){
    try{
        const userId = req.params.userId;
        const data = req.body;

        if (!userId){
            return res.status(404).json("please provide user Id...");
        }

        const user = await User.findOne({ where: { userId: userId } });

        if (!user){
            return res.status(404).json("please provide valid user Id...");
        }

        let data_to_update = {}
        
        for (let field in data){
            if (data[field]){
                data_to_update[field] = data[field];
            }
        }

        const result = await User.update(
            data_to_update,
            {
              where: {
                userId: userId,
              },
            },
        );

        if (result[0] > 0){
            return res.status(200).json({ "success": true });
        }
        else{
            return res.status(404).json("update failed, please check your data...");
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json("internal server error");
    }
}

async function handleGetUser(req, res){
    try{
        const userId = req.params.userId;
        if(!userId) return res.status(404).json({ 'error':'user Id not found' });

        const user = await User.findByPk(userId);

        const updatedUser = await User.findOne(
            { where: { userId: userId }
        });

        return res.status(201).json({ updatedUser });
    }
    catch(err){
        console.log("error in controllers/user/user.js", err);
        return res.status(500).json("internal server error");
    }
}


module.exports = { 
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
    handleGetUser
};

