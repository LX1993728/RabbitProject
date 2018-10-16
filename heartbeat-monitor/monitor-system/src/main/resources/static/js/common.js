$(function (){
	get_head("#common_head",'./common_head.html')

      // 获取天气API
    $.get("https://free-api.heweather.com/s6/weather/forecast?location=" + returnCitySN['cip'] + "&key=02f450fa55394f8d868aa2a1d1dc0772", function (data, status) {
        if (data.HeWeather6[0].daily_forecast) {
            let iconAddress = data.HeWeather6[0].daily_forecast[0].cond_code_d
            $(".left_con .weather .icon").css({
                //'background-image': 'url(https://cdn.heweather.com/cond_icon/' + iconAddress + '.png)'
                'background-image': 'url(./images/weather/' + iconAddress + '.png)'
            })
            $(".left_con .weather .weather_des").html(data.HeWeather6[0].daily_forecast[0].cond_txt_d)
        } else {
            $(".left_con .weather").html('暂无数据')
            $(".left_con .weather").css({
                'line-height': '90px',
                'font-size': '16px'
            })
        }
    })

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
});
	var baseServerUrl = "http://192.168.1.150:8011";

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
