const userModel=require('../models/userModel')

const users=[
    {id:1,username:'admin',password:'123'},
    {id:2,username:'admin2',password:'123'}
]
exports.login=async function login(username){
    //const user=users.filter(us =>us.username==username)[0] || null
    const user = await userModel.findOne({username:username}, 'id username password') 
    return user
}

exports.register=async function register(username,password){
    const user = new userModel({username,password})
    return await user.save()
}