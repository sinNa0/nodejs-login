function Users(){
    this.content = $('.content') 
    this.init()
}
Users.template = `
    <div class="row user_row">
        <form>
            <div class="form-group">
            <label for="article_name">文章名</label>
            <input type="text" class="form-control" id="article_name" placeholder="请输入文章名">
            </div>
            <div class="form-group">
            <label for="author_name">作者</label>
            <input type="password" class="form-control" id="author_name" placeholder="请输入作者名">
            </div>
            <div class="form-group">
            <label for="tel">联系方式</label>
            <input type="password" class="form-control" id="tel" placeholder="请输入联系方式">
            </div>
            <div id="editor"> 
            </div>
            <button type="submit" class="btn btn-default">发布</button>
        </form>
    </div>
`

Users.prototype = {
    init : function(){
        this.contentToggle();
        this.editor();
    },
    contentToggle : function(){
        this.content.html("");
        this.content.append(Users.template);
    },
    editor:function(){
        var E = window.wangEditor
        var editor = new E('#editor')
        // 或者 var editor = new E( document.getElementById('editor') )
        editor.create()
    }
}