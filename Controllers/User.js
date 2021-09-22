const UserService=require('../Servers/User')
const bcrypt = require('bcryptjs')

exports.login=async function login(username,password){
const user =await UserService.login(username)
if(!user){
    return null
}
const checkPass =await bcrypt.compare(password,user.password)
if(!checkPass){
    return null
}

return {id: user._id, username: user.username}
}
//REGISTER
exports.register=async function register(username,password,password_confirmation){
   
    if(password != password_confirmation){
        return null
    }
    let user =await UserService.login(username)
    if(user){
        return null
    }
 const salt = await bcrypt.genSalt(10);
 const hash = await bcrypt.hash(password, salt);
 user = await UserService.register(username,hash)
return {id: user._id}
    }