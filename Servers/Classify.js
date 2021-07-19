const classifys =[
    {Id:1,Name:'Phone',Count:4,NameProduct:'Phone'},
    {Id:2,Name:'Tablet',Count:4,NameProduct:'Phone'},
    {Id:3,Name:'Laptop',Count:4,NameProduct:'Phone'},
    {Id:4,Name:'PC',Count:4,NameProduct:'Phone'},
    {Id:5,Name:'Accessories',Count:4,NameProduct:'Phone'}
   
]
exports.get=function getAllClassiify(){
return classifys
}

exports.getOne=function getOneClassiify(Id){
   const classify =classifys.filter((st)=> st.Id==Id)[0] || null
   return classify
    };