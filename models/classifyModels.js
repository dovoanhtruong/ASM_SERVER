const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const classifySchema =new Schema({
    id: {type: ObjectId},
    name:{type:String},
    count: {type: Number},
    product: {type: String},
    date: {type: Date}

})

module.exports = mongoose.model('class',classifySchema)