$(function(){
    var myChart = echarts.init(document.getElementById('pie_chart'));
    option = {
    color:["#00fff6","#9c00ff"],
    tooltip: {
        trigger: 'item',
    },
    // legend: {
    //     orient: 'vertical',
    //     x: 'right',
    //     data:['离线用户','在线用户'],
    //     textStyle:{//图例文字的样式
    //         color:'#fff',
    //         fontSize:14
    //     }
    // },
    legend: {
        selectedMode:false,
        orient: 'vertical',
        right: 0,
        top: 20,
        bottom: 20,
        textStyle:{//图例文字的样式
            color:'#fff',
            fontSize:14
        }
    },
    series: [
        {
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'离线用户'},
                {value:310, name:'在线用户'},
            ]
        }
    ]
};
    myChart.setOption(option);
})