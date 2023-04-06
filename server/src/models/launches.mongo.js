const mongoose = require('mongoose')

const launchesSchema = new mongoose.Schema({
    flightNumber: { //这些写法都在文档里
        type:Number,
        required:true,
        // default:100,
        // min:100,
        // max:999
    },
    launchDate:{
        type:Date,
        required:true
    },
    mission:{
        type:String,
        required:true
    },
    rocket:{
        type:String,
        required:true
    },
//     外键怎么办？他这里没细说
    target:{
        type:String,
        required:true,
    },
    // 这个是一个数组
    customers:[String],

    upcoming:{
        type:Boolean,
        required:true,
    },
    success:{
        type:Boolean,
        required:true,
        default:true
    }
});
// 设计完了要暴露出来
// 这里好像是造了一个对象出来 create a model
// connect launchesSchema to a collection called launches
// 前面是名字，后面是schema(name 好像也不重要)
// 主要是这个要跟launches.model.js里面导入的有关
module.exports =  mongoose.model('Launch', launchesSchema );


