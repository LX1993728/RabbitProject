$(function() {
	$.get("https://free-api.heweather.com/s6/weather/forecast?location=" + returnCitySN['cip'] + "&key=02f450fa55394f8d868aa2a1d1dc0772", function(data, status) {
		if(data.HeWeather6[0].daily_forecast){
			let iconAddress = data.HeWeather6[0].daily_forecast[0].cond_code_d
		   $(".left_con .weather .icon").css({
			 //'background-image': 'url(https://cdn.heweather.com/cond_icon/' + iconAddress + '.png)'
			 'background-image': 'url(./images/weather/' + iconAddress + '.png)'
		    })
		   $(".left_con .weather .weather_des").html(data.HeWeather6[0].daily_forecast[0].cond_txt_d)
		} else {
			$(".left_con .weather").html('暂无数据')
			$(".left_con .weather").css({
				'line-height':'90px',
				'font-size':'16px'
			})
		}	
	})
	// 头部用户信息显示
	if (localStorage.userInfo) {
		var userInfo = JSON.parse(localStorage.userInfo)
		$('.user_info p').eq(0).html(userInfo.username)
	}
	var time = setInterval(function(){
		getTimes()
	},1000)
	// 退出登录
	$('.exit_icon').click(function () {
		$.ajax({
			type: 'get',
			url: baseServerUrl + "/user/logout",
			success: function (res) {
			
					window.location.href = './login.html'
					localStorage.userInfo = ''
			}
		})
	})
})

function getTimes (){
	var str=new Date();
	var year = str.getFullYear()
	var month = str.getMonth()+1
	var day = str.getDate()
	var todayDate = year+'年'+month+'月'+day+'日'
	var hours=str.getHours()
	var minutes = str.getMinutes()>9 ? str.getMinutes():'0'+str.getMinutes()
	var second = str.getSeconds()> 9 ? str.getSeconds() : '0'+str.getSeconds()
	var speficTime = hours+ ':'+minutes+':'+second
	$(".local_date").html(todayDate)
	$(".local_time").html(speficTime)
}