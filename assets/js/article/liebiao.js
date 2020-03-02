$(function () {

    var layer = layui.layer;
    var form = layui.form;
    var addIndex = null;


    function jiegou() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                var str = template('myTemplate', res);
                $('tbody').html(str)

            }
        });
    };

    jiegou()
    $('#add').click(function (e) {
        addIndex = layer.open({
            title: '添加文章中路'
            , content: $('#add_str').html(),
            area: ['500px', '250px'],
            type: 1
        });

    });
    $('body').on('submit', '#tijiao', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {

                if (res.status === 0) {
                    layer.msg('添加成功')
                    jiegou();
                    layer.close(addIndex)
                };
                if (res.status === 1) {
                    layer.msg('添加失败')
                }

            }
        })

    });
    // 删除
    $('table').on('click', '#del', function () {
        var id = $(this).data('id');
        layer.confirm('确定删除?', function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,

                success: function (res) {
                    jiegou();
                }
            })
            layer.close(index);
        });


    })

    // 编辑

    $('table').on('click', '#bianji', function () {

        var id = $(this).data('id');
        addIndex = layer.open({
            title: '修改文章标题'
            , content: $('#xiugai-str').html(),
            area: ['500px', '250px'],
            type: 1
        });
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + id,

            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }

                form.val('form-edit', res.data)

            }
        });


        $('body').on('submit', '#form-edit', function (e) {
            e.preventDefault();
            var data = $(this).serialize();

            $.ajax({
                type: 'post',
                url: '/my/article/updatecate',
                data: data,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('更新失败')
                    }

                    layer.close(addIndex);
                    jiegou()
                }

            })
        })

    })
})
