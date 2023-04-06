// 这个js为的是把所有的连接mongo的东西拿过来
const mongoose = require('mongoose');

// 开始上mongoDB
// 中间的的<password>换成自己的密码
const MONOGO_URL = 'mongodb+srv://karlwuca:57zx2016@nasa.kvp3lob.mongodb.net/?retryWrites=true&w=majority'


// 这个是看连接上没有 这个是一个观察者模式 连接上以后会log once 是一次性的
mongoose.connection.once('connected',()=>{
    console.log("Mongoose is connected")
})
// 如果出错了这里也会输出
mongoose.connection.on('error',(err)=>{
    console.log(err)
})

//创造一个连接给server直接用
async function mongoConnect(){
    await mongoose.connect(MONOGO_URL)
}
// 要在创造一个disConnect给server直接用
async function mongoDisconnect(){
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}