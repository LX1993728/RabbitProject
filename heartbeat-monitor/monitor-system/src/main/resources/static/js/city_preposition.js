$(function(){
  var obj = JSON.parse(localStorage.clickServerObj);
  var centerId = ''
     if(obj.flag == 'PREPOSITION') {
      centerId=obj.id
     } else{
      centerId= 'other'
  }
 /*折线图部分*/
    $.ajax({
      url:baseServerUrl+"/common/chart",
      type:"get",
      data:{
        flag:obj.flag,
        prepositionId:centerId
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
                    name:'接收指令（待处理）',
                    type:'line',
                    data:res.instructionFalse
                },
                {
                    name:'接收指令（已处理) ',
                    type:'line',
                    data:res.instructionTrue
                },
                {
                    name:'发出反馈（成功) ',
                    type:'line',
                    data:res.executionTrue
                },
                {
                    name:'发出反馈（失败）',
                    type:'line',
                    data:res.executionFalse
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
        receive_instruction(p.getCurrent(),state);
      }else if ($(".Box4_head ul li.addBorder a").html() == '发出反馈') {
        send_answer(p.getCurrent(),state);
      }else if ($(".Box4_head ul li.addBorder a").html() == '发出上报'){
        send_book(p.getCurrent(),state);
      }
    }
    });
  }
  /*接收指令*/
  function receive_instruction_dom(data) {
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
    $(".Box4_content .receive_instruction table tbody").html('').append(str)
  }
  function receive_instruction(offset,state) {
    $.ajax({
        type: "get",
        url: baseServerUrl+"/pre/instruction/data",
        data: {
          page:offset,
          pageSize:5,
          isResolved:state,
          prepositionId:centerId
        },
        success: function(res){
          receive_instruction_dom(res.list);
          loadPages(offset,res.totalPages,state)
        }
    })
  }
  /*发出反馈*/
  function send_answer_dom(data) {
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
    $(".Box4_content .send_answer table tbody").html('').append(str)
  }
  function send_answer(offset,state) {
    $.ajax({
        type: "get",
        url: baseServerUrl+"/pre/execution/data",
        data: {
          page:offset,
          pageSize:5,
          isSuccess:state,
          prepositionId:centerId
        },
        success: function(res){
          send_answer_dom(res.list);
          loadPages(offset,res.totalPages,state)
        }
    })
  }
  /*发出上报*/
  function send_book_dom(data) {
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
    $(".Box4_content .send_book  tbody").html('').append(str)
  }
  function send_book(offset,state) {
    $.ajax({
        type: "get",
        url: baseServerUrl+"/pre/report/data",
        data: {
          page:offset,
          pageSize:5,
          isSuccess:state,
          prepositionId:centerId
        },
        success: function(res){
          send_book_dom(res.list);
          loadPages(offset,res.totalPages,state)
        }
    })
  }

  /*已处理待处理拼接字符串*/
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

  /*第四部分tab切换*/
  $(document).on("click",".Box4_head ul li",function(){
      $(this).addClass("addBorder");
      $(this).children("a").addClass("fontColor");
      $(this).siblings("li").removeClass("addBorder");
      $(this).siblings("li").children("a").removeClass("fontColor");
    if($(this).children("a").html() == '接收指令') {
      $('.select-tag-input:checked').checked = false; 
      procState();
      $(".receive_instruction").show();
      $(".send_answer").hide();
      $(".send_book").hide();
      receive_instruction(1);
    }else if ($(this).children("a").html() == '发出反馈'){
      finalState();
      $(".receive_instruction").hide();
      $(".send_answer").show();
      $(".send_book").hide();
      send_answer(1);
    }else if ($(this).children("a").html() == '发出上报'){
      finalState();
      $(".receive_instruction").hide();
      $(".send_answer").hide();
      $(".send_book").show();
      send_book(1);
    }
  })
  $(".Box4_head ul li:first-child").trigger("click");

  /*多选的筛选*/
  $(document).on("click","input",function(){
    if($(this).parents(".select_list").prev(".Box4_head").children("ul").children("li.addBorder").children("a").html() == "接收指令"){
      var input_did = $("#tag-id").prop("checked");
      var input_no = $("#tag_id").prop("checked");
      if(input_did && input_no) {
        receive_instruction(1)
      }else if(!input_did && input_no) {
        receive_instruction(1,true)
      }else if(input_did && !input_no) {
        receive_instruction(1,false)
      }else if(!input_did && !input_no){
        receive_instruction(1)
      }
    }else if($(this).parents(".select_list").prev(".Box4_head").children("ul").children("li.addBorder").children("a").html() == "发出反馈"){
      var success_did = $("#success-id").prop("checked");
      var fail_no = $("#fail_id").prop("checked");
      if(success_did && fail_no) {
        send_answer(1)
      }else if(!success_did && fail_no) {
        send_answer(1,false)
      }else if(success_did && !fail_no) {
        send_answer(1,true)
      }else if(!success_did && !fail_no){
        send_answer(1)
      }
    }else {
      var success_did = $("#success-id").prop("checked");
      var fail_no = $("#fail_id").prop("checked");
      if(success_did && fail_no) {
        send_book(1)
      }else if(!success_did && fail_no) {
        send_book(1,false)
      }else if(success_did && !fail_no) {
        send_book(1,true)
      }else if(!success_did && !fail_no){
        send_book(1)
      }
    }
  })

})

