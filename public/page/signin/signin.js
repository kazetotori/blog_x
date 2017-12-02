(function () {

    "use strict";

    // 使按钮处于不可用状态
    function disableButton(btn) {
        $(btn).html('...').attr('disabled', true);
    }

    function reloadDisabledButton(btn, text) {
        $(btn).html(text).attr('disabled', false);
    }


    var username;
    var password;
    var remenberMe;
    $('#btnSignIn').click(function () {
        username = $('#username').val();
        password = $('#password').val();
        var btn = this;
        var res;
        $.post({
            url: '/api/user/signin',
            dataType: 'json',
            data: {
                username: username,
                password: password
            },
            loadend: function () {
                reloadDisabledButton(btn);
            },
            success: function (_res) {
                res = _res;
                if (res.errno != 0) {
                    return onerror();
                }
                location.href = location.search.replace('?back=', '')
            },
            error: onerror
        })

        function onerror(xhr) {
            var _res = (xhr ? xhr.responseJSON : res) || {
                errno: 500
            }

            if (_res.errno == 1) {
                $('#errMsg').html('登录失败：用户名不存在');
            } else if (_res.errno == 2) {
                $('#errMsg').html('登录失败：密码错误');
            } else {
                $('#errMsg').html('登录失败：未知错误');
            }

            $('#errMsgContainer').dropdown('open')
        }

    })


    

}())