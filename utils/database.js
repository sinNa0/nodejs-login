
/* 连接数据库
---------------------------------------- */

const  mongoose = require('mongoose');

//数据库地址
const  db_path = 'mongodb://127.0.0.1:27017/login';

//连接数据库
mongoose.connect(db_path)

//模块导出
module.exports = {
    mongoose
}