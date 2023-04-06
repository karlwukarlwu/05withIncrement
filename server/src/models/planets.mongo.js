const mongoose = require('mongoose');
const planetSchema = new mongoose.Schema({
    keplerName: {
        type: String,
        required: true,
        // default: "Kepler-62 f",
    },
})
// 设计完了要暴露出来
module.exports =  mongoose.model('Planet', planetSchema);