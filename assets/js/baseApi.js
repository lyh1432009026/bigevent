$.ajaxPrefilter(function (opent) {
    opent.url = 'http://www.liulongbin.top:3007' + opent.url;
    if (opent.url.indexOf('/my') !== -1) {
        opent.headers = {
            Authorization: localStorage.getItem('token')
        };
    };
    opent.complete = function (res) {
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            localStorage.removeItem('token')
            // 2. 强制用户跳转到 登录页面
            location.href = '/login.html'

        }


    }

});

function yanzheng() {
    localStorage.removeItem('token');
    location.href = '/login.html';
}