/* 用户注册数据的逻辑模块
-------------------------------------------*/

//引入加密的模块
const crypto = require('crypto');

//引入用户数据注册模块
const userModel = require('./../model/user')
const jwt = require('jsonwebtoken')

let secret = '1905'

const register = (req,res,next) => {
    //接受post提交数据
    let {username,password} = req.body;
    
    //判断用户名是否存在
    userModel.userFind({username},(data) => {

        if(data){ //用户名存在
            res.json({
                code:200,
                errMsg:"",
                data:{
                    status:0,
                    info:"用户名已存在"
                }
            })
        }
        else{
            //1、创建sha256算法
            const hash = crypto.createHash('sha256');
            //2、添加需要加密的内容
            hash.update(password);
            //3、获取加密的内容
           // console.log(hash.digest('hex'));
           //创建用户

           //设置token
           

           userModel.userSave({username,password:hash.digest('hex')},()=>{
                res.json({
                    code:200,
                    errMsg:"",
                    data:{
                        status:1,
                        info:"注册成功"
                    }
                })
           })
            
        }
    })
}


//用户登陆验证

const login = (req,res,next) => {
    let {username,password} = req.body;
    userModel.userFind({username},(data)=>{
        if(data){
            const hash = crypto.createHash('sha256');
            //2、添加需要加密的内容
            hash.update(password);
            if(data.password == hash.digest('hex')){
                let token = jwt.sign({username}, secret, { expiresIn: '1h' });
 
                res.cookie("token",token);
                res.json({
                    code:200,
                    errMsg:'',
                    data:{
                        status:1,
                        info:"登陆成功"
                    }
                })
            }
            else{
                res.json({
                    code:200,
                    errMsg:'',
                    data:{
                        status:2,
                        info:"密码错误"
                    }
                })
            }
        }
        else{
            res.json({
                code:200,
                errMsg:'',
                data:{
                    status:0,
                    info:"用户名不存在"
                }

            })
        }
    })
}

//模块导出
module.exports = {
    register,
    login
}