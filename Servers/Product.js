var products =[
    {Id:1,Image:'https://cdn.tgdd.vn/Products/Images/42/213031/iphone-12-violet-1-600x600.jpg',Name:'Samsung galaxy S10',Info:'Snap880/Ram8G/Rom64G',Count:5,Price:500,Classify:'Phone'},
    {Id:2,Image:'https://cdn.tgdd.vn/Products/Images/42/213031/iphone-12-violet-1-600x600.jpg',Name:'IPhone 6s',Info:'Snap880/Ram8G/Rom64G',Count:5,Price:500,Classify:'Phone'},
    {Id:3,Image:'https://cdn.tgdd.vn/Products/Images/42/213031/iphone-12-violet-1-600x600.jpg',Name:'Xiaomi mi8',Info:'Snap880/Ram8G/Rom64G',Count:5,Price:500,Classify:'PC'},
    {Id:4,Image:'https://cdn.tgdd.vn/Products/Images/42/213031/iphone-12-violet-1-600x600.jpg',Name:'Oppo Find7',Info:'Snap880/Ram8G/Rom64G',Count:5,Price:500,Classify:'Phone'},
    {Id:5,Image:'https://cdn.tgdd.vn/Products/Images/42/213031/iphone-12-violet-1-600x600.jpg',Name:'Bphone 3',Info:'Snap880/Ram8G/Rom64G',Count:5,Price:500,Classify:'Phone'}
]

const productModels=require('../models/productModels')

exports.get=async function getAllProduct(){
return  await productModels.find();
}
exports.getOne=async function getOneProduct(id){
    return await productModels.findById(id)
     };
     exports.delete=async (id)=>{
      await productModels.remove({_id: id})
    };

    exports.update=async (st)=>{
let row=await productModels.findById(st.id);
if(row){
    row.name=st.name;
    row.info=st.info;
    row.count=st.count;
    row.price=st.price;
    row.classify=st.classify;
    row.image=st.image ? st.image : row.image;
    await row.save()
}
    }

    
    exports.insert=async (st)=>{
        const product=new productModels(st)
        await product.save() 
       
    }