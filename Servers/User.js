const users=[
    {id:1,username:'admin',password:'123'},
    {id:2,username:'admin2',password:'123'}
]
exports.login=function login(username){
    const user=users.filter(us =>us.username==username)[0] || null
    return user
}