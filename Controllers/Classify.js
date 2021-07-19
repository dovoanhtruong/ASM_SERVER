const ClassifyServer=require('../Servers/Classify')

exports.get=function getAllClassiify(){
return ClassifyServer.get();
}
exports.getOne=function(id){
    return ClassifyServer.getOne(id);
    }