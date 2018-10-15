$(function(){
/*第四部分页面切换*/
  $(document).on("click",".Box4_head ul li",function(){
      $(this).addClass("addBorder");
      $(this).children("a").addClass("fontColor");
      $(this).siblings("li").removeClass("addBorder");
      $(this).siblings("li").children("a").removeClass("fontColor");
    if($(this).children("a").html() == '接收事件') { 
      $(".state2").hide();
      $(".state1").show();  
      $(this).parents(".prepositionContentBox4").children(".Box4_content").children().eq(0).show();
      $(this).parents(".prepositionContentBox4").children(".Box4_content").children().eq(1).hide();
      $(this).parents(".prepositionContentBox4").children(".Box4_content").children().eq(2).hide();
    }else if ($(this).children("a").html() == '发出指令'){
      $(".state2").show();
      $(".state1").hide();
      $(this).parents(".prepositionContentBox4").children(".Box4_content").children().eq(0).hide();
      $(this).parents(".prepositionContentBox4").children(".Box4_content").children().eq(1).show();
      $(this).parents(".prepositionContentBox4").children(".Box4_content").children().eq(2).hide();
    }else{
      $(".state2").hide();
      $(".state1").hide();
      $(this).parents(".prepositionContentBox4").children(".Box4_content").children().eq(0).hide();
      $(this).parents(".prepositionContentBox4").children(".Box4_content").children().eq(1).hide();
      $(this).parents(".prepositionContentBox4").children(".Box4_content").children().eq(2).show();
    }
  })
  $(".Box4_head ul li:first-child").trigger("click");
  /*多选筛选*/
  // 待处理
  $("#tag-id").click(function(){
    let c = this.checked;
    let d = $(this).parents("li").next("li").children("input").prop("checked");
    let con = $(this).next().next().html();
    let res_con = $("#tag_id").next().next().html();
    if( c && d ){
      $(".Box4_content table tbody tr").show()
    }else if ( c && !d) {
      $(".Box4_content table tbody tr").hide()
      .filter(":contains(" + con + ")").show();
    }else if(!c && !d){
      $(".Box4_content table tbody tr").show()
    }else {
      $(".Box4_content table tbody tr").hide()
      .filter(":contains(" + res_con + ")").show();
    }
  })
  // 已处理
  $("#tag_id").click(function(){
    let a = this.checked;
    let b = $(this).parents("li").prev("li").children("input").prop("checked");
    let a_con = $(this).next().next().html();
    let ares_con = $("#tag-id").next().next().html();
    if( a && b ){
      $(".Box4_content table tbody tr").show()
    }else if ( a && !b) {
      $(".Box4_content table tbody tr").hide()
      .filter(":contains(" + a_con + ")").show();
    }else if(!a && !b){
      $(".Box4_content table tbody tr").show()
    }else {
      $(".Box4_content table tbody tr").hide()
      .filter(":contains(" + ares_con + ")").show();
    }
  })

  // 成功
  $("#success-id").click(function(){
    let c = this.checked;
    let d = $(this).parents("li").next("li").children("input").prop("checked");
    let con = $(this).next().next().html();
    let res_con = $("#fail_id").next().next().html();
    if( c && d ){
      $(".Box4_content table tbody tr").show()
    }else if ( c && !d) {
      $(".Box4_content table tbody tr").hide()
      .filter(":contains(" + con + ")").show();
    }else if(!c && !d){
      $(".Box4_content table tbody tr").show()
    }else {
      $(".Box4_content table tbody tr").hide()
      .filter(":contains(" + res_con + ")").show();
    }
  })
  // 已处理
  $("#fail_id").click(function(){
    let a = this.checked;
    let b = $(this).parents("li").prev("li").children("input").prop("checked");
    let a_con = $(this).next().next().html();
    let ares_con = $("#success-id").next().next().html();
    if( a && b ){
      $(".Box4_content table tbody tr").show()
    }else if ( a && !b) {
      $(".Box4_content table tbody tr").hide()
      .filter(":contains(" + a_con + ")").show();
    }else if(!a && !b){
      $(".Box4_content table tbody tr").show()
    }else {
      $(".Box4_content table tbody tr").hide()
      .filter(":contains(" + ares_con + ")").show();
    }
  })
})