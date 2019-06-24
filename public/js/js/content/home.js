function Home(){
    this.content = $('.content') 
    this.init()
}
Home.template = `
    <div class="row home_row" >
        <div class="col-md-3 home_box content_1">访问量</div>
        <div class="col-md-3 home_box content_2"">阅读量</div>
        <div class="col-md-3 home_box content_3"">下载量</div>
    </div>
    <div class="row echarts_container">
        <div class="col-md-12" id="echarts_main" style="width:800px;height:400px"></div>
    </div>
`

Home.prototype = {
    init : function(){
        this.contentToggle();
        this.addEchart();
    },
    contentToggle : function(){
        this.content.html('');
        this.content.append(Home.template);
    },
    addEchart :function() {
        var myChart = echarts.init(document.getElementById('echarts_main'));
        // 指定图表的配置项和数据
        var option = {
            title : {
                text: 'EChart',
                subtext: '纯属虚构'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['访问量','阅读量','下载量']
            },
            toolbox: {
                show : true,
                feature : {
                    // dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    // saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'访问量',
                    type:'bar',
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    
                },
                {
                    name:'阅读量',
                    type:'bar',
                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    
                },
                {
                    name:'下载量',
                    type:'bar',
                    data:[3.4, 7.2, 8.4, 28.8, 29.9, 80.8, 199.0, 200.5, 98.1, 12.3, 5.2, 1.3],
                    
                }
            ]
        };
        
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
}