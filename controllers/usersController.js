//Controller are where all business logic are stored
import User from "../model/User.js"

// @description Register users
// @route Post /api/v1/users/register
// @access Private/Admin
// Only developer of application can register admin

export const registerUserController = async(req, res)=>{
    const{username, email, password} = req.body;
    //Check if user exist
    const userExists = await User.findOne({ email });
    if(userExists){
        res.json({
            msg: 'User alrdy exist'
        })
    }
    //Hash password

    //create user
    const user = await User.create({
        username, 
        email, 
        password,
    });
    res.status(201).json({
        status: 'success',
        msg: 'User registered succesfully',
        data: user,
    })
};