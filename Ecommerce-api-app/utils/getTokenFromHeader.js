export const getTokenFromHeader = (req)=>{
    //used ? for to check if it exist(like a and)
    const token = req?.headers?.authorization?.split(" ")[1];
    if(token === undefined){
        return 'No token found'
    }
    return token;
}