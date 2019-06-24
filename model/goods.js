/*  商品数据库创建,添加
----------------------------*/

//连接数据库模块
const mongoose = require('./../utils/database').mongoose;

//创建商品表
let Goods = mongoose.model('goods',{
    goodsName:String,
    goodsPic:String,
    tel:Number,
    goodsPrice:Number,
    goodsDes:String
})
//商品存储
const goodsSave = (goodsInfo,cb) => {
    // if(goodsInfo.goodsName){
        let goods = new Goods(goodsInfo);
        goods.save().then((result)=>{
            cb(result)
        })
    // }
}

//商品查询
const goodsFind = (goodsInfo,cb) => {
    
    Goods.find().skip(goodsInfo.page).limit(goodsInfo.limit).then((result) =>{
        cb(result);
    })
}

//商品删除 
const goodsRemove = (goodsInfo,cb) => {
    console.log(goodsInfo);
    
    Goods.remove({goodsName:goodsInfo}).then((result) => {
        cb(result);
    });
    
}

//商品编辑
const goodsUpdate = (goodsInfo,cb) =>{
    Goods.update({tel:goodsInfo.tel},{
            goodsName:goodsInfo.goodsName,
            goodsPic:goodsInfo.goodsPic,
            goodsDec:goodsInfo.goodsDec
    }).then(result => {
        cb(result);
    });
    
}

// 模块导出
module.exports = {
    goodsSave,
    goodsFind,
    goodsRemove,
    goodsUpdate
}


