$(function () {
    var layer = layui.layer;
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    $('#shangchuan').click(function () {
        $('#file').click();

        $('#file').on('change', function (e) {

            var file = e.target.files[0];
            if (file.length === 0) {
                return layer.msg('请选择图片！')
            }
            var newImgURL = URL.createObjectURL(file);
            $image
                .cropper('destroy')      // 销毁旧的裁剪区域
                .attr('src', newImgURL)  // 重新设置图片路径
                .cropper(options)        // 重新初始化裁剪区域
        })
    });


    $('.layui-btn-danger').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                console.log(res);
                if (res.status === 0) {
                    layer.msg('头像更新成功');
                    window.parent.userInfo();
                } else {
                    layer.msg('上传失败');
                }

            }

        })
    })

})