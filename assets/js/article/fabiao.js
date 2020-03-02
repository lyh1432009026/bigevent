$(function () {
    var form = layui.form
    var layer = layui.layer
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            var str = template('mytemplate', res)
            $('#fenlei').html(str);
            form.render();
        }
    })
    // 富文本初始化
    initEditor();

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    $('.xuanze').click(function () {
        $('.shangchuan').click();
        $('.shangchuan').on('change', function (e) {
            var file = e.target.files;
            console.log(file);
            if (file.lenge == 0) {
                return layer.msg('请选择文件')
            }
            var newImgURL = URL.createObjectURL(file[0]);
            $image
                .cropper('destroy')      // 销毁旧的裁剪区域
                .attr('src', newImgURL)  // 重新设置图片路径
                .cropper(options)

        })
    });
    var art_state = '已发布';
    $('#btnSave2').click(function () {
        var art_state = '草稿';

    })
    $('#fbwz').on('submit', function (e) {

        e.preventDefault();

        var fd = new FormData($(this)[0]);
        fd.append('state', art_state);

        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                fd.append('cover_img', blob);

                $.ajax({
                    type: 'post',
                    url: '/my/article/add',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        if (res.status !== 0) {
                            layer.msg('发表失败');
                        }
                        location.href = 'wenzhang.html'


                    }
                })

            })
    })
})