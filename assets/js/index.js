$(function () {
    // 渲染头像以及欢迎
    var layer = layui.layer;
    userInfo();

    // 退出
    $('.tuichu').on('click', function () {
        layer.confirm('确认退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清 token
            localStorage.removeItem('token')
            // 2. 跳页面
            location.href = '/login.html'

            // layer.close 表示关闭指定的弹出层
            layer.close(index)
        });
    })


})
// 渲染头像以及欢迎

function userInfo() {


    $.ajax({
        type: 'GET',
        url: '/my/userinfo',

        success: function (res) {
            console.log(res);

            if (res.status == 1 && res.message == '身份认证失败！') {
                return layer.msg('身份认证失败！');

            } else {
                touxiang(res.data)
            }


        },

    })

}
// 渲染头像函数
function touxiang(data) {
    var name = data.nickname || data.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    console.log(data.datauser_pic);

    if (data.user_pic) {
        $('.layui-nav-img').show().attr('src', data.user_pic);
        $('.text-active').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.text-active').show().html(name[0].toUpperCase());
    }
}