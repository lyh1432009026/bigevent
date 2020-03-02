$(function () {
    var form = layui.form;
    var layer = layui.layer;
    var laypage = layui.laypage;

    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }


    jiegou();
    chaxun();

    function jiegou() {
        $.ajax({
            post: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                var str = template('list', res);
                // console.log(res);

                $('tbody').html(str)
                fenye(res.total);
            }
        })

    }
    function chaxun() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg('获取列表失败')
                }
                var str = template('chaxun', res);
                $('#fenlei_list').html(str);
                form.render()

            }
        })
    }
    // 筛选
    $('#shaixuan').submit(function (e) {
        e.preventDefault();

        q.cate_id = $('#fenlei_list').val();
        q.state = $('#zhuangtai').val();
        jiegou();
    })

    function fenye(tiaoshu, ) {
        // 分页

        //执行一个laypage实例
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
            , count: tiaoshu, //数据总数，从服务端得到
            limit: q.pagesize,
            limits: [2, 5, 10],
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                q.pagenum = obj.curr;

                q.pagesize = obj.limit
                // console.log(obj.limit); //得到每页显示的条数

                if (!first) {
                    jiegou();
                }
            }
        });

    }

    $('table').on('click', '#del', function () {
        console.log(55);

        $.ajax({
            type: 'get',
            url: "/my/article/delete/" + $(this).data('id'),
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg('删除失败')
                }
                jiegou();
            }
        })
    })
})