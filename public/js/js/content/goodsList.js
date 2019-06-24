function GoodsList(){
    this.content = $('.content') 
    this.init()
}
GoodsList.template = `
    <div class="row goods_row"></div>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">商品修改</h4>
            </div>
            <div class="modal-body">
                <form id="modify_form">
                    <div class="form-group">
                    <label for="modifyGoodsName">商品名称</label>
                    <input type="text" class="form-control" id="modifyGoodsName" placeholder="请输入商品名称">
                    </div>
                    <div class="form-group">
                    <label for="modifyGoodsDes">商品描述</label>
                    <input type="text" class="form-control" id="modifyGoodsDes" placeholder="请输入商品描述">
                    </div>
                    <div class="form-group">
                    <label for="modifyGoodsPrice">商品价格</label>
                    <input type="text" class="form-control" id="modifyGoodsPrice" placeholder="请输入商品价格">
                    </div>
                    <div class="form-group">
                    <label for="modifyTel">联系方式</label>
                    <input type="text" class="form-control" id="modifyTel" placeholder="请输入联系方式">
                    </div>
                    <div class="form-group">
                        <label for="modifyGoodsPic">添加图片</label>
                        <input type="file" id="modifyGoodsPic">
                    </div>
                    <button type="submit" class="btn btn-default modifyGoods">提交</button>
                </form>
            </div>
            
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
`

GoodsList.prototype = {
    init : function(){
        this.contentToggle();
        this.getGoodsList();
        this.ModifyGoodsClick()
        // this.slideToggle();
    
        // this.btnClick();
    },
    contentToggle : function(){
        this.content.html("");
        this.content.append(GoodsList.template);
    },
    getGoodsList:function(){
        $.ajax({
            type:'get',
            url:'/goods/list',
            cache:false,
            data:{
                page:1,
                limit:10
            },
            success:this.handleSubmitSuccess.bind(this)
        })
    },
    handleSubmitSuccess(data){
        var str =''
        for(var i=0;i<data.data.list.length ;i++){
            str += ` 
                <div class="col-sm-6 col-md-3">
                    <div class="thumbnail">
                        <img src="${data.data.list[i].goodsPic}" alt="...">
                        <div class="caption">
                        <h3>${data.data.list[i].goodsName}</h3>
                        <p>${data.data.list[i].goodsDes}</p>
                        <p><a href="javascript:;" class="btn btn-primary goodsModify" role="button"  data-toggle="modal" data-target="#myModal" dataModify-index="${i}">编辑</a> <a href="javascript:;"  class="btn btn-default goodsRemove" dataRemove-index="${i}"  role="button">下架</a></p>
                        </div>
                    </div>
                </div>
            `
        }
        this.content.find('.goods_row').html(str);
        this.btnClick(data.data.list);
    },
    btnClick:function(data) {
        var _this = this
        this.content.find('.goodsRemove').on('click',{data,that:_this},this.goodsRemoveCb)
        this.content.find('.goodsModify').on('click',{data,that:_this},this.goodsModifyCb)
    },
    goodsModifyCb(e){
        // console.log(123);
        var index = $(this).attr("dataModify-index");
        var modifyData =e.data.data[index]
        // console.log(modifyData);
        
        e.data.that.content.find('#modifyGoodsName').val(modifyData.goodsName);
        e.data.that.content.find('#modifyGoodsDes').val(modifyData.goodsDes);
        e.data.that.content.find('#modifyGoodsPrice').val(modifyData.goodsPrice);
        e.data.that.content.find('#modifyTel').val(modifyData.tel);
        e.data.that.content.find("#modify_form").attr("data-id", modifyData._id);
    },
    ModifyGoodsClick(){
        this.content.find('#modify_form').on('submit',this.handleModifyClickCb.bind(this))
    },
    handleModifyClickCb(e){
        e.preventDefault();
        var formData = new FormData();
        formData.append("goodsName", this.content.find("#modifyGoodsName").val())
        formData.append("id", this.content.find("#modify_form").attr("data-id"))
        formData.append("goodsPrice", this.content.find("#modifyGoodsPrice").val())
        formData.append("goodsDes", this.content.find("#modifyGoodsDes").val())
        formData.append("tel", this.content.find("#modifyTel").val())
        formData.append("goodsPic", this.content.find("#modifyGoodsPic")[0].files[0])

        $.ajax({
            type:"post",
            url:"/goods/modify",
            data: formData,
            cache:false,
            processData: false,  // 不处理数据
            contentType: false ,  // 不设置内容类型
            success:this.handleSubmitModifyGoodsSuccess.bind(this)
        })
    },
    handleSubmitModifyGoodsSuccess(data){
        if(data.data.status){
            alert('编辑成功');
            this.getGoodsList();
            $('#myModal').modal('hide');
        }
        else{
            alert(data.data.info)
        }
    },
    goodsRemoveCb(e){
        e.preventDefault();
        var index = $(this).attr("dataRemove-index");
        var modifyData =e.data.data[index]
        console.log(modifyData);
        
        $.ajax({
            type:'get',
            url:'/goods/remove',
            data:{
                id:modifyData._id
            },
            // success: this.handleRemoveSuccess.bind(e.data.that)  
             success:  function (data){
                if (data.data.status == 1) {
                    alert(data.data.info)
                    new GoodsList().getGoodsList();
                }
                else{
                    alert(data.data.info)
                }
            }
        })
    }
    // handleRemoveSuccess(data){  
    //    if (data.data.status == 1) {
    //         this.getGoodsList();
    //     }
    //     else{
    //         alert(data.data.info)
    //     }
    // }  
}