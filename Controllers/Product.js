const ProductServer=require('../Servers/Product')

exports.get=async () =>{
return await ProductServer.get();
}
exports.getOne=async (id)=>{
    return await ProductServer.getOne(id);
    }
    
exports.delete=async (id)=>{
   await ProductServer.delete(id);
};
exports.update=async (params,body)=>{
    let{id}=params
    let{name,info,count,price,classify,image}=body
    await ProductServer.update({id,name,info,count,price,classify,image})
}

exports.insert=async (body)=>{
    
    let{name,info,count,price,classify,image}=body
    await ProductServer.insert({name,info,count,price,classify,image})
}