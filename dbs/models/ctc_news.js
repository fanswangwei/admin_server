const mongoose = require('mongoose')
// Schema是数据表中字段名称和类型的映射
let ctc_news_Schma = new mongoose.Schema({
    title: String,
    remark: String,
    type: String,
    coverUrl: String,
    content: String,
    createdTime: Number
})
// 连接数据库file表
module.exports = mongoose.model('ctc_news', ctc_news_Schma, 'ctc_news')