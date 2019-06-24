var express = require('express');
var router = express.Router();
var goodsController = require('../controller/goods')

//导入multer 模块
var  multer = require('multer')

//3对上传文件配置
    var storage = multer.diskStorage({
        //设置图片储存位置
        destination:function(req,file,cb){
            cb(null,'./public/img')
        },
        //设置图片名称
        filename:function(req,file,cb){
            
            cb(null,Date.now() + '-' + file.originalname )
        }
    })
    //储存引擎
    var upload = multer({ storage: storage })

    //4使用 在使用路由的时候调用upload方法 name值是客户端传递的key值
    var cpUpload = upload.fields([{ name:'goodsPic', maxCount: 1 }])
    
    
    //添加商品
    router.post('/add', cpUpload , goodsController.add);
    //商品列表
    router.get('/list', cpUpload , goodsController.List);
    //移除商品
    router.get('/remove', cpUpload , goodsController.Remove);
    //商品编辑
    // router.post('/compile', cpUpload , goodsController.Compile);


    module.exports = router;