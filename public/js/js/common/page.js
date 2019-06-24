
function Page(){
    this.container = $('.content');
}

Page.prototype = {
    init : function () {
        this.createPage(true);
    },
    createPage : function(flag) {
        if(flag){
            this.Register = new Register(this.container)
        }
        else{
            this.Login = new Login(this.container)
        }
    }
}

new Page().init()