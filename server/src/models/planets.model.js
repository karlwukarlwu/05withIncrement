const {parse} = require('csv-parse')
const fs = require('fs')
const path = require('path')
// 拿到新的数据库 更新之前没有数据库的情况
const planets = require('./planets.mongo')

// const habitablePlanets = []


function isHabPlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6
}


// 读取文件的时候是异步的
// 把promise当计时器使用
// 当读到resolve的时候代表任务完成
function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        // fs.createReadStream("../../data/starsData.csv")
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'starsData.csv'))//用path模块的另一种写法
            .pipe(parse({//这个是把读到的csv 数据整合然后再parse输出
                comment: '#',//以#开头的忽略
                columns: true,//每一行是一个对象
            }))
            // 这里要上mongo了 因此需要把函数改成异步的
            .on('data', async (data) => {
                if (isHabPlanet(data)) {
                    // habitablePlanets.push(data)

                    // upsert = insert+update
                    // 封装成函数
                    // await planets.updateOne({
                    //     keplerName: data.kepler_name,
                    // }, {
                    //     keplerName: data.kepler_name,
                    // },{
                    //     upsert: true,
                    // })
                    await savePlanet(data)

                    // 这样写的话如果有重复的就会报错
                    // 用upsert 优化
                    // await planets.create({
                    //     keplerName: data.kepler_name,
                    // })
                    // 因为那边只要keplerName 所以这里只要kepler_name
                    // 这里的data.kepler_name是因为csv文件里面的key是kepler_name
                    //     const planetSchema = new mongoose.Schema({
                    //     keplerName: {
                    //         type: String,
                    //         required: true,
                    //         // default: "Kepler-62 f",
                    //     },
                    // })
                }
            }).on('error', (err) => {
            console.log(err)
            reject(err)
        }).on('end', async () => {
            // 这里在拿到 mongo的数据 因为那个函数是异步的 因此这里也要异步
            const countPlanetsFound = (await getAllPlanets()).length;

            console.log(`${countPlanetsFound} habitable planets found!`)
            // 当读到这里的时候代表着任务完成
            resolve()
        })
        // resolve()
        //     不能放在这里 放在这里等于是在读取文件的时候就已经完成了 异步就要等readStream读完了才能执行
        //     In the second function, resolve() is called outside the on('end') event listener,
        //     which means that the Promise will be resolved immediately after the fs.createReadStream() method
        //     is called, before the file has been fully processed.
        //     This is incorrect because you are resolving the
        //     Promise before the file has been fully processed,
        //     which could lead to unexpected behavior.
    })
}

// 进一步封装 不让数据暴露出去
//  只暴露函数
// 进一步 用异步 调mongo
async function getAllPlanets() {
    // mongo 的find方法
    return planets.find({},{
        '_id': 0, '__v': 0
    //     我们只想要keplerName
    //     不想要mongo默认生成的id和版本号
    });
}

// 将之前的代码封装成一个函数
async function savePlanet(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name,
        }, {
            keplerName: planet.kepler_name,
        }, {
            upsert: true,
        })
    } catch (e) {
        console.error(`Could not save planet ${e}`)
    }

}

// 问题在于这里 stream的读取是异步的 module 会先执行完
// 如何解决？
// 用promise
module.exports = {
    loadPlanetsData,
    // 当这个变成异步以后 其他调用的地方也要用异步的方式来调用
    // Since loadPlanetsData function is asynchronous and returns a promise,
    // any function that uses it needs to be asynchronous as well
    // and either use async/await or .then()/.catch() to handle the promise.
    getAllPlanets
}