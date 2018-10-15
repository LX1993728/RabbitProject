$(function () {
    // 是否记住密码操作
    var remeberVal = Cookies.get('isRemember') === 'true' ? true : false
    $('.isremember input').prop('checked', remeberVal)
    if (remeberVal) {
        $("#username").val(Cookies.get('username'))
        $("#password").val(Cookies.get('password'))
    } else {
        $("#username").val('')
        $("#password").val('')
    }
    // 非空验证
    $('.main_con .item input').blur(function () {
        var parent = $(this).parent()
        parent.find("p.error").remove();
        if ($(this).is("#username")) {
            if ($(this).val() == "") {
                $("<p class='error'>用户名不能为空</p>").appendTo(parent);
                parent.css('margin-bottom', '0px')
            } else {
                parent.css('margin-bottom', '36px')
            }
        }
        if ($(this).is("#password")) {
            if ($(this).val() == "") {
                $("<p class='error'>密码不能为空</p>").appendTo(parent);
                parent.css('margin-bottom', '0px')
            } else {
                parent.css('margin-bottom', '36px')
            }
        }
    })
    // 点击登录按钮
    $('.login_btn').click(function () {
        // 是否记住账号
        var isremember = $('.isremember input').prop('checked')
        $(".main_con .item input").trigger("blur");
        var data = {
            "username": $("#username").val(),
            "password": $("#password").val()
        };
        if ($(".main_con .item .error").length != 0) {
            return false;
        } else {
            // alert("可以登录啦");
            $.ajax({
                type:"post",
                contentType:'application/json',
                url:baseServerUrl + "/user/login",
                data:JSON.stringify(data),
                success:function(res) {
                    if (res.isSuccess == true) {
                        Cookies.set('isRemember', isremember, { expires: 7 });
                        if (isremember) {
                            Cookies.set('username', $("#username").val(), { expires: 7 })
                            Cookies.set('password', $("#password").val(), { expires: 7 })
                        } else {
                            Cookies.remove('username')
                            Cookies.remove('password')
                        }
                        localStorage.userInfo = JSON.stringify(res.user)
                        window.location.href = './index.html'
                    } else {
                        alert(res.info)
                    } 
                }
            })
        }
    })
})