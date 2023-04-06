const {
    getAllLaunches,
    // addNewLaunch,
    existsLaunchWithId, abortLaunchById, scheduleNewLaunch
} = require("../../models/launches.model")


async function httpGetAllLaunches(req, res) {

    return res.status(200).json(await getAllLaunches());
//   为什么map 不能直接return
//     The res.json() method can only serialize
//     JavaScript objects and arrays,
//     and cannot serialize Map objects.
//    为什么map.values()不可以直接转换成json
//     因为map.values()返回的是一个迭代器
//     你可以用Array.from()把它转换成数组
}

// post 方法部分
// post传入的是json 我们需要object 所以用express
// 当输出的时候又需要json 因此我们要json(launch)
//要是想用req.body, 就要提前在app中设置那个
// app.use(express.json());
async function httpAddNewLaunch(req, res) {
    // console.log(req.body)
    const launch = req.body;
    // 万一用户没有输入某个属性怎么办

    if (!launch.mission || !launch.rocket
        || !launch.launchDate || !launch.target) {
        // 400是错误的请求
        return res.status(400).json({
            error: "Missing required launch property"
        });
    }
    // 将输入的字符串给转换成date
    launch.launchDate = new Date(launch.launchDate);
    // 检查是不是date 如果不是就返回400
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid launch date"
        });
    }
    // addNewLaunch(launch);
    await scheduleNewLaunch(launch);
    // console.log(launch)
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
    // 拿到id的方法
    // 拿不到id 是因为id在url里面是String 而在map里id是number
    const launchId = Number(req.params.id);
    const existsLaunch = await existsLaunchWithId(launchId);
    //如果拿到 然后要取反 这样拿不到才能进来
    if (!existsLaunch) {
        return res.status(404).json({
            error: "Launch not found"
        });
    }
    //他的删除不是真的删除 而是修改了两个变量
    const aborted = await abortLaunchById(launchId);
    if (!aborted) {
        return res.status(400).json({
            error: "Launch not aborted"
        });
    }
    return res.status(200).json({
            ok: true
        }
    )
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}