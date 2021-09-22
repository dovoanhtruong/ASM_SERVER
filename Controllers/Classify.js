const ClassifyServer=require('../Servers/Classify')

exports.get=async () =>{
return await ClassifyServer.get();
}
exports.getOne=async (id)=>{
    return await ClassifyServer.getOne(id);
    }

exports.delete=async (id)=>{
    await ClassifyServer.delete(id);
}
exports.update=(params,body)=>{
    let{id}=params
    let{name,count,product,date}=body
    ClassifyServer.update({id,name,count,product,date})
}
exports.insert=async(body)=>{
    let{name,count,product,date}=body
    await ClassifyServer.insert({name,count,product,date})
}