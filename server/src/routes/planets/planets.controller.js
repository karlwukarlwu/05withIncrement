const {getAllPlanets} = require('../../models/planets.model')

// 因为getAllPlanets是一个async function
// 所以这里也要用async function接受
async function httpGetAllPlanets(req,res){
    // return 是为了停止这个function
    return res.status(200).json(await getAllPlanets())
}

module.exports = {
    httpGetAllPlanets
}