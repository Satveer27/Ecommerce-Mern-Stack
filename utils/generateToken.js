import jwt from "jsonwebtoken";

//payload represent login user
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_KEY, {expiresIn: '3d'})
}

export default generateToken;