$(function(){
  var obj = JSON.parse(localStorage.clickServerObj);
  var centerId = ''
     if(obj.flag == 'PREPOSITION') {
      centerId=obj.id
     } else{
      centerId= 'other'
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
  $(".prepositionContentBox1 .Box_head  ul li a").html(getServerName(obj.flag,obj.serviceName));
  
  //判空
  function isNull(a) {
    if (a == null || a == undefined || a == "") {
      return '';
    } else {
      return a;
    }
  }
  // 获取运行状态条目
  function getRun(type, counts) {
    var html = '<ul>'
    switch (type) {
      case 'PREPOSITION':
        html += '<li><span>接收指令 :</span><span>' + isNull(counts.instructionCount) + '</span></li>';
        html += '<li><span>发出反馈 :</span><span>' + isNull(counts.executionCount) + '</span></li>';
        html += '<li><span>发出上报 :</span><span>' + isNull(counts.reportCount) + '</span></li>';
        break;
      case 'REPORTING':
        html += '<li><span>接收消息 :</span><span>' + isNull(counts.msgCount) + '</span></li>';
        html += '<li><span>发出事件 :</span><span>' + isNull(counts.eventCount) + '</span></li>';
        break;
      case 'WECHAT':
        html += '<li><span>发出上报 :</span><span>' + isNull(counts.reportCount) + '</span></li>';
        html += '<li><span>发出上诉 :</span><span>' + isNull(counts.appealCount) + '</span></li>';
        break;
      case 'GRIDMAN':
        html += '<li><span>接收指令 :</span><span>' + isNull(counts.instructionCount) + '</span></li>';
        html += '<li><span>发出反馈 :</span><span>' + isNull(counts.executionCount) + '</span></li>';
        html += '<li><span>接收任务 :</span><span>' + isNull(counts.receiveTaskCount) + '</span></li>';
        html += '<li><span>发出任务 :</span><span>' + isNull(counts.sendTaskCount) + '</span></li>';
        html += '<li><span>发出上报 :</span><span>' + isNull(counts.reportCount) + '</span></li>';
        break;
      case 'DIRECT':
        html += '<li><span>接收事件 :</span><span>' + isNull(counts.eventCount) + '</span></li>';
        html += '<li><span>发出指令 :</span><span>' + isNull(counts.instructionCount) + '</span></li>';
        html += '<li><span>接收反馈 :</span><span>' + isNull(counts.executionCount) + '</span></li>';
        break;
    }
    html += '</ul>';
    return html
  }
  $(".runStateList").append(getRun(obj.flag,obj.counts))

    /* 运行状态DOM结构*/
  function creatDom(dataLsit) {
    var html = '';
      var serverRun = ['活动', '告警', '故障'];
      var serverClass = ['active', 'warning_state', 'danger_state'];
      html += '<span class="fr ' + serverClass[dataLsit.run] + '">' + serverRun[dataLsit.run] + '</span>';
    $('.runState').append(html)
  }
  creatDom(obj);

  /*部署位置*/
  function serverList(instances) {
    var html = '<ul class="clearfix">';
    instances.forEach(function (item, index) {
      var serverUrl = ['./images/icon_blue.png', './images/icon_xm_yellow.png', './images/icon_bad.png'];
      var className = ['location_blue','location_yellow','location_red'];
      html += '<li class = "' + className[item.level] + '">';
      html += '<div>' + item.ip + '</div>'
      html += '<div></div>';   
    })
    html += '</ul>';
    return html
  }
  $(".ContentBox1_location").append(serverList(obj.instances));
  /*点击返回，返回上一页*/
  $(".goback a").click(function(){
    location.href="zZCenter.html?id="+centerId+""
  })
    /*系统用户状态*/
  var arr=[];
  $.ajax({
      type: "get",
      url: baseServerUrl+"/common/usercount",
      data: {
        prepositionId:centerId, 
        flag:obj.flag,
      },
      success: function(res){
          arr.push(res.outLineUsers);
          arr.push(res.inLineUsers);
          var myChart = echarts.init(document.getElementById('pie_chart'));
          option = {
            color:["#00fff6","#9c00ff"],
            tooltip: {
                trigger: 'item',
            },
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
                {   center : ['50%', '50%'],
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false
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
                        {value:arr[0], name:'离线用户'},
                        {value:arr[1], name:'在线用户'},
                    ]
                }
            ]
          };
          myChart.setOption(option);
    }
  })
  /*系统用户状态完*/
    /*故障报警和异常用户tab切换*/
  function tab(type) {
    $.ajax({
        type: "get",
        url: baseServerUrl+"/common/userAndExceptions",
        data: {
          prepositionId:centerId,
          flag:obj.flag,
          type:type
        },
        success: function(res){
          if(type == 1) {
            renderDom (res);
          }else {
            renderdom (res)
          }
        }
    })
  }
  // 故障告警拼接字符串
  function renderDom (data) {
    let str = '';
    $.each(data,function(key,value) {
       str += '<tr data_id = '+ value.id +'>';
       str += '<td>' + value.warnBeginTime + '</td>';
       str += '<td>' + value.warnIp +'</td>';
       str += '<td>' + value.warningContent +'</td>';
       str +='</tr>';
    })
    $(".faultalarm table tbody").append(str);
  }
  // 异常用户拼接字符串
  function renderdom (data) {
    let str = '';
    $.each(data,function(key,value) {
       str += '<tr data_id = '+ value.id +'>';
       str += '<td>' + value.userName + '</td>';
       str += '<td>' + value.ip +'</td>';
       str += '<td>' + value.exceptionType +'</td>';
       str +='</tr>';
    })
    $(".abnormalUser table tbody").append(str);
  }
  $(document).on("click",".Box3_head ul li",function(){
    $(this).addClass("addBorder");
    $(this).children("a").addClass("fontColor");
    $(this).siblings("li").removeClass("addBorder");
    $(this).siblings("li").children("a").removeClass("fontColor");
    if($(this).children("a").html() == '异常用户') { 
      tab(0);
      $(".abnormalUser").show();
      $(".faultalarm").hide();
    }else if ($(this).children("a").html() == '故障告警'){
      tab(1);
      $(".abnormalUser").hide();
      $(".faultalarm").show();
    }
  })
  $(".Box3_head ul li:first-child").trigger("click");
  })