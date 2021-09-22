var classifys =[
    {Id:1,Name:'Phone',Count:4,Product:'Phone',Date:'2020-05-17'},
    {Id:2,Name:'Tablet',Count:4,Product:'Phone',Date:'2020-05-17'},
    {Id:3,Name:'Laptop',Count:4,Product:'Phone',Date:'2020-05-17'},
    {Id:4,Name:'PC',Count:4,Product:'Phone',Date:'2020-05-17'},
    {Id:5,Name:'Accessories',Count:4,Product:'Phone',Date:'2020-05-17'}
   
]

const classifyModels = require('../models/classifyModels')

exports.get=async () =>{
return await classifyModels.find();
}

exports.getOne=async(id)=>{
    return await classifyModels.findById(id)
    };

    exports.delete=async (id)=>{
        await classifyModels.remove({_id: id})
      };
exports.update=async (st)=>{
    let row=await classifyModels.findById(st.id);
    if(row){
        row.name=st.name;
        row.count=st.count;
        row.product=st.product;
        row.date=st.date;
        await row.save()
    }
}
exports.insert=async(st)=>{
    const classify=new classifyModels(st)
    await classify.save() 
   
}