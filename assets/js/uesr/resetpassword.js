$(function () {
    var form = layui.form;
    var layer = layui.layer;

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();




        form.verify({
            pass: [
                /^[\S]{6,12}$/
                , '密码必须6到12位，且不能出现空格'
            ],
            yanzheng: function (value) {
                var oldPass = $('[name=oldPwd]').val();
                if (value == oldPass) {
                    return '新旧不能相同'
                }
            },
            yanzheng1: function (value) {
                var newPass = $('[name=newPwd]').val();
                if (value !== newPass) {
                    return '两次密码不同'
                }
            }
        });

        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status === 1) {
                    layer.msg('原密码错误')
                }
                if (res.status === 0) {
                    layer.msg('更新成功');
                    $('#form')[0].reset();
                }

            }
        })

    })



})