/* 用户添加商品的逻辑模块
-------------------------------------------*/


const goodsModel = require('../model/goods');

const path = require('path')

const add = (req,res,next) => {
    // console.log(231);
    
    //接受post提交数据
    let {goodsName,goodsPrice,goodsDes,tel} = req.body;
    let picUrl = "http://localhost:3000/img/" + path.parse(req.files.goodsPic[0].path).base;
    var list = {goodsName,goodsPrice,goodsDes,tel,goodsPic:picUrl}
    // console.log(list);
    
    goodsModel.goodsSave(list,(result) =>{
        if(result){ //判断上传是否正确
                //将数据返回到添加页面
                res.json({
                    code:200,
                    errMsg:'',
                    data:{
                        status:1,
                        info:"添加成功"
                    }
                })
        }
        
        else{
            res.json({
                code:500,
                errMsg:'服务端错误',
                data:{
                    status:0,
                    info:'添加失败'
                }
            })
        }
  })
}

const List = (req,res,next) =>{
    let {page,limit} = req.query;
    page = Number(page);
    limit = Number(limit);
    // let {goodsName,goodsPrice,goodsDes,tel,goodsPic} = req.query;
    // var lists = {goodsName,goodsPrice,goodsDes,tel,goodsPic}
    goodsModel.goodsFind ({page:(page-1)*limit,limit:limit},data => {
        if(data.length > 0){
            res.json({
                code:200,
                errMsg:'',
                data:{
                    status:1,
                    list:data
                }
            })
        }
        else{
            res.json({
                code:200,
                errMsg:'暂无商品',
                data:{
                    status:0,
                    list:[]
                }
            })
        }

    })
}

const Remove = (req,res,next) => {
    let {goodsName} = req.query;
    console.log(goodsName);
    
    goodsModel.goodsRemove(goodsName,(result) => {
        // console.log(result.deletedCount);
        
        if(result.deletedCount == 1){
            res.json({
                code:200,
                errMsg:'',
                data:{
                    status:1,
                    info:'删除成功'
                }
            })
        }
        else{
            res.json({
                code:500,
                errMsg:'服务端错误',
                data:{
                    status:0,
                    info:'删除失败'
                }
            })
        }
    })
 
}


module.exports = {
    add,
    List,
    Remove
}
