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
            color:['#9c00ff','#00aeff','#67ffe5',"#0080ff","#6000ff","#0036ff","#00cde5","#e0b20f","#d42816","#60e7a3"],
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
                bottom:0,
                left:80
            },
            grid:{
                    y2:80
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
                    name:'接收指令（待处理）',
                    type:'line',
                    data:res.instructionFalse
                },
                {
                    name:'接收指令（已处理）',
                    type:'line',
                    data:res.instructionTrue
                },
                {
                    name:'发出反馈（成功）',
                    type:'line',
                    data:res.executionTrue
                },
                {
                    name:'发出反馈（失败）',
                    type:'line',
                    data:res.executionFalse
                },
                {
                    name:'接收任务（待处理）',
                    type:'line',
                    data:res.receiveTaskFalse
                },
                {
                    name:'接收任务（已处理）',
                    type:'line',
                    data:res.receiveTaskTrue
                },
                {
                    name:'发出任务（成功）',
                    type:'line',
                    data:res.sendTaskTrue
                },
                {
                    name:'发出任务（失败）',
                    type:'line',
                    data:res.sendTaskFalse
                },
                 {
                    name:'发出上报（成功）',
                    type:'line',
                    data:res.reportTrue
                },
                {
                    name:'发出上报（失败）',
                    type:'line',
                    data:res.reportFalse
                }
            ]
          };
          my_Chart.setOption(option)
      }
    })
  /*折线图部分完*/

  /*第四部分页面切换*/
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
      if ($(".Box4_head ul li.addBorder a").html() == '接收指令') {
        gird_receive_instruction(p.getCurrent(),state);
      }else if ($(".Box4_head ul li.addBorder a").html() == '发出反馈') {
        gird_send_feedback(p.getCurrent(),state);
      }else if ($(".Box4_head ul li.addBorder a").html() == '接收任务') {
        receivetask(p.getCurrent(),state)
      }else if($(".Box4_head ul li.addBorder a").html() == '发出任务') {
        gird_send_tasks(p.getCurrent(),state)
      }else{
        gird_send_book(p.getCurrent(),state)
      }
    }
    });
  }
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
  /*接收指令*/
  function gird_receive_instruction_dom(data) {
    let str = '';
    $.each(data,function(key,value){
      str += '<tr id= '+ value.id + '>';
      str += '<td>' + value.eventId + '</td>';
      str += '<td>' + value.taskId + '</td>';
      str += '<td>' + value.instructionId + '</td>';
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
    $(".Box4_content .gird_receive_instruction  table tbody").html('').append(str)
  }
  $(document).on("click","input",function(){
    if($(this).parents(".select_list").prev(".Box4_head").children("ul").children("li.addBorder").children("a").html() == "接收指令"){
      var input_did = $("#tag-id").prop("checked");
      var input_no = $("#tag_id").prop("checked");
      if(input_did && input_no) {
        gird_receive_instruction(1)
      }else if(!input_did && input_no) {
        gird_receive_instruction(1,true)
      }else if(input_did && !input_no) {
        gird_receive_instruction(1,false)
      }else if(!input_did && !input_no){
        gird_receive_instruction(1)
      }
    }else if($(this).parents(".select_list").prev(".Box4_head").children("ul").children("li.addBorder").children("a").html() == "发出反馈"){
      var success_did = $("#success-id").prop("checked");
      var fail_no = $("#fail_id").prop("checked");
      if(success_did && fail_no) {
        gird_send_feedback(1)
      }else if(!success_did && fail_no) {
        gird_send_feedback(1,false)
      }else if(success_did && !fail_no) {
        gird_send_feedback(1,true)
      }else if(!success_did && !fail_no){
        gird_send_feedback(1)
      }
    }else if($(this).parents(".select_list").prev(".Box4_head").children("ul").children("li.addBorder").children("a").html() == "接收任务"){
      var input_did = $("#tag-id").prop("checked");
      var input_no = $("#tag_id").prop("checked");
      if(input_did && input_no) {
        receivetask(1)
      }else if(!input_did && input_no) {
        receivetask(1,true)
      }else if(input_did && !input_no) {
        receivetask(1,false)
      }else if(!input_did && !input_no){
        receivetask(1)
      }
    }else if($(this).parents(".select_list").prev(".Box4_head").children("ul").children("li.addBorder").children("a").html() == "发出任务"){
      var successdid = $("#success-id").prop("checked");
      var failno = $("#fail_id").prop("checked");
      if(successdid && failno) {
        gird_send_tasks(1)
      }else if(!successdid && failno) {
        gird_send_tasks(1,false)
      }else if(successdid && !failno) {
        gird_send_tasks(1,true)
      }else if(!successdid && !failno){
        gird_send_tasks(1)
      }
    }else if($(this).parents(".select_list").prev(".Box4_head").children("ul").children("li.addBorder").children("a").html() == "发出上报"){
      var success_did = $("#success-id").prop("checked");
      var fail_no = $("#fail_id").prop("checked");
      if(success_did && fail_no) {
        gird_send_book(1)
      }else if(!success_did && fail_no) {
        gird_send_book(1,false)
      }else if(success_did && !fail_no) {
        gird_send_book(1,true)
      }else if(!success_did && !fail_no){
        gird_send_book(1)
      }
    }
  })
  function gird_receive_instruction(offset,state) {
    $.ajax({
        type: "get",
        url: baseServerUrl+"/gridman/instruction/data",
        data: {
          page:offset,
          pageSize:5,
          isResolved:state
        },
        success: function(res){
          gird_receive_instruction_dom(res.list);
          loadPages(offset,res.totalPages,state)
        }
    })
  }
  /*发出反馈*/
  function gird_send_feedback_dom(data) {
    let str = '';
    $.each(data,function(key,value){
      str += '<tr id= '+ value.id + '>';
      str += '<td>' + value.eventId + '</td>';
      str += '<td>' + value.taskId + '</td>';
      str += '<td>' + value.instructionId + '</td>';
      str += '<td>' + value.executionId + '</td>';
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
    $(".Box4_content .gird_send_feedback table tbody").html('').append(str)
  }
  function gird_send_feedback(offset,state) {
    $.ajax({
        type: "get",
        url: baseServerUrl+"/gridman/execution/data",
        data: {
          page:offset,
          pageSize:5,
          isSuccess:state
        },
        success: function(res){
          gird_send_feedback_dom(res.list);
          loadPages(offset,res.totalPages,state)
        }
    })
  }

  /*接收任务*/
  function receivetask_dom(data) {
    let str = '';
    $.each(data,function(key,value){
      str += '<tr id= '+ value.id + '>';
      str += '<td>' + value.taskId + '</td>';
      str += '<td>' + value.receiveTime + '</td>';
      str += '<td>' + value.sendIp + '</td>';
      str += '<td>' + value.receiveIp + '</td>';
      if(value.resolved== false) {
        str += '<td>待处理</td>';
      }else{
        str += '<td>已处理</td>';
      }
      str += '</tr>';
    })
    $(".Box4_content .gird_receive_tasks table tbody").html('').append(str)
  }
  function receivetask(offset,state) {
    $.ajax({
        type: "get",
        url: baseServerUrl+"/gridman/receivetask/data",
        data: {
          page:offset,
          pageSize:5,
          isResolved:state
        },
        success: function(res){
          receivetask_dom(res.list);
          loadPages(offset,res.totalPages,state)
        }
    })
  }

  /*发出任务*/
  function gird_send_tasks_dom(data) {
    let str = '';
    $.each(data,function(key,value){
      str += '<tr id= '+ value.id + '>';
      str += '<td>' + value.taskId + '</td>';
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
    $(".Box4_content .gird_send_tasks table tbody").html('').append(str)
  }
  function gird_send_tasks(offset,state) {
    $.ajax({
        type: "get",
        url: baseServerUrl+"/gridman/sendtask/data",
        data: {
          page:offset,
          pageSize:5,
          isSuccess:state
        },
        success: function(res){
          gird_send_tasks_dom(res.list);
          loadPages(offset,res.totalPages,state)
        }
    })
  }

  /*发出上报*/
  function gird_send_book_dom(data) {
    let str = '';
    $.each(data,function(key,value){
      str += '<tr id= '+ value.id + '>';
      str += '<td>' + value.taskId + '</td>';
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
    $(".Box4_content .gird_send_book table tbody").html('').append(str)
  }
  function gird_send_book(offset,state) {
    $.ajax({
        type: "get",
        url: baseServerUrl+"/gridman/sendreport/data",
        data: {
          page:offset,
          pageSize:5,
          isSuccess:state
        },
        success: function(res){
          gird_send_book_dom(res.list);
          loadPages(offset,res.totalPages,state)
        }
    })
  }

  $(document).on("click",".Box4_head ul li",function(){
      $(this).addClass("addBorder");
      $(this).children("a").addClass("fontColor");
      $(this).siblings("li").removeClass("addBorder");
      $(this).siblings("li").children("a").removeClass("fontColor");
    if($(this).children("a").html() == '接收指令') { 
      procState();
      $(".gird_receive_instruction").show();
      $(".gird_send_feedback").hide();
      $(".gird_receive_tasks").hide();
      $(".gird_send_tasks").hide();
      $(".gird_send_book").hide();
      gird_receive_instruction(1);
    }else if ($(this).children("a").html() == '发出反馈'){
      finalState();
      $(".gird_receive_instruction").hide();
      $(".gird_send_feedback").show();
      $(".gird_receive_tasks").hide();
      $(".gird_send_tasks").hide();
      $(".gird_send_book").hide();
      gird_send_feedback(1);
    }else if ($(this).children("a").html() == '接收任务') {
      procState();
      $(".gird_receive_instruction").hide();
      $(".gird_send_feedback").hide();
      $(".gird_receive_tasks").show();
      $(".gird_send_tasks").hide();
      $(".gird_send_book").hide();
      receivetask(1)
    }else if($(this).children("a").html() == '发出任务') {
      finalState();
      $(".gird_receive_instruction").hide();
      $(".gird_send_feedback").hide();
      $(".gird_receive_tasks").hide();
      $(".gird_send_tasks").show();
      $(".gird_send_book").hide();
       gird_send_tasks(1)
    }else {
      finalState();
      $(".gird_receive_instruction").hide();
      $(".gird_send_feedback").hide();
      $(".gird_receive_tasks").hide();
      $(".gird_send_tasks").hide();
      $(".gird_send_book").show();
      gird_send_book(1)
    }
  })
  $(".Box4_head ul li:first-child").trigger("click");
})