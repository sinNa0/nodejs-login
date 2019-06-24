
/* 数据库数据创建
-----------------------------------*/
//连接数据库模块导入
const mongoose = require('./../utils/database').mongoose

//连接数据库的表
let Students = mongoose.model('students',{
    username:String,
    password:String
})

//数据的查询
const userFind = (userInfo,cb) => {
    Students.findOne(userInfo).then((result) =>{
        cb(result);
    })
}

//数据的添加
const userSave= (userInfo,cb) => {
    var students = new Students(userInfo);
    students.save().then(result => {
        cb(result);
    }) 
}

//模块导出

module.exports = {
    userFind,
    userSave
}