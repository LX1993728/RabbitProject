$(function(){
  var obj = JSON.parse(localStorage.clickServerObj);
  /*折线图部分*/
    $.ajax({
      url:baseServerUrl+"/common/chart",
      type:"get",
      data:{
        flag:obj.flag
      },
      success:function(res) {
        var my_Chart = echarts.init(document.getElementById('line_chart'));
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
                data: ['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00'],
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
                }
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
                    
                },
            },
          },
            series: [
                {
                    name:'接收事件（待处理）',
                    type:'line',
                    data:res.eventFalse
                },
                {
                    name:'接收事件（已处理) ',
                    type:'line',
                    data:res.eventTrue
                },
                {
                    name:'发出指令（成功) ',
                    type:'line',
                    data:res.instructionTrue
                },
                {
                    name:'发出指令（失败）',
                    type:'line',
                    data:res.instructionFalse
                },
                {
                    name:'发出反馈',
                    type:'line',
                    data:res.execution
                }
            ]
          };
          my_Chart.setOption(option)
      }
    })
  /*折线图部分完*/

  /*第四部分页面切换*/
   function procState() {
    var str = '<ul class="clearfix state1">';
        str += '<li>';
        str += '<input class="select-tag-input" type="checkbox" id="tag-id" style="display: none;">';
        str += '<label class="tag-label" for="tag-id"></label>';
        str += '<span>待处理</span>';
        str += '</li>';
        str += '<li>';
        str += '<input class="select-tag-input" type="checkbox" id="tag_id" style="display: none;">';
        str += '<label class="tag-label" for="tag_id"></label>';
        str += '<span>已处理</span>';
        str += '</li>';
        str += '</ul>';
    $(".select_list").empty().append(str);
  }
  function finalState() {
    var str = '<ul class="clearfix state2">';
        str += '<li>';
        str += '<input class="select-tag-input" type="checkbox" id="success-id" style="display: none;">';
        str += '<label class="tag-label" for="success-id"></label>';
        str += '  <span>成功</span>';
        str += '</li>';
        str += '<li>';
        str += '<input class="select-tag-input" type="checkbox" id="fail_id" style="display: none;">';
        str += '<label class="tag-label" for="fail_id"></label>';
        str += '<span>失败</span>';
        str += '</li>';
        str += '</ul>';
    $(".select_list").empty().append(str);
  }
  /*分页效果*/
  function loadPages(pagenow,pageall,state) {
    $('.M-box').pagination({
      pageCount: pageall,
      jump: true,
      coping: true,
      current: pagenow,
      homePage: '首页',
      endPage: '末页',
      prevContent: '上页',
      nextContent: '下页',
      callback: function (p) {
      if ($(".Box4_head ul li.addBorder a").html() == '接收事件') {
        receive_event(p.getCurrent(),state);
      }else if ($(".Box4_head ul li.addBorder a").html() == '发出指令') {
        send_instruction(p.getCurrent(),state);
      }else if ($(".Box4_head ul li.addBorder a").html() == '接收反馈'){
        receive_ans(p.getCurrent(),state);
      }
    }
    });
  }
  /*接收事件*/
  function receive_event_dom(data) {
    let str = '';
    $.each(data,function(key,value){
      str += '<tr id= '+ value.id + '>';
      str += '<td>' + value.eventId + '</td>';
      str += '<td>' + value.receiveTime + '</td>';
      str += '<td>' + value.sendIp + '</td>';
      str += '<td>' + value.receiveIp + '</td>';
      if(value.resolved == false) {
        str += '<td>待处理</td>';
      }else{
        str += '<td>已处理</td>';
      }
      str += '</tr>';
    })
    $(".Box4_content .receive_event table tbody").html('').append(str)
  }
  $(document).on("click","input",function(){
    if($(this).parents(".select_list").prev(".Box4_head").children("ul").children("li.addBorder").children("a").html() == "接收事件"){
      var input_did = $("#tag-id").prop("checked");
      var input_no = $("#tag_id").prop("checked");
      if(input_did && input_no) {
        receive_event(1)
      }else if(!input_did && input_no) {
        receive_event(1,true)
      }else if(input_did && !input_no) {
        receive_event(1,false)
      }else if(!input_did && !input_no){
        receive_event(1)
      }
    }else if($(this).parents(".select_list").prev(".Box4_head").children("ul").children("li.addBorder").children("a").html() == "发出指令"){
      var success_did = $("#success-id").prop("checked");
      var fail_no = $("#fail_id").prop("checked");
      if(success_did && fail_no) {
        send_instruction(1)
      }else if(!success_did && fail_no) {
        send_instruction(1,false)
      }else if(success_did && !fail_no) {
        send_instruction(1,true)
      }else if(!success_did && !fail_no){
        send_instruction(1)
      }
    }
  })
  function receive_event(offset,state) {
    $.ajax({
        type: "get",
        url: baseServerUrl+"/direct/event/data",
        data: {
          page:offset,
          pageSize:5,
          isResolved:state,
        },
        success: function(res){
          receive_event_dom(res.list);
          loadPages(offset,res.totalPages,state)
        }
    })
  }
  /*发出指令*/
  function send_instruction_dom(data) {
    let str = '';
    $.each(data,function(key,value){
      str += '<tr id= '+ value.id + '>';
      str += '<td>' + value.eventId + '</td>';
      str += '<td>' + value.taskId + '</td>';
      str += '<td>' + value.instructionId + '</td>';
      str += '<td>' + value.sendTime + '</td>';
      str += '<td>' + value.sendIp + '</td>';
      str += '<td>' + value.receiveIp + '</td>';
      if(value.success== false) {
        str += '<td>失败</td>';
      }else{
        str += '<td>成功</td>';
      }
      str += '</tr>';
    })
    $(".Box4_content .send_instruction table tbody").html('').append(str)
  }
  function send_instruction(offset,state) {
    $.ajax({
        type: "get",
        url: baseServerUrl+"/direct/instruction/data",
        data: {
          page:offset,
          pageSize:5,
          isSuccess:state
        },
        success: function(res){
          send_instruction_dom(res.list);
          loadPages(offset,res.totalPages,state)
        }
    })
  }
  /*接收反馈*/
  function receive_ans_dom(data) {
    let str = '';
    $.each(data,function(key,value){
      str += '<tr id= '+ value.id + '>';
      str += '<td>' + value.eventId + '</td>';
      str += '<td>' + value.taskId + '</td>';
      str += '<td>' + value.instructionId + '</td>';
      str += '<td>' + value.executionId + '</td>';
      str += '<td>' + value.receiveTime + '</td>';
      str += '<td>' + value.receiveSource + '</td>';
      str += '<td>' + value.receiveIp + '</td>';
      str += '</tr>';
    })
    $(".Box4_content .receive_ans  tbody").html('').append(str)
  }
  function receive_ans(offset,state) {
    $.ajax({
        type: "get",
        url: baseServerUrl+"/direct/execution/data",
        data: {
          page:offset,
          pageSize:5
        },
        success: function(res){
          receive_ans_dom(res.list);
          loadPages(offset,res.totalPages,state)
        }
    })
  }
  $(document).on("click",".Box4_head ul li",function(){
      $(this).addClass("addBorder");
      $(this).children("a").addClass("fontColor");
      $(this).siblings("li").removeClass("addBorder");
      $(this).siblings("li").children("a").removeClass("fontColor");
    if($(this).children("a").html() == '接收事件') { 
      procState();
      $(".receive_event").show();
      $(".send_instruction").hide();
      $(".receive_ans").hide();
      receive_event(1);
    }else if ($(this).children("a").html() == '发出指令'){
      finalState();
      $(".receive_event").hide();
      $(".send_instruction").show();
      $(".receive_ans").hide();
      send_instruction(1)
    }else if ($(this).children("a").html() == '接收反馈'){
      $(".state2").hide();
      $(".state1").hide();
      $(".receive_event").hide();
      $(".send_instruction").hide();
      $(".receive_ans").show();
      receive_ans(1)
    }
  })
  $(".Box4_head ul li:first-child").trigger("click");
})

