$(function () {
    var layer = layui.layer;
    var form = layui.form;

    // 获取用户信息
    getUserInfo();
    function getUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);

                form.val("formTest", res.data);

            }
        });
    }
    // 表单验证
    form.verify({
        nickname: [
            /^[\S]{2,6}$/
            , '昵称必须2到6位，且不能出现空格'
        ]
    });
    // 提交用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $('.layui-form').serialize(),
            success: function (res) {
                if (res.status === 0) {
                    console.log(77);
                    layer.msg('修改成功');
                    window.parent.userInfo()
                } else if (res.status === 1) {
                    layer.msg('修改失败');

                }


            }
        })
    })
    // 重置按钮
    $('.layui-btn-primary').on('click', function () {
        getUserInfo();
    })
})