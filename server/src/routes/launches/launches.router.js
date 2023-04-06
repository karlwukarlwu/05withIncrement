const express = require('express');
const launchesRouter = express.Router();
const {httpGetAllLaunches,httpAddNewLaunch,httpAbortLaunch} = require("./launches.controller");
//拿到router 下一步是网址 和请求的要求
// 再将需要的请求的操作封装到controller里面
launchesRouter.get("/",httpGetAllLaunches);
launchesRouter.post("/",httpAddNewLaunch);
// :id 这样可以拿到id 有具体的方法
launchesRouter.delete("/:id",httpAbortLaunch);
// 拿id的方法
// app.get('/launches/:id', (req, res) => {
//     const id = req.params.id;
//     // ... rest of the code
// });

// 然后再暴露出去
module.exports = launchesRouter;