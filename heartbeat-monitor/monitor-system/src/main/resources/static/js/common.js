$(function (){
	get_head("#common_head",'./common_head.html')

      // 获取天气API
    // $.get("https://free-api.heweather.com/s6/weather/forecast?location=" + returnCitySN['cip'] + "&key=02f450fa55394f8d868aa2a1d1dc0772", function (data, status) {
    //     if (data.HeWeather6[0].daily_forecast) {
    //         let iconAddress = data.HeWeather6[0].daily_forecast[0].cond_code_d
    //         $(".left_con .weather .icon").css({
    //             //'background-image': 'url(https://cdn.heweather.com/cond_icon/' + iconAddress + '.png)'
    //             'background-image': 'url(./images/weather/' + iconAddress + '.png)'
    //         })
    //         $(".left_con .weather .weather_des").html(data.HeWeather6[0].daily_forecast[0].cond_txt_d)
    //     } else {
    //         $(".left_con .weather").html('暂无数据')
    //         $(".left_con .weather").css({
    //             'line-height': '90px',
    //             'font-size': '16px'
    //         })
    //     }
    // })

    // 判断当前用户是否是登录状态,如果不是则退回到登录页
    $.ajaxSetup({
        xhrFields:{
            withCredentials:true
        },
        error: function(xhr, exception){ 
            if( xhr.status == "401") 
                window.location.href = './login.html'; 
    }      
    })

    //关闭弹框
    $(".info_confirm input").click(function(){
        $(this).parents(".info_dialoge").hide();
    })
});

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

	var baseServerUrl = getRootPath();

// 加载公共头部方法
function get_head (html_container,html_name){
  $(html_container).load(html_name)
}

//获取参数
function GetQueryStringDecode(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(decodeURI(r[2]));
	return null;
}
// 显示信息弹窗方法
function showInfo(content, title) {
    $('.info_dialoge').show()
    var content = content ? content : '操作成功'
    var title = title ? title : '操作成功'
    $('.info_dialoge .info_content p').html(content)
    $('.info_dialoge .title').html(title)
}
