function getRootPath(){
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
}


var commonUrl = getRootPath();
$(function(){
    var str="";
    var str1="";
    $.ajax({
        type: "get",
        url: commonUrl + "/common/appinfos",
        data: {},
        dataType: "json",
        success: function(data){
            console.log(data)
            //遍历所有开启的部委
            $.each(data.healths.preApps, function(index,item) {
                //遍历部委里边的服务状态，根据状态显示图标和线的颜色
            	$.each(item.instances, function(indexs,items) {
            		if(items.level==2){
                         str = "<li class="+item.id+"><i class='red'></i><span class='span_red'>"+item.serviceName+"</span></li>"
                         line[index].color="#d32816"
                    }else if(items.level==0){
                         str = "<li class="+item.id+"><i class='blue'></i><span class='span_blue'>"+item.serviceName+"</span></li>"
                         line[index].color="#00ffff"
                    }else if(items.level==1){
                         str = "<li class="+item.id+"><i class='yellow'></i><span class='span_yellow'>"+item.serviceName+"</span></li>"
                         line[index].color="#dcaf0e"
                    }
            	});
            	$(".topUl").append(str);
            });
            //无部门时渲染页面
            for(var i=data.healths.preApps.length;i<32;i++){
                str1 = "<li><i class='gray'></i><span class='span_gray'>暂无部门</span></li>"
                $(".topUl").append(str1);
            }
            $(".span_1").html(data.infos.normals);
            $(".span_2").html(data.infos.warns);
            $(".span_3").html(data.infos.errors);
            //canvsa画线赋颜色
            lines();
        }
    })
})
//canvsa画线
var line=[  //创建一个数组，里面放置要绘制的对象，对象的属性包括：绘制点 颜色；
        //上边的线
        {p: [{x: 34, y: 0}, {x: 34, y: 154}, {x: 720, y: 154}, {x: 720, y: 180}], color: "#747474"},
        {p: [{x: 146, y: 0}, {x: 146, y: 134}, {x: 740, y: 134}, {x: 740, y: 180}], color: "#747474"},
        {p: [{x: 260, y: 0}, {x: 260, y: 114}, {x: 760, y: 114}, {x: 760, y: 180}], color: "#747474"},
        {p: [{x: 374, y: 0}, {x: 374, y: 94}, {x: 780, y: 94}, {x: 780, y: 180}], color: "#747474"},
        {p: [{x: 488, y: 0}, {x: 488, y: 74}, {x: 800, y: 74}, {x: 800, y: 180}], color: "#747474"},
        {p: [{x: 602, y: 0}, {x: 602, y: 54}, {x: 820, y: 54}, {x: 820, y: 180}], color: "#747474"},
        {p: [{x: 716, y: 0}, {x: 716, y: 34}, {x: 840, y: 34}, {x: 840, y: 180}], color: "#747474"},
        {p: [{x: 828, y: 0}, {x: 828, y: 14}, {x: 870, y: 14}, {x: 870, y: 180}], color: "#747474"},
        {p: [{x: 940, y: 0}, {x: 940, y: 14}, {x: 900, y: 14}, {x: 900, y: 180}], color: "#747474"},
        {p: [{x: 1052, y: 0}, {x: 1052, y: 34}, {x: 930, y: 34}, {x: 930, y: 180}], color: "#747474"},
        {p: [{x: 1164, y: 0}, {x: 1164, y: 54}, {x: 950, y: 54}, {x: 950, y: 180}], color: "#747474"},
        {p: [{x: 1276, y: 0}, {x: 1276, y: 74}, {x: 970, y: 74}, {x: 970, y: 180}], color: "#747474"},
        {p: [{x: 1388, y: 0}, {x: 1388, y: 94}, {x: 990, y: 94}, {x: 990, y: 180}], color: "#747474"},
        {p: [{x: 1500, y: 0}, {x: 1500, y: 114}, {x: 1010, y: 114}, {x: 1010, y: 180}], color: "#747474"},
        {p: [{x: 1612, y: 0}, {x: 1612, y: 134}, {x: 1030, y: 134}, {x: 1030, y: 180}], color: "#747474"},
        {p: [{x: 1724, y: 0}, {x: 1724, y: 154}, {x: 1050, y: 154}, {x: 1050, y: 180}], color: "#747474"},
        //下边的线 
        {p: [{x: 34, y: 560}, {x: 34, y: 406}, {x: 720, y: 406}, {x: 720, y: 380}], color: "#747474"},
        {p: [{x: 146, y: 560}, {x: 146, y: 426}, {x: 740, y: 426}, {x: 740, y: 380}], color: "#747474"},
        {p: [{x: 260, y: 560}, {x: 260, y: 446}, {x: 760, y: 446}, {x: 760, y: 380}], color: "#747474"},
        {p: [{x: 374, y: 560}, {x: 374, y: 466}, {x: 780, y: 466}, {x: 780, y: 380}], color: "#747474"},
        {p: [{x: 488, y: 560}, {x: 488, y: 486}, {x: 800, y: 486}, {x: 800, y: 380}], color: "#747474"},
        {p: [{x: 602, y: 560}, {x: 602, y: 506}, {x: 820, y: 506}, {x: 820, y: 380}], color: "#747474"},
        {p: [{x: 716, y: 560}, {x: 716, y: 526}, {x: 840, y: 526}, {x: 840, y: 380}], color: "#747474"},
        {p: [{x: 828, y: 560}, {x: 828, y: 546}, {x: 870, y: 546}, {x: 870, y: 380}], color: "#747474"},
        {p: [{x: 940, y: 560}, {x: 940, y: 546}, {x: 900, y: 546}, {x: 900, y: 380}], color: "#747474"},
        {p: [{x: 1052, y: 560}, {x: 1052, y: 526}, {x: 930, y: 526}, {x: 930, y: 380}], color: "#747474"},
        {p: [{x: 1164, y: 560}, {x: 1164, y: 506}, {x: 950, y: 506}, {x: 950, y: 380}], color: "#747474"},
        {p: [{x: 1276, y: 560}, {x: 1276, y: 486}, {x: 970, y: 486}, {x: 970, y: 380}], color: "#747474"},
        {p: [{x: 1388, y: 560}, {x: 1388, y: 466}, {x: 990, y: 466}, {x: 990, y: 380}], color: "#747474"},
        {p: [{x: 1500, y: 560}, {x: 1500, y: 446}, {x: 1010, y: 446}, {x: 1010, y: 380}], color: "#747474"},
        {p: [{x: 1612, y: 560}, {x: 1612, y: 426}, {x: 1030, y: 426}, {x: 1030, y: 380}], color: "#747474"},
        {p: [{x: 1724, y: 560}, {x: 1724, y: 406}, {x: 1050, y: 406}, {x: 1050, y: 380}], color: "#747474"}
]

function lines() { 
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    for(var i = 0; i < line.length; i++) {
        draw(line[i], context);
    }
}

function draw(piece, cxt) {
    cxt.beginPath();
    cxt.moveTo(piece.p[0].x, piece.p[0].y);
    for(var i = 1; i < piece.p.length; i++) {
        cxt.lineTo(piece.p[i].x, piece.p[i].y);
    }
    cxt.strokeStyle = piece.color;
    cxt.stroke();
    cxt.closePath();
}
//点击三十六部门跳转页面
$("#index").on("click","li",function(){
   var title=$(this).children("span").html();
   var id=$(this).attr("class");
   if(title!="暂无部门"){
       window.location="./zZCenter.html?id="+id;
   }
})
//点击综治中心跳转
$(".center").click(function(){
    window.location="./zZCenter.html?id=other"
})