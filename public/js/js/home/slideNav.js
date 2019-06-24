function SlideNav(){
    this.slider = $(".list-group-item");
}

SlideNav.prototype = {
    init : function() {
        this.slideToggle();
        this.handleSlideToggleCb(0)
    },
    
    

    slideToggle: function(index){
        $.each(this.slider,this.handleSlideEach.bind(this))

        // this.slide.on('click',this.handleSlideToggleCb)
    },
    handleSlideEach(index){
        this.slider.eq(index).on('click',index,this.handleSlideToggleCb.bind(this));
    },
    handleSlideToggleCb(pageIndex){
        // console.log(e.data);
        // var pageIndex = e.data;
        if(typeof(pageIndex) == "number"){
            pageIndex = Number(pageIndex);
            this.slider.eq(pageIndex).addClass('actives').siblings().removeClass('actives');
            this.togglePage(pageIndex)
        }
        else{
            this.slider.eq(pageIndex.data).addClass('actives').siblings().removeClass('actives');
            this.togglePage(pageIndex.data)
        }
    },
    togglePage(index){
        switch(index){
            case 0:
                new Home();
                break;
            case 1:
                new GoodsList();
                break;
            case 2:
                new AddGoods();
                break;
            case 3:
                new Users();
                break;
            default:
                return;
        }
    }


    
}

   new SlideNav().init();