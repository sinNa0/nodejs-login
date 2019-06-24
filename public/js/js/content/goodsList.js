function GoodsList(){
    this.content = $('.content') 
    this.init()
}
GoodsList.template = `
    <div class="row goods_row"></div>
`

GoodsList.prototype = {
    init : function(){
        this.contentToggle();
        this.getGoodsList();
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
                        <p id="${i}"><a href="javascript:;" class="btn btn-primary" id="compile" role="button">编辑</a> <a href="javascript:;"  class="btn btn-default " id="remove${i}"  role="button">下架</a></p>
                        </div>
                    </div>
                </div>
            `
        //    this.content.find($('#'+data.data.list[i].tel)).on('click',this.handleRemove.bind(this)); 
        //     console.log($('#'+data.data.list[i].tel));
        //     console.log(this.content);

        }

        this.content.find('.goods_row').html(str);
        for(var n=0 ; n<i;n++){
            this.content.find($("#remove"+n)).on('click',this.handleRemove); 
        }

    },
    // btnClick:function() {
    //     for(var n=0 ; n<=i;n++){
    //         $('#'+data.data.list[i].tel).find($('#remove')).on('click',this.handleRemove); 
    //     }
    // },
    handleRemove(e){
        // e.preventDefault();
        var goodsName = $(this).parent().parent().find('h3').html();
        $.ajax({
            type:'get',
            url:'/goods/remove',
            data:{
                goodsName:goodsName
            },
            // success:this.handleRemoveSuccess  
             success:  function (data){
                console.log(123);
                
                if (data.data.status == 1) {
                    new GoodsList().getGoodsList();
                }
                else{
                    alert(data.data.info)
                }
            }
        })
    }
    // handleRemoveSuccess(data){
    //     console.log(123);
        
    //     if (data.data.status == 1) {
    //         this.getGoodsList();
    //     }
    //     else{
    //         alert(data.data.info)
    //     }
    // }
    // },
    // handleCompile(e){
    //     e.preventDefault();
    //     $.ajax({
    //         type:post,
    //         url:'/goods/remove',
    //         data:{
    //             goodsName:goodsName
    //         },
    //         success:this.handleRemoveSuccess(data).bind(this)       
    //     })
    // }
    
}