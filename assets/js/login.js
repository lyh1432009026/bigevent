
$(function () {
    var form = layui.form;
    var layer = layui.layer;
    $('.toreg').click(function () {
        $('.login').hide();
        $('.reg').show();


    })

    $('.tologin').click(function () {
        $('.reg').hide();
        $('.login').show();

    })

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samPwd: function (value) {
            var pwd = $('.reg [name=password]').val()
            if (value !== pwd) {
                return '两次的密码不一致！'
            }
        }
    })


    // 注册
    $('#reg_form').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {

                if (res.status !== 0) {
                    layer.msg('注册失败')
                    return
                }
                layer.msg('注册成功，请登录');
                $('.tologin').click();
            }
        })
    })

    // 登录
    $('#login_form').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    layer.msg('账号或密码错误');
                    return;
                }
                layer.msg('登陆成功，正在跳转');
                location.href = '/index.html';

                localStorage.setItem('token', res.token);

            }
        })
    })

})
