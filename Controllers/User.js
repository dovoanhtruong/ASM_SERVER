const UserService=require('../Servers/User')

exports.login=function login(username,password){
const user = UserService.login(username)
if(!user){
    return null
}
if(user.password != password){
    return null
}

return true
}