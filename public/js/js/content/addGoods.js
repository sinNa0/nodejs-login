
function AddGoods(){
    this.content = $('.content') 
    this.init()
}
AddGoods.template = `
        <div class="row goods_row">
            <form>
                <div class="form-group">
                <label for="goodsName">商品名称</label>
                <input type="text" class="form-control" id="goodsName" placeholder="请输入商品名称">
                </div>
                <div class="form-group">
                <label for="goodsDes">商品描述</label>
                <input type="text" class="form-control" id="goodsDes" placeholder="请输入商品描述">
                </div>
                <div class="form-group">
                <label for="goodsPrice">商品价格</label>
                <input type="text" class="form-control" id="goodsPrice" placeholder="请输入商品价格">
                </div>
                <div class="form-group">
                <label for="tel">联系方式</label>
                <input type="text" class="form-control" id="tel" placeholder="请输入联系方式">
                </div>
                <div class="form-group">
                    <label for="goodsPic">添加图片</label>
                    <input type="file" id="goodsPic">
                </div>
                <button type="submit" class="btn btn-default addGoods">上架</button>
            </form>
        </div>
`

AddGoods.prototype = {
    init : function(){
        this.contentToggle();
        this.submitGoods();
    },
    contentToggle : function(){ //切换至商品列表页面
        this.content.html("");
        this.content.append(AddGoods.template);
    },
    submitGoods :function () {
        this.content.find($('.addGoods')).on('click',this.handleSubmitCb.bind(this))
    },
    handleSubmitCb(e) { //数据post

        e.preventDefault();

        var goodsName = this.content.find('#goodsName').val();
        var goodsDes = this.content.find('#goodsDes').val();
        var goodsPrice = this.content.find('#goodsPrice').val();
        var tel = this.content.find('#tel').val();
        var goodsPic =  this.content.find('#goodsPic')[0];
        
        //创建formdata 对象
        var formData = new FormData();

        formData.append("goodsName", goodsName);
        formData.append("goodsDes", goodsDes);
        formData.append("goodsPrice", goodsPrice);
        formData.append("tel", tel);
        formData.append("goodsPic", goodsPic.files[0]);
        // console.log(formData);
        
        $.ajax({
            type:"post",
            url:"/goods/add",
            data: formData,
            cache:false,
            processData: false,  // 不处理数据
            contentType: false ,  // 不设置内容类型
            success:this.handleSubmitAddGoodsSuccess.bind(this)
        })
    },
    handleSubmitAddGoodsSuccess(data){
        if(data.data.status == 1){
            alert('商品添加成功')
            new GoodsList(); //切换至商品列表页面
            new SlideNav().handleSlideToggleCb(1) //导航条切换商品列表
        }
    } 
}

// new AddGoods();