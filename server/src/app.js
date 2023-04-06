const express = require('express')
const cors = require('cors')
const planetsRouter = require('./routes/planets/planets.router');
//接下来导入launches的router
const launchesRouter = require('./routes/launches/launches.router');
const path = require("path");
const morgan = require("morgan");

const app = express()
// app.use(cors());//设置跨域 这样设置默认的是所有的请求都可以接受
app.use(cors({
    origin: 'http://localhost:3000'
}));//设置跨域 这样就可以只接受3000端口的请求
// https://www.npmjs.com/package/cors 这是cors的文档 如何接受不同的请求这里有写

app.use(morgan('combined'))
// 这行有点类似于我自定义的看请求是否成功的那个中间use
// 但是这个是更加专业版的

//     ::1 - - [03/Apr/2023:16:09:12 +0000] "GET /planets HTTP/1.1" 304 -
//     "http://localhost:3000/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537
//     .36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62"


app.use(express.json())

// app.use((req, res, next) => {
//     console.log("ddd")
//     next()
// })

// 手动把build文件夹复制到新建的public文件夹 windows的命令有问题
app.use(express.static(path.join(__dirname,"..","public")))//优化相对路径

// 这里是根据不同router的网页开始跳转了
app.use("/planets",planetsRouter);
// planetsRouter.get('/planets',getAllPlanets)
app.use("/launches",launchesRouter);

// 对这一行 i have no idea
// 有可能和react有关 但是我不会react
// The /* route in the app.get() method is called a "catch-all" route,
// which means that it matches any URL path that hasn't been matched by a specific route
// already defined in your application.
// 好像这个是用来处理前端把包移到后端导致刷新无法运行的问题
// react、vue、angular都用这个处理
app.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","index.html"))
})

module.exports = app

