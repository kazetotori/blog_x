(function () {
    "use strict";
    var validate = {
        username: false,
        password: false,
        rePassword: false,
        email: false,
        emailAuth: false,
        phone: false
    }
    var errors = {
        default: '未知错误',
        3: '用户名格式不正确，请使用6-18位的字母与数字组合',
        4: '用户名已存在',
        5: '用户名格式不正确，请使用6-18位的字母与数字组合',
        6: '邮箱格式不正确',
        7: '此邮箱已被占用，请使用其他邮箱注册',
        8: '验证码已发送，请在1分钟后重试',
        9: '验证码未发送',
        10: '验证码验证失败',
        11: '验证码超时',
        12: '电话格式错误，请输入正确的11位手机号码',
        13: '输入的邮箱与接收验证码的邮箱地址不匹配'
    }

    /* 获取错误信息 */
    function getErrMsg(errno) {
        return errors[errno] || errors[parseInt(errno)] || errors.default;
    }


    function setValidate(name, value) {
        value = !!value;
        validate[name] = value;

        if (!value) return $('#btnSignUp').addClass('am-disabled');
        var keys = Object.keys(validate);
        value = keys.every(function (key) {
            return !!validate[key];
        });
        if (value) return $('#btnSignUp').removeClass('am-disabled');
    }



    // error-message的div定位
    function setErrorLocs() {
        var $divs = $('[mb-error-for]');
        var $mbSignForm = $('.mb-sign-form');
        var left = $mbSignForm.offset().left + $mbSignForm.width();
        $('.mb-sign-container').height(document.body.clientHeight);
        $divs.each(function () {
            var $forEle = $($(this).attr('mb-error-for'));
            var offset = $forEle.offset();
            var h = $forEle.height()
            if ($(window).width() > 768) {
                $(this).css({
                    position: 'fixed',
                    top: offset.top,
                    left: left,
                    height: h,
                    marginTop: 6
                })
            } else {
                $(this).css('position', 'static');
            }
        })
    }
    $('[mb-error-for]').css('color', '#fd2453').css('font-size', '12px');
    setErrorLocs();
    $(window).on('resize', setErrorLocs);





    // 用户名验证
    $('#username').blur(checkUsername);

    var unameCheckXHR = null;

    function checkUsername() {
        var username = $('#username').val();
        var $errDiv = $('[mb-error-for="#username"]');
        var errno;
        // 验证格式
        if (!(/^\w{6,18}$/.test(username))) {
            errno = 3;
            return onerror();
        }
        if (unameCheckXHR) unameCheckXHR.abort();
        // 验证用户名是否存在
        unameCheckXHR = $.post('/api/user/check_username_unique', {
            username: username
        }, null, 'json').done(onsuccess).fail(onerror);


        function onsuccess(res) {
            if (res.errno == 0) {
                setValidate('username', true);
                return $errDiv.html('');
            }
            errno = res.errno;
            onerror()
        }

        function onerror(xhr) {
            var _errno = xhr && xhr.responseJSON ? xhr.responseJSON.errno : (errno || 500);
            setValidate('username', false);
            $errDiv.html(getErrMsg(_errno))
        }
    }






    // 密码验证
    $('#password').blur(checkPassword);

    function checkPassword() {
        var password = $('#password').val();
        if (/^\w{6,18}$/.test(password)) {
            setValidate('password', true);
            $('[mb-error-for="#password"]').html('');
        } else {
            setValidate('password', false);
            $('[mb-error-for="#password"]').html('密码格式不正确，请使用6-18位的字母与数字组合');
        }

        if ($('#rePassword').val() != '') {
            checkRepassword();
        }
    }





    // 重复输入密码验证
    $('#rePassword').blur(checkRepassword)

    function checkRepassword() {
        var password = $('#password').val();
        var rePassword = $('#rePassword').val();
        if (password !== rePassword) {
            setValidate('rePassword', false);
            $('[mb-error-for="#rePassword"]').html('两次输入的密码不一致');
        } else {
            setValidate('rePassword', true);
            $('[mb-error-for="#rePassword"]').html('');
        }
    }





    // 邮箱验证
    $('#email').blur(checkEmail);
    var emailCheckXHR = null;

    function checkEmail() {
        var email = $('#email').val();
        var $errDiv = $('[mb-error-for="#email"]');
        var errno;
        // 验证格式
        if (!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email))) {
            errno = 6;
            return onerror();
        }
        if (emailCheckXHR) emailCheckXHR.abort();
        // 验证用户名是否存在
        emailCheckXHR = $.post('/api/user/check_email_unique', {
            email: email
        }, null, 'json').done(onsuccess).fail(onerror);


        function onsuccess(res) {
            if (res.errno == 0) {
                setValidate('email', true);
                return $errDiv.html('')
            };
            errno = res.errno;
            onerror()
        }

        function onerror(xhr) {

            var _errno = xhr && xhr.responseJSON ? xhr.responseJSON.errno : (errno || 500);
            setValidate('email', false);
            $errDiv.html(getErrMsg(_errno));
        }
    }





    // 检测验证码是否正确
    $('#emailAuth').blur(checkEmailAuth);
    var emailAuthCheckXHR = null;

    function checkEmailAuth() {
        var auth = $('#emailAuth').val();
        var $errDiv = $('[mb-error-for="#emailAuth"]');
        var errno;

        if (!/^[a-zA-Z0-9]{6}$/.test(auth)) {
            $('[mb-error-for="#emailAuth"]').html('请输入6位验证码');
            return setValidate('emailAuth', false);
        }

        if (emailAuthCheckXHR) emailAuthCheckXHR.abort();
        emailAuthCheckXHR = $.post('/api/user/verify_signup_code', {
            code: auth
        }, null, 'json')
        emailAuthCheckXHR.done(onsuccess).fail(onerror);


        function onsuccess(res) {
            if (res.errno == 0) {
                setValidate('emailAuth', true);
                return $errDiv.html('')
            };
            errno = res.errno;
            onerror()
        }

        function onerror(xhr) {
            var _errno = xhr && xhr.responseJSON ? xhr.responseJSON.errno : (errno || 500);
            setValidate('email', false);
            $errDiv.html(getErrMsg(_errno));
        }
    }






    // 电话验证
    $('#phone').blur(checkPhone);

    function checkPhone() {
        var phone = $('#phone').val();
        if (/^1[3578]\d{9}$/.test(phone)) {
            $('[mb-error-for="#phone"]').html('');
            setValidate('phone', true);
        } else {
            $('[mb-error-for="#phone"]').html('请使用正确的11位手机号码');
            setValidate('phone', false);
        }
    }




    // 点击发送验证码按钮
    var verifyItv = null;
    $('#btnEmailAuth').click(function () {
        checkEmail();
        if (!validate.email) {
            return;
        }

        var email = $('#email').val();
        var seconds = 61;
        $(this).html('正在发送...').addClass('am-disabled');
        $.post('/api/user/send_signup_verify_toemail', {
            email: email
        }, null, 'json').done(onsuccess).fail(onerror);

        function onsuccess(res) {
            if (res.errno != 0) {
                errno = res.errno;
                return onerror();
            }
            verifyItv = setInterval(function () {
                seconds--;
                if (seconds > 0) {
                    return $('#btnEmailAuth').html(seconds + 's后可重新发送')
                }
                $('#btnEmailAuth').html('发送验证码').removeClass('am-disabled');
                clearInterval(verifyItv);
            }, 1000);
        }

        function onerror() {
            var _errno = xhr && xhr.responseJSON ? xhr.responseJSON.errno : (errno || 500);
            $errDiv.html(getErrMsg(_errno));
        }
    })




    // 注册按钮
    $('#btnSignUp').click(signUp);

    function signUp() {
        $.post('/api/user/signup', {
            username: $('#username').val(),
            password: $('#password').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            signUpCode: $('#emailAuth').val()
        }, onsuccess, 'json').fail(onerror);

        var errno;

        function onsuccess(res) {
            var seconds = 3;
            if (res.errno == 0) {
                $('#successMsg').html('<p style="font-size:13px;color:#555;">注册成功<span>3</span>s后跳转至<a href="/signin" style="color:#E4304E">登录</a>界面</p>');
                var itv = setInterval(function () {
                    seconds--;
                    if (seconds <= 0) {
                        $('#successMsg').find('span').html('0');
                        clearTimeout(itv);
                        return location.href = '/signin';
                    }
                    $('#successMsg').find('span').html(seconds);
                }, 1000);
                return;
            }
            errno = res.errno;
            onerror();
        }

        function onerror(xhr) {
            var _errno = xhr && xhr.responseJSON ? xhr.responseJSON.errno : (errno || 500);
            var $errDiv;
            switch (_errno) {
                case 3:
                case 4:
                    $errDiv = $('[mb-error-for="#username"]')
                    break;
                case 5:
                    $errDiv = $('[mb-error-for="#password"]');
                    break;
                case 6:
                case 7:
                    $errDiv = $('[mb-error-for="#email"]')
                    break;
                case 8:
                case 9:
                case 10:
                case 11:
                case 13:
                    $errDiv = $('[mb-error-for="#emailAuth"]')
                    break;
                case 12:
                    $errDiv = $('[mb-error-for="#phone"]')
                    break;
            }

            $errDiv.html(getErrMsg(_errno));
        }

    }



}())