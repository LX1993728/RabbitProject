$(function () {
	var type = getUrlParam('id')
	var serverList = []
	$.ajax({
		type: 'get',
		url: baseServerUrl + '/common/appinfos',
		success: function (res) {
			if (type == 'other') {
				serverList = res.healths.otherApps
			} else {
				if (res.healths.preApps.length > 0) {
					serverList = res.healths.preApps.filter(function (item, index) {
						return item.id == type
					})
				}
			}
			$('.service_item').empty()
			if (serverList.length > 0) {
				creatDom(serverList)
			}
		}
	})
	//服务跳转
	$('.service_item').on('click', '.item', function () {
		let title = $(this).find('.item_head').html();
		let type = $(this).attr('data-type');
		localStorage.clickServerObj = JSON.stringify(serverList[$(this).index()])
		if (type == 'PREPOSITION') {
			window.location.href = './city_preposition.html';
		} else if (type == 'REPORTING') {
			window.location.href = './receive_book.html';
		} else if (type == 'WECHAT') {
			window.location.href = './publicServer.html';
		} else if (type == 'GRIDMAN') {
			window.location.href = './comprehensiveServer.html';
		} else if (type == 'DIRECT') {
			window.location.href = './commandService.html';
		}
	})

})
// 生成DOM结构
function creatDom(dataLsit) {
	var html = ''
	dataLsit.forEach(function (item, index) {
		var serverRun = ['活动', '告警', '故障']
		var serverClass = ['', 'warning_state', 'danger_state']
		html += '<div class="item" data-type="' + item.flag + '">';
		html += '<div class="item_head">' + getServerName(item.flag, item.serviceName) + '</div>';
		html += '<div class="item_bd">';
		html += '<div class="item_title clearfix">';
		html += '<span>运行状态:</span>';
		html += '<span class="span_state ' + serverClass[item.run] + '">' + serverRun[item.run] + '</span>';
		html += '</div>';
		html += '<div class="item_state">' + getRun(item.flag, item.counts) + '</div>';
		html += '<div class="item_title"><span>部署位置:</span></div>';
		html += '<div class="item_position clearfix junScrollBar_hide">' + serverList(item.instances) + '</div>';
		html += '</div>';
		html += '</div>';
	});
	$('.service_item').append(html)
}
// 获取服务器名称
function getServerName(flag, serviceName) {
	var serverName = ''
	switch (flag) {
		case 'PREPOSITION':
			serverName = serviceName
			break;
		case 'REPORTING':
			serverName = '接报服务'
			break;
		case 'WECHAT':
			serverName = '公众号服务'
			break;
		case 'GRIDMAN':
			serverName = '综治通服务'
			break;
		case 'DIRECT':
			serverName = '指挥服务'
			break;
	}
	return serverName
}
// 获取运行状态
function getRun(type, counts) {
	var html = ''
	switch (type) {
		case 'PREPOSITION':
			html += '<p><span>接收指令:</span><span>' + isNull(counts.instructionCount) + '</span></p>';
			html += '<p><span>发出反馈:</span><span>' + isNull(counts.executionCount) + '</span></p>';
			html += '<p><span>发出上报:</span><span>' + isNull(counts.reportCount) + '</span></p>';
			break;
		case 'REPORTING':
			html += '<p><span>接收消息:</span><span>' + isNull(counts.msgCount) + '</span></p>';
			html += '<p><span>发出事件:</span><span>' + isNull(counts.eventCount) + '</span></p>';
			break;
		case 'WECHAT':
			html += '<p><span>发出上报:</span><span>' + isNull(counts.reportCount) + '</span></p>';
			html += '<p><span>发出上诉:</span><span>' + isNull(counts.appealCount) + '</span></p>';
			break;
		case 'GRIDMAN':
			html += '<p><span>接收指令:</span><span>' + isNull(counts.instructionCount) + '</span></p>';
			html += '<p><span>发出反馈:</span><span>' + isNull(counts.executionCount) + '</span></p>';
			html += '<p><span>接收任务:</span><span>' + isNull(counts.receiveTaskCount) + '</span></p>';
			html += '<p><span>发出任务:</span><span>' + isNull(counts.sendTaskCount) + '</span></p>';
			html += '<p><span>发出上报:</span><span>' + isNull(counts.reportCount) + '</span></p>';
			break;
		case 'DIRECT':
			html += '<p><span>接收事件:</span><span>' + isNull(counts.eventCount) + '</span></p>';
			html += '<p><span>发出指令:</span><span>' + isNull(counts.instructionCount) + '</span></p>';
			html += '<p><span>接收反馈:</span><span>' + isNull(counts.executionCount) + '</span></p>';
			break;
	}
	return html

}
// 
function serverList(instances) {
	var html = ''
	instances.forEach(function (item, index) {
		var serverUrl = ['./images/icon_blue.png', './images/icon_yellow.png', './images/icon_red.png']
		html += '<div class="position_item">';
		html += '<p>' + item.ip + '</p>'
		html += '<div>';
		html += '<img src="' + serverUrl[item.level] + '" alt="" class="">';
		html += '</div>';
		html += '</div>';
	})
	return html
}
//判空
function isNull(a) {
	if (a == null || a == undefined || a == "") {
		return '';
	} else {
		return a;
	}
}
// 解析url地址
function getUrlParam(key) {
	// 获取参数
	var url = window.location.search;
	// 正则筛选地址栏
	var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	// 匹配目标参数
	var result = url.substr(1).match(reg);
	//返回参数值
	return result ? decodeURIComponent(result[2]) : null;
}