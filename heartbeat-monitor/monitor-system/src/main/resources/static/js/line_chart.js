$(function(){
	var myChart = echarts.init(document.getElementById('line_chart'));
	option = {
    color:['#9c00ff','#00aeff','#67ffe5',"#0080ff","#6000ff","#0036ff"],
    textStyle:{//图例文字的样式
            color:'#fff',
            fontSize:14
    },
    smooth:false,   //关键点，为true是不支持虚线的，实线就用true
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        icon:"roundrect",
        textStyle:{//图例文字的样式
            color:'#fff',
            fontSize:14
        },
        // selectedMode:false,
        orient: 'horizontal',
        bottom:0
    },
    xAxis: {
        show:true,
        type: 'category',
        boundaryGap: false,
        data: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'],
        axisLine:{
            lineStyle :{
                color: '#016172',
                type:"dotted"
                }
        },
        splitLine:{
            lineStyle :{
                show:true,
                color: '#016172',
                type:"dotted"
                }
        },
        // axisLabel:{
        //     rotate:60,
        // }
    },
    yAxis: {
        show:true,
        type: 'value',
        axisLine:{
            lineStyle :{
                color: 'transparent',
            }
        },
        splitLine:{
            lineStyle :{
                show:true,
                color: '#016172',
                type:"dotted"
                }
        },
    },
    series: [
        {
            name:'接收指令（待处理）',
            type:'line',
            data:[120, 132, 101, 134, 90, 230, 90,120, 132, 101, 134, 90, 230, 90,101, 134, 90, 230, 90,120, 132, 101, 134, 90,102]
        },
        {
            name:'接收指令（已处理) ',
            type:'line',
            data:[220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290, 330, 310,290, 330, 310,220, 182, 191, 234, 290, 330, 310,201]
        },
        {
            name:'发出反馈（成功) ',
            type:'line',
            data:[150, 232, 201, 154, 190, 330, 410,150, 232, 201, 154, 190, 330, 410,232, 201, 154, 190, 330, 410,150, 232, 201,90,250]
        },
        {
            name:'发出反馈（失败）',
            type:'line',
            data:[320, 332, 301, 334, 390, 330, 320,332, 301, 334, 390, 330, 320,320, 332, 301, 334, 390,820, 932, 901, 934, 290, 330,204]
        },
        {
            name:'发出上报（成功）',
            type:'line',
            data:[120, 182, 191, 278, 290, 330, 310,220, 192, 191, 234, 290, 330, 310,290, 330, 300,220, 182, 121, 234, 290, 330, 110,254]
        },
        {
            name:'发出上报（失败）',
            type:'line',
            data:[120, 332, 311, 314, 390, 130, 320,132, 301, 314, 310, 330, 120,320, 332, 301, 334, 390,720, 832, 999, 934, 200, 230,256]
        }
    ]
};
    myChart.setOption(option);
})